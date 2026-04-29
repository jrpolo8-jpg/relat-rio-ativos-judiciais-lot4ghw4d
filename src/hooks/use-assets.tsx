import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useRef,
} from 'react'
import { JudicialAsset, RiskLevel, Status } from '@/lib/types'
import {
  getAssets,
  createAsset,
  updateAsset as updateAssetService,
  deleteAsset,
} from '@/services/judicial-assets'
import { useRealtime } from '@/hooks/use-realtime'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { extractFieldErrors } from '@/lib/pocketbase/errors'

interface AssetContextType {
  assets: JudicialAsset[]
  addAsset: (data: Omit<JudicialAsset, 'id'>) => Promise<void>
  updateAsset: (id: string, data: Partial<JudicialAsset>) => Promise<void>
  removeAsset: (id: string) => Promise<void>
  getAsset: (id: string) => JudicialAsset | undefined
  loading: boolean
}

const AssetContext = createContext<AssetContextType | undefined>(undefined)

const mapToAsset = (record: any): JudicialAsset => ({
  id: record.id,
  processNumber: record.process_number,
  party: record.party || '',
  court: record.court || '',
  lawyer: record.lawyer || '',
  value: record.value || 0,
  incontroversoValue: record.uncontroversial_value || 0,
  controversoValue: record.controversial_value || 0,
  referenceDate: record.reference_date || new Date().toISOString().substring(0, 10),
  risk: (record.prognosis_of_gain as RiskLevel) || 'Possível',
  status: (record.status as Status) || 'Ativo',
  summary: record.description || '',
  estimatedRecoveryTime: record.estimated_recovery_time || '',
  lastDevelopments: record.last_developments || '',
  lastUpdate: record.updated,
  history: record.history || [],
  valueDetails: record.value_details || '',
})

const mapToRecord = (asset: Partial<JudicialAsset>, userId: string) => {
  const record: any = { user_id: userId }
  if (asset.processNumber !== undefined) record.process_number = asset.processNumber
  if (asset.party !== undefined) record.party = asset.party
  if (asset.court !== undefined) record.court = asset.court
  if (asset.lawyer !== undefined) record.lawyer = asset.lawyer
  if (asset.value !== undefined) record.value = asset.value
  if (asset.incontroversoValue !== undefined)
    record.uncontroversial_value = asset.incontroversoValue
  if (asset.controversoValue !== undefined) record.controversial_value = asset.controversoValue
  if (asset.referenceDate !== undefined) record.reference_date = asset.referenceDate
  if (asset.risk !== undefined) record.prognosis_of_gain = asset.risk
  if (asset.status !== undefined) record.status = asset.status
  if (asset.summary !== undefined) record.description = asset.summary
  if (asset.estimatedRecoveryTime !== undefined)
    record.estimated_recovery_time = asset.estimatedRecoveryTime
  if (asset.lastDevelopments !== undefined) record.last_developments = asset.lastDevelopments
  if (asset.history !== undefined) record.history = asset.history
  if (asset.valueDetails !== undefined) record.value_details = asset.valueDetails
  return record
}

export function AssetProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<JudicialAsset[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  const pendingUpdates = useRef<Record<string, any>>({})
  const updateTimeouts = useRef<Record<string, NodeJS.Timeout>>({})

  const fetchAssets = useCallback(async () => {
    if (!user) {
      setAssets([])
      setLoading(false)
      return
    }
    try {
      const records = await getAssets()
      setAssets(records.map(mapToAsset))
    } catch (error) {
      console.error('Failed to fetch assets', error)
      toast({
        variant: 'destructive',
        title: 'Erro de Sincronização',
        description: 'Falha ao recuperar ativos judiciais do Skip Cloud.',
      })
    } finally {
      setLoading(false)
    }
  }, [user, toast])

  useEffect(() => {
    fetchAssets()
  }, [fetchAssets])

  useRealtime(
    'judicial_assets',
    () => {
      fetchAssets()
    },
    !!user,
  )

  const addAsset = async (data: Omit<JudicialAsset, 'id'>) => {
    if (!user) return
    try {
      const record = await createAsset(mapToRecord(data, user.id))
      setAssets((prev) => [...prev, mapToAsset(record)])
      toast({ title: 'Ativo criado com sucesso' })
    } catch (error) {
      const errs = extractFieldErrors(error)
      toast({
        variant: 'destructive',
        title: 'Erro ao criar',
        description: Object.values(errs).join(' ') || 'Falha ao salvar no banco.',
      })
      throw error
    }
  }

  const updateAsset = async (id: string, data: Partial<JudicialAsset>) => {
    if (!user) return

    // Optimistic update
    setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)))

    // Accumulate pending changes
    pendingUpdates.current[id] = { ...pendingUpdates.current[id], ...data }

    if (updateTimeouts.current[id]) {
      clearTimeout(updateTimeouts.current[id])
    }

    updateTimeouts.current[id] = setTimeout(async () => {
      const payload = pendingUpdates.current[id]
      delete pendingUpdates.current[id]
      try {
        await updateAssetService(id, mapToRecord(payload, user.id))
      } catch (error) {
        fetchAssets() // revert
        const errs = extractFieldErrors(error)
        toast({
          variant: 'destructive',
          title: 'Erro ao atualizar',
          description: Object.values(errs).join(' ') || 'Falha ao salvar modificação.',
        })
      }
    }, 800)
  }

  const removeAsset = async (id: string) => {
    if (!user) return
    setAssets((prev) => prev.filter((a) => a.id !== id))
    try {
      await deleteAsset(id)
      toast({ title: 'Ativo removido com sucesso' })
    } catch (error) {
      fetchAssets() // revert
      toast({
        variant: 'destructive',
        title: 'Erro ao remover',
        description: 'Falha ao deletar no banco.',
      })
      throw error
    }
  }

  const getAsset = (id: string) => {
    return assets.find((a) => a.id === id)
  }

  return (
    <AssetContext.Provider
      value={{ assets, addAsset, updateAsset, removeAsset, getAsset, loading }}
    >
      {children}
    </AssetContext.Provider>
  )
}

export function useAssets() {
  const context = useContext(AssetContext)
  if (context === undefined) {
    throw new Error('useAssets must be used within an AssetProvider')
  }
  return context
}

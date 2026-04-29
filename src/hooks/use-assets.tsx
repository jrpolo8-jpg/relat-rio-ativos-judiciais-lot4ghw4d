import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { JudicialAsset } from '@/lib/types'
import {
  getAssets,
  createAsset,
  updateAsset as apiUpdateAsset,
  deleteAsset,
} from '@/services/judicial-assets'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'

interface AssetContextType {
  assets: JudicialAsset[]
  loading: boolean
  saving: boolean
  lastSaved: Date | null
  showSavedIndicator: boolean
  addAsset: (asset: Omit<JudicialAsset, 'id'>) => Promise<void>
  updateAsset: (id: string, asset: Partial<JudicialAsset>) => void
  updateAssetImmediate: (id: string, asset: Partial<JudicialAsset>) => Promise<void>
  removeAsset: (id: string) => Promise<void>
  saveChanges: () => Promise<void>
  hasChanges: boolean
  refresh: () => Promise<void>
}

const AssetContext = createContext<AssetContextType | undefined>(undefined)

export const AssetProvider = ({ children }: { children: ReactNode }) => {
  const [assets, setAssets] = useState<JudicialAsset[]>([])
  const [originalAssets, setOriginalAssets] = useState<JudicialAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showSavedIndicator, setShowSavedIndicator] = useState(false)
  const [dirtyAssetIds, setDirtyAssetIds] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  const fetchAssets = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getAssets()
      setAssets(data)
      setOriginalAssets(data)
      setDirtyAssetIds(new Set())
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os ativos.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchAssets()
  }, [fetchAssets])

  // Keep in sync with DB changes from other clients
  useRealtime('judicial_assets', () => {
    if (dirtyAssetIds.size === 0) {
      fetchAssets()
    }
  })

  const addAsset = async (asset: Omit<JudicialAsset, 'id'>) => {
    try {
      const newAsset = await createAsset(asset)
      setAssets((prev) => [newAsset, ...prev])
      setOriginalAssets((prev) => [newAsset, ...prev])
      toast({ title: 'Sucesso', description: 'Ativo adicionado com sucesso.' })
    } catch (error) {
      console.error(error)
      toast({ title: 'Erro', description: 'Erro ao adicionar ativo.', variant: 'destructive' })
      throw error
    }
  }

  const updateAsset = (id: string, updatedFields: Partial<JudicialAsset>) => {
    setAssets((prev) =>
      prev.map((asset) => (asset.id === id ? { ...asset, ...updatedFields } : asset)),
    )
    setDirtyAssetIds((prev) => new Set(prev).add(id))
  }

  const updateAssetImmediate = async (id: string, updatedFields: Partial<JudicialAsset>) => {
    try {
      const updatedAsset = await apiUpdateAsset(id, updatedFields)
      setAssets((prev) =>
        prev.map((asset) => (asset.id === id ? { ...asset, ...updatedAsset } : asset)),
      )
      setOriginalAssets((prev) =>
        prev.map((asset) => (asset.id === id ? { ...asset, ...updatedAsset } : asset)),
      )
      setDirtyAssetIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
      toast({ title: 'Sucesso', description: 'Alterações salvas com sucesso!' })
    } catch (error) {
      console.error(error)
      toast({ title: 'Erro', description: 'Erro ao atualizar ativo.', variant: 'destructive' })
      throw error
    }
  }

  const removeAsset = async (id: string) => {
    try {
      await deleteAsset(id)
      setAssets((prev) => prev.filter((asset) => asset.id !== id))
      setOriginalAssets((prev) => prev.filter((asset) => asset.id !== id))
      setDirtyAssetIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
      toast({ title: 'Sucesso', description: 'Ativo removido com sucesso.' })
    } catch (error) {
      console.error(error)
      toast({ title: 'Erro', description: 'Erro ao remover ativo.', variant: 'destructive' })
      throw error
    }
  }

  const saveChanges = useCallback(async () => {
    if (dirtyAssetIds.size === 0) return
    const currentDirty = Array.from(dirtyAssetIds)

    // Clear dirty IDs before calling API to prevent race conditions if user continues typing
    setDirtyAssetIds((prev) => {
      const next = new Set(prev)
      currentDirty.forEach((id) => next.delete(id))
      return next
    })

    try {
      setSaving(true)
      const promises = currentDirty.map(async (id) => {
        const asset = assets.find((a) => a.id === id)
        if (asset) {
          return apiUpdateAsset(asset.id, asset)
        }
      })
      await Promise.all(promises)

      setOriginalAssets(assets)
      setLastSaved(new Date())
      setShowSavedIndicator(true)
      toast({ title: 'Sucesso', description: 'Alterações salvas com sucesso!' })
      setTimeout(() => setShowSavedIndicator(false), 3000)
    } catch (error) {
      console.error(error)
      // Re-add failed updates to dirty tracking
      setDirtyAssetIds((prev) => {
        const next = new Set(prev)
        currentDirty.forEach((id) => next.add(id))
        return next
      })
      toast({
        title: 'Erro',
        description: 'Falha ao salvar as alterações automaticamente.',
        variant: 'destructive',
      })
      throw error
    } finally {
      setSaving(false)
    }
  }, [assets, dirtyAssetIds, toast])

  const hasChanges = dirtyAssetIds.size > 0

  return (
    <AssetContext.Provider
      value={{
        assets,
        loading,
        saving,
        lastSaved,
        showSavedIndicator,
        addAsset,
        updateAsset,
        updateAssetImmediate,
        removeAsset,
        saveChanges,
        hasChanges,
        refresh: fetchAssets,
      }}
    >
      {children}
    </AssetContext.Provider>
  )
}

export const useAssets = () => {
  const context = useContext(AssetContext)
  if (!context) {
    throw new Error('useAssets must be used within an AssetProvider')
  }
  return context
}

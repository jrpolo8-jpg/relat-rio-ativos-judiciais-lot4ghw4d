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
  addAsset: (asset: Omit<JudicialAsset, 'id'>) => Promise<void>
  updateAsset: (id: string, asset: Partial<JudicialAsset>) => void
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

  const saveChanges = async () => {
    try {
      const promises = Array.from(dirtyAssetIds).map(async (id) => {
        const asset = assets.find((a) => a.id === id)
        if (asset) {
          return apiUpdateAsset(asset.id, asset)
        }
      })
      await Promise.all(promises)
      setOriginalAssets(assets)
      setDirtyAssetIds(new Set())
      toast({ title: 'Sucesso', description: 'Alterações salvas com sucesso.' })
      fetchAssets()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Falha ao salvar as alterações.',
        variant: 'destructive',
      })
      throw error
    }
  }

  const hasChanges = dirtyAssetIds.size > 0

  return (
    <AssetContext.Provider
      value={{
        assets,
        loading,
        addAsset,
        updateAsset,
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

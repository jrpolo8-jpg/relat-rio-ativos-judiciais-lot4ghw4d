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
  updateAsset: (id: string, asset: Partial<JudicialAsset>) => Promise<void>
  removeAsset: (id: string) => Promise<void>
  refresh: () => Promise<void>
}

const AssetContext = createContext<AssetContextType | undefined>(undefined)

export const AssetProvider = ({ children }: { children: ReactNode }) => {
  const [assets, setAssets] = useState<JudicialAsset[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchAssets = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getAssets()
      setAssets(data)
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
    fetchAssets()
  })

  const addAsset = async (asset: Omit<JudicialAsset, 'id'>) => {
    try {
      const newAsset = await createAsset(asset)
      setAssets((prev) => [newAsset, ...prev])
      toast({ title: 'Sucesso', description: 'Ativo adicionado com sucesso.' })
    } catch (error) {
      console.error(error)
      toast({ title: 'Erro', description: 'Erro ao adicionar ativo.', variant: 'destructive' })
      throw error
    }
  }

  const updateAsset = async (id: string, updatedFields: Partial<JudicialAsset>) => {
    try {
      const updatedAsset = await apiUpdateAsset(id, updatedFields)
      setAssets((prev) =>
        prev.map((asset) => (asset.id === id ? { ...asset, ...updatedAsset } : asset)),
      )
      toast({ title: 'Sucesso', description: 'Ativo atualizado com sucesso!' })
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
      toast({ title: 'Sucesso', description: 'Ativo removido com sucesso.' })
    } catch (error) {
      console.error(error)
      toast({ title: 'Erro', description: 'Erro ao remover ativo.', variant: 'destructive' })
      throw error
    }
  }

  return (
    <AssetContext.Provider
      value={{
        assets,
        loading,
        addAsset,
        updateAsset,
        removeAsset,
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

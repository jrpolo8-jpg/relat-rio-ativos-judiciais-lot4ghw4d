import { createContext, useContext, useState, ReactNode } from 'react'
import { JudicialAsset } from '@/lib/types'
import { MOCK_ASSETS } from '@/lib/mock-data'

interface AssetContextType {
  assets: JudicialAsset[]
  loading: boolean
  addAsset: (asset: Omit<JudicialAsset, 'id'>) => Promise<void>
  updateAsset: (id: string, asset: Partial<JudicialAsset>) => Promise<void>
  removeAsset: (id: string) => Promise<void>
}

const AssetContext = createContext<AssetContextType | undefined>(undefined)

export const AssetProvider = ({ children }: { children: ReactNode }) => {
  const [assets, setAssets] = useState<JudicialAsset[]>(MOCK_ASSETS)

  const addAsset = async (asset: Omit<JudicialAsset, 'id'>) => {
    const newAsset = { ...asset, id: Math.random().toString(36).substring(2, 9) } as JudicialAsset
    setAssets((prev) => [...prev, newAsset])
  }

  const updateAsset = async (id: string, updatedFields: Partial<JudicialAsset>) => {
    setAssets((prev) =>
      prev.map((asset) => (asset.id === id ? { ...asset, ...updatedFields } : asset)),
    )
  }

  const removeAsset = async (id: string) => {
    setAssets((prev) => prev.filter((asset) => asset.id !== id))
  }

  return (
    <AssetContext.Provider value={{ assets, loading: false, addAsset, updateAsset, removeAsset }}>
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

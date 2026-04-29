import React, { createContext, useContext, useState, ReactNode } from 'react'
import { JudicialAsset } from '@/lib/types'
import { MOCK_ASSETS } from '@/lib/mock-data'

interface AssetContextType {
  assets: JudicialAsset[]
  addAsset: (data: Omit<JudicialAsset, 'id'>) => void
  updateAsset: (id: string, data: Partial<JudicialAsset>) => void
  removeAsset: (id: string) => void
  getAsset: (id: string) => JudicialAsset | undefined
}

const AssetContext = createContext<AssetContextType | undefined>(undefined)

export function AssetProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<JudicialAsset[]>(MOCK_ASSETS)

  const addAsset = (data: Omit<JudicialAsset, 'id'>) => {
    const newAsset = { ...data, id: Math.random().toString(36).substring(7) }
    setAssets((prev) => [...prev, newAsset])
  }

  const updateAsset = (id: string, data: Partial<JudicialAsset>) => {
    setAssets((prev) => prev.map((asset) => (asset.id === id ? { ...asset, ...data } : asset)))
  }

  const removeAsset = (id: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== id))
  }

  const getAsset = (id: string) => {
    return assets.find((a) => a.id === id)
  }

  return (
    <AssetContext.Provider value={{ assets, addAsset, updateAsset, removeAsset, getAsset }}>
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

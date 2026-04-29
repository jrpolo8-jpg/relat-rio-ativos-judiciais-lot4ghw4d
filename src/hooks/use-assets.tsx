import React, { createContext, useContext, useState, ReactNode } from 'react'
import { JudicialAsset } from '@/lib/types'
import { MOCK_ASSETS } from '@/lib/mock-data'

interface AssetContextType {
  assets: JudicialAsset[]
  updateAsset: (id: string, data: Partial<JudicialAsset>) => void
  getAsset: (id: string) => JudicialAsset | undefined
}

const AssetContext = createContext<AssetContextType | undefined>(undefined)

export function AssetProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<JudicialAsset[]>(MOCK_ASSETS)

  const updateAsset = (id: string, data: Partial<JudicialAsset>) => {
    setAssets((prev) => prev.map((asset) => (asset.id === id ? { ...asset, ...data } : asset)))
  }

  const getAsset = (id: string) => {
    return assets.find((a) => a.id === id)
  }

  return (
    <AssetContext.Provider value={{ assets, updateAsset, getAsset }}>
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

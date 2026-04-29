import pb from '@/lib/pocketbase/client'

export const getAssets = () => pb.collection('judicial_assets').getFullList({ sort: '-created' })

export const createAsset = (data: any) => pb.collection('judicial_assets').create(data)

export const updateAsset = (id: string, data: any) =>
  pb.collection('judicial_assets').update(id, data)

export const deleteAsset = (id: string) => pb.collection('judicial_assets').delete(id)

import pb from '@/lib/pocketbase/client'
import { JudicialAsset } from '@/lib/types'

const mapToBackend = (data: Partial<JudicialAsset>) => {
  const mapped: any = {}
  if (data.processNumber !== undefined) mapped.process_number = data.processNumber
  if (data.party !== undefined) mapped.party = data.party
  if (data.court !== undefined) mapped.court = data.court
  if (data.lawyer !== undefined) mapped.lawyer = data.lawyer
  if (data.value !== undefined) mapped.value = data.value
  if (data.incontroversoValue !== undefined) mapped.uncontroversial_value = data.incontroversoValue
  if (data.controversoValue !== undefined) mapped.controversial_value = data.controversoValue
  if (data.referenceDate !== undefined) mapped.reference_date = data.referenceDate
  if (data.risk !== undefined) mapped.prognosis_of_gain = data.risk
  if (data.status !== undefined) mapped.status = data.status
  if (data.summary !== undefined) mapped.description = data.summary
  if (data.estimatedRecoveryTime !== undefined)
    mapped.estimated_recovery_time = data.estimatedRecoveryTime
  if (data.lastDevelopments !== undefined) mapped.last_developments = data.lastDevelopments
  if (data.valueDetails !== undefined) mapped.value_details = data.valueDetails
  if (data.history !== undefined) mapped.history = data.history

  if (pb.authStore.record?.id) {
    mapped.user_id = pb.authStore.record.id
  }

  return mapped
}

const mapToFrontend = (data: any): JudicialAsset => ({
  id: data.id,
  processNumber: data.process_number || '',
  party: data.party || '',
  court: data.court || '',
  lawyer: data.lawyer || '',
  value: data.value || 0,
  incontroversoValue: data.uncontroversial_value || 0,
  controversoValue: data.controversial_value || 0,
  referenceDate: data.reference_date || new Date().toISOString(),
  risk: data.prognosis_of_gain || 'Possível',
  status: data.status || 'Ativo',
  summary: data.description || '',
  estimatedRecoveryTime: data.estimated_recovery_time || '',
  lastDevelopments: data.last_developments || '',
  valueDetails: data.value_details || '',
  history: data.history || [],
  lastUpdate: data.updated || new Date().toISOString(),
})

export const getAssets = async (): Promise<JudicialAsset[]> => {
  const records = await pb.collection('judicial_assets').getFullList({
    sort: '-created',
    batch: 500,
    requestKey: null,
  })
  return records.map(mapToFrontend)
}

export const createAsset = async (data: Partial<JudicialAsset>): Promise<JudicialAsset> => {
  const record = await pb.collection('judicial_assets').create(mapToBackend(data))
  return mapToFrontend(record)
}

export const updateAsset = async (
  id: string,
  data: Partial<JudicialAsset>,
): Promise<JudicialAsset> => {
  const record = await pb.collection('judicial_assets').update(id, mapToBackend(data))
  return mapToFrontend(record)
}

export const deleteAsset = async (id: string): Promise<void> => {
  await pb.collection('judicial_assets').delete(id)
}

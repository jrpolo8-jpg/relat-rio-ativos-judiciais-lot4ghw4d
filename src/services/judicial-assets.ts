import pb from '@/lib/pocketbase/client'
import { JudicialAsset, ProcessUpdate, SummaryItem } from '@/lib/types'

export const defaultSummaryItems = (): SummaryItem[] => [
  { id: 'def-1', title: 'Andamento na fase de conhecimento', content: '', isDefault: true },
  { id: 'def-2', title: 'Andamento no tribunal', content: '', isDefault: true },
  { id: 'def-3', title: 'Andamento no tribunal superiores', content: '', isDefault: true },
  {
    id: 'def-4',
    title: 'Cumprimento de sentença ou incidentes processuais',
    content: '',
    isDefault: true,
  },
]

const mapToBackend = (data: Partial<JudicialAsset>, isCreate = false) => {
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
  if (data.sortOrder !== undefined) mapped.sort_order = data.sortOrder

  if (isCreate && pb.authStore.record?.id) {
    mapped.user_id = pb.authStore.record.id
  }

  return mapped
}

const mapToFrontend = (data: any): JudicialAsset => {
  let history: ProcessUpdate[] = []
  let summaryItems: SummaryItem[] = []

  if (Array.isArray(data.history)) {
    history = data.history
  } else if (data.history && typeof data.history === 'object') {
    history = data.history.updates || []
    summaryItems = data.history.summaryItems || []
  }

  if (!summaryItems || summaryItems.length === 0) {
    summaryItems = defaultSummaryItems()
  }

  return {
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
    summaryItems,
    estimatedRecoveryTime: data.estimated_recovery_time || '',
    lastDevelopments: data.last_developments || '',
    valueDetails: data.value_details || '',
    history,
    lastUpdate: data.updated || new Date().toISOString(),
    sortOrder: data.sort_order || 0,
  }
}

export const getAssets = async (): Promise<JudicialAsset[]> => {
  const records = await pb.collection('judicial_assets').getFullList({
    sort: 'sort_order,-created',
    batch: 500,
    requestKey: null,
  })
  return records.map(mapToFrontend)
}

export const createAsset = async (data: Partial<JudicialAsset>): Promise<JudicialAsset> => {
  const mapped = mapToBackend(data, true)
  mapped.history = {
    updates: data.history || [],
    summaryItems: data.summaryItems || defaultSummaryItems(),
  }
  const record = await pb.collection('judicial_assets').create(mapped)
  return mapToFrontend(record)
}

export const updateAsset = async (
  id: string,
  data: Partial<JudicialAsset>,
): Promise<JudicialAsset> => {
  const mapped = mapToBackend(data, false)

  if (data.history !== undefined || data.summaryItems !== undefined) {
    const existingRaw = await pb.collection('judicial_assets').getOne(id)
    const parsed = mapToFrontend(existingRaw)

    mapped.history = {
      updates: data.history !== undefined ? data.history : parsed.history,
      summaryItems: data.summaryItems !== undefined ? data.summaryItems : parsed.summaryItems,
    }
  }

  const record = await pb.collection('judicial_assets').update(id, mapped)
  return mapToFrontend(record)
}

export const deleteAsset = async (id: string): Promise<void> => {
  await pb.collection('judicial_assets').delete(id)
}

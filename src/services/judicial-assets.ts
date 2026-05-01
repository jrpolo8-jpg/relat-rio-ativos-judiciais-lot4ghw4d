import pb from '@/lib/pocketbase/client'
import { JudicialAsset } from '@/lib/types'

const mapToAsset = (record: any): JudicialAsset => ({
  id: record.id,
  processNumber: record.process_number,
  party: record.party,
  court: record.court,
  lawyer: record.lawyer,
  value: record.value,
  incontroversoValue: record.uncontroversial_value,
  controversoValue: record.controversial_value,
  referenceDate: record.reference_date,
  risk: record.prognosis_of_gain,
  status: record.status,
  summary: record.description,
  estimatedRecoveryTime: record.estimated_recovery_time,
  lastDevelopments: record.last_developments,
  valueDetails: record.value_details,
  history: record.history?.updates || [],
  summaryItems: record.history?.summaryItems || [],
  lastUpdate: record.updated,
  sortOrder: record.sort_order,
})

export const getAssets = async (): Promise<JudicialAsset[]> => {
  const records = await pb.collection('judicial_assets').getFullList({ sort: 'sort_order' })
  return records.map(mapToAsset)
}

export const createAsset = async (data: Omit<JudicialAsset, 'id'>): Promise<JudicialAsset> => {
  const record: any = {
    process_number: data.processNumber,
    party: data.party,
    court: data.court,
    lawyer: data.lawyer,
    value: data.value,
    uncontroversial_value: data.incontroversoValue,
    controversial_value: data.controversoValue,
    reference_date: data.referenceDate,
    prognosis_of_gain: data.risk,
    status: data.status,
    description: data.summary,
    estimated_recovery_time: data.estimatedRecoveryTime,
    last_developments: data.lastDevelopments,
    value_details: data.valueDetails,
    sort_order: data.sortOrder,
    history: {
      updates: data.history || [],
      summaryItems: data.summaryItems || [],
    },
  }
  const created = await pb.collection('judicial_assets').create(record)
  return mapToAsset(created)
}

export const updateAsset = async (
  id: string,
  data: Partial<JudicialAsset>,
): Promise<JudicialAsset> => {
  const currentRecord = await pb.collection('judicial_assets').getOne(id)

  const record: any = {}
  if (data.processNumber !== undefined) record.process_number = data.processNumber
  if (data.party !== undefined) record.party = data.party
  if (data.court !== undefined) record.court = data.court
  if (data.lawyer !== undefined) record.lawyer = data.lawyer
  if (data.value !== undefined) record.value = data.value
  if (data.incontroversoValue !== undefined) record.uncontroversial_value = data.incontroversoValue
  if (data.controversoValue !== undefined) record.controversial_value = data.controversoValue
  if (data.referenceDate !== undefined) record.reference_date = data.referenceDate
  if (data.risk !== undefined) record.prognosis_of_gain = data.risk
  if (data.status !== undefined) record.status = data.status
  if (data.summary !== undefined) record.description = data.summary
  if (data.estimatedRecoveryTime !== undefined)
    record.estimated_recovery_time = data.estimatedRecoveryTime
  if (data.lastDevelopments !== undefined) record.last_developments = data.lastDevelopments
  if (data.valueDetails !== undefined) record.value_details = data.valueDetails
  if (data.sortOrder !== undefined) record.sort_order = data.sortOrder

  if (data.history !== undefined || data.summaryItems !== undefined) {
    const currentHistory = currentRecord.history || {}
    record.history = {
      updates: data.history !== undefined ? data.history : currentHistory.updates || [],
      summaryItems:
        data.summaryItems !== undefined ? data.summaryItems : currentHistory.summaryItems || [],
    }
  }

  const updated = await pb.collection('judicial_assets').update(id, record)
  return mapToAsset(updated)
}

export const deleteAsset = async (id: string): Promise<void> => {
  await pb.collection('judicial_assets').delete(id)
}

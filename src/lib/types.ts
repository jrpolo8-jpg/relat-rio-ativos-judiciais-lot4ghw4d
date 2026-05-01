export type RiskLevel = 'Provável' | 'Possível' | 'Remoto'
export type Status = 'Ativo' | 'Encerrado' | 'Suspenso'

export interface ReportSettings {
  id: string
  preamble_text: string
  signature1_name: string
  signature1_title: string
  signature2_name: string
  signature2_title: string
  signature3_name: string
  signature3_title: string
  base_date?: string
}

export interface ProcessUpdate {
  id: string
  date: string
  description: string
  author: string
}

export interface SummaryItem {
  id: string
  title: string
  content: string
  isDefault?: boolean
}

export interface JudicialAsset {
  id: string
  processNumber: string
  party: string
  court: string
  lawyer: string
  value: number
  incontroversoValue?: number
  controversoValue?: number
  expectedGain?: number
  gainPercentage?: number
  valueDetails?: string
  referenceDate: string
  risk: RiskLevel
  status: Status
  summary: string
  summaryItems: SummaryItem[]
  estimatedRecoveryTime: string
  lastDevelopments: string
  lastUpdate: string
  history: ProcessUpdate[]
  sortOrder?: number
  cetencoPercentage?: number
  cetencoValue?: number
}

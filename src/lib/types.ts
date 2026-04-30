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
}

export interface ProcessUpdate {
  id: string
  date: string
  description: string
  author: string
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
  estimatedRecoveryTime: string
  lastDevelopments: string
  lastUpdate: string
  history: ProcessUpdate[]
}

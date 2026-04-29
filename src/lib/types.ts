export type RiskLevel = 'Provável' | 'Possível' | 'Remoto'
export type Status = 'Ativo' | 'Encerrado' | 'Suspenso'

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

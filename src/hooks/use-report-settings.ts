import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { ReportSettings } from '@/lib/types'

const DEFAULT_SETTINGS: ReportSettings = {
  id: '',
  preamble_text:
    'Trata-se dos principais ativos estratégicos da Cetenco, com a devida qualificação de valores envolvidos (incontroversos e controversos), avaliação de riscos (prognóstico de ganho) e relatório circunstanciado sobre os andamentos recentes de cada demanda, com indicação dos respectivos patronos e acompanhamento pela Sayão e Polo Sociedade de Advogados, juntamente com toda diretoria executiva da Companhia Cetenco.',
  signature1_name: '',
  signature1_title: 'Diretor Jurídico',
  signature2_name: '',
  signature2_title: 'Diretor Financeiro',
  signature3_name: '',
  signature3_title: 'CEO',
  base_date: '01/05/2026',
}

export function useReportSettings() {
  const [settings, setSettings] = useState<ReportSettings | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const records = await pb.collection('report_settings').getFullList<ReportSettings>()
      if (records.length > 0) {
        setSettings(records[0])
      } else {
        setSettings(DEFAULT_SETTINGS)
      }
    } catch (e) {
      console.error('Error fetching settings:', e)
      setSettings(DEFAULT_SETTINGS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const updateSettings = async (newSettings: Partial<ReportSettings>) => {
    try {
      // Explicitly map only the allowed fields to prevent PocketBase validation errors
      // caused by unknown fields (e.g. expand, collectionId)
      const dataToSave = {
        preamble_text: newSettings.preamble_text ?? '',
        signature1_name: newSettings.signature1_name ?? '',
        signature1_title: newSettings.signature1_title ?? '',
        signature2_name: newSettings.signature2_name ?? '',
        signature2_title: newSettings.signature2_title ?? '',
        signature3_name: newSettings.signature3_name ?? '',
        signature3_title: newSettings.signature3_title ?? '',
        base_date: newSettings.base_date ?? '',
      }

      // Always check database before attempting create/update to prevent duplicate rows
      const existing = await pb.collection('report_settings').getFullList()
      const currentId = existing.length > 0 ? existing[0].id : null

      if (currentId) {
        const updatedRecord = await pb
          .collection('report_settings')
          .update<ReportSettings>(currentId, dataToSave)
        setSettings(updatedRecord)
        return updatedRecord
      } else {
        const createdRecord = await pb
          .collection('report_settings')
          .create<ReportSettings>(dataToSave)
        setSettings(createdRecord)
        return createdRecord
      }
    } catch (e) {
      console.error('Error saving settings:', e)
      throw e
    }
  }

  return { settings, loading, updateSettings, fetchSettings }
}

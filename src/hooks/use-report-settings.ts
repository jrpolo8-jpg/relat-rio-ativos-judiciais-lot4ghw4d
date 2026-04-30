import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { ReportSettings } from '@/lib/types'

export function useReportSettings() {
  const [settings, setSettings] = useState<ReportSettings | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchSettings = async () => {
    try {
      const records = await pb.collection('report_settings').getFullList<ReportSettings>()
      if (records.length > 0) {
        setSettings(records[0])
      } else {
        setSettings({
          id: '',
          preamble_text:
            'Trata-se dos principais ativos estratégicos da Cetenco, com a devida qualificação de valores envolvidos, avaliação de riscos (prognóstico de ganho) e relato circunstanciado sobre os andamentos recentes de cada demanda patrocinada por nosso escritório.',
          signature1_name: '',
          signature1_title: 'Diretor Jurídico',
          signature2_name: '',
          signature2_title: 'Diretor Financeiro',
          signature3_name: '',
          signature3_title: 'CEO',
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const updateSettings = async (newSettings: Partial<ReportSettings>) => {
    try {
      if (settings?.id) {
        const updated = await pb
          .collection('report_settings')
          .update<ReportSettings>(settings.id, newSettings)
        setSettings(updated)
      } else {
        const created = await pb.collection('report_settings').create<ReportSettings>(newSettings)
        setSettings(created)
      }
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  return { settings, loading, updateSettings }
}

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
            'Trata-se dos principais ativos estratégicos da Cetenco, com a devida qualificação de valores envolvidos (incontroversos e controversos), avaliação de riscos (prognóstico de ganho) e relatório circunstanciado sobre os andamentos recentes de cada demanda, com indicação dos respectivos patronos e acompanhamento pela Sayão e Polo Sociedade de Advogados, juntamente com toda diretoria executiva da Companhia Cetenco.',
          signature1_name: '',
          signature1_title: 'Diretor Jurídico',
          signature2_name: '',
          signature2_title: 'Diretor Financeiro',
          signature3_name: '',
          signature3_title: 'CEO',
          base_date: '01/05/2026',
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
      const { id, created, updated, collectionId, collectionName, ...dataToSave } =
        newSettings as any

      let currentId = settings?.id

      if (!currentId) {
        const existing = await pb.collection('report_settings').getFullList()
        if (existing.length > 0) {
          currentId = existing[0].id
        }
      }

      if (currentId) {
        const updatedRecord = await pb
          .collection('report_settings')
          .update<ReportSettings>(currentId, dataToSave)
        setSettings(updatedRecord)
      } else {
        const createdRecord = await pb
          .collection('report_settings')
          .create<ReportSettings>(dataToSave)
        setSettings(createdRecord)
      }
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  return { settings, loading, updateSettings }
}

migrate(
  (app) => {
    // 1. Update Report Settings preamble
    const settingsCol = app.findCollectionByNameOrId('report_settings')
    let setting
    try {
      const settingsList = app.findRecordsByFilter('report_settings', '1=1', '', 1, 0)
      if (settingsList.length > 0) {
        setting = settingsList[0]
      } else {
        setting = new Record(settingsCol)
      }
    } catch (_) {
      setting = new Record(settingsCol)
    }

    setting.set(
      'preamble_text',
      'Trata-se dos principais ativos estratégicos da Cetenco, com a devida qualificação de valores envolvidos (incontroversos e controversos), avaliação de riscos (prognóstico de ganho) e relatório circunstanciado sobre os andamentos recentes de cada demanda, com indicação',
    )
    app.save(setting)

    // 2. Seed Judicial Assets with production data
    const assetsCol = app.findCollectionByNameOrId('judicial_assets')

    const seedData = [
      {
        process_number: '1002345-67.2018.8.26.0053',
        party: 'DERSA - Desenvolvimento Rodoviário S/A',
        court: '1ª Vara da Fazenda Pública - SP',
        lawyer: 'TozziniFreire Advogados',
        value: 150000000.0,
        uncontroversial_value: 50000000.0,
        controversial_value: 100000000.0,
        reference_date: 'Outubro/2023',
        prognosis_of_gain: 'Provável',
        status: 'Ativo',
        description:
          'Ação de cobrança referente a reequilíbrio econômico-financeiro de contrato de obra rodoviária (Rodoanel).',
        estimated_recovery_time: '2 a 3 anos',
        last_developments:
          'O processo encontra-se em fase de cumprimento de sentença para a parte incontroversa. A parte controversa aguarda julgamento de recurso no STJ.',
        value_details: 'Valor principal atualizado com juros de mora e correção monetária.',
        sort_order: 1,
        cetenco_percentage: 100,
        cetenco_value: 150000000.0,
      },
      {
        process_number: '0012345-89.2010.4.03.6100',
        party: 'União Federal (DNIT)',
        court: '3ª Vara Federal Cível de São Paulo',
        lawyer: 'Pinheiro Neto Advogados',
        value: 80000000.0,
        uncontroversial_value: 0.0,
        controversial_value: 80000000.0,
        reference_date: 'Dezembro/2023',
        prognosis_of_gain: 'Possível',
        status: 'Ativo',
        description:
          'Ação indenizatória por atrasos nas desapropriações em obra de infraestrutura ferroviária.',
        estimated_recovery_time: '5 anos',
        last_developments:
          'Realizada perícia técnica de engenharia favorável à Cetenco. Aguardando sentença em primeira instância.',
        value_details: 'Cálculos periciais apontam para um montante de R$ 80 milhões.',
        sort_order: 2,
        cetenco_percentage: 100,
        cetenco_value: 80000000.0,
      },
    ]

    for (const data of seedData) {
      try {
        app.findFirstRecordByData('judicial_assets', 'process_number', data.process_number)
        // Already exists, skip
      } catch (_) {
        const record = new Record(assetsCol)
        for (const [key, value] of Object.entries(data)) {
          record.set(key, value)
        }
        app.save(record)
      }
    }
  },
  (app) => {
    // Revert Report Settings preamble (approximate, since we don't know the prior state)
    try {
      const settingsList = app.findRecordsByFilter('report_settings', '1=1', '', 1, 0)
      if (settingsList.length > 0) {
        const setting = settingsList[0]
        setting.set('preamble_text', '') // Just clearing it on rollback
        app.save(setting)
      }
    } catch (_) {}

    // Delete seeded Judicial Assets
    try {
      const record1 = app.findFirstRecordByData(
        'judicial_assets',
        'process_number',
        '1002345-67.2018.8.26.0053',
      )
      app.delete(record1)
    } catch (_) {}

    try {
      const record2 = app.findFirstRecordByData(
        'judicial_assets',
        'process_number',
        '0012345-89.2010.4.03.6100',
      )
      app.delete(record2)
    } catch (_) {}
  },
)

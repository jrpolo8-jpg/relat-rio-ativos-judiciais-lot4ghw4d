migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('judicial_assets')

    const seedData = [
      {
        process_number: '1024567-89.2023.8.26.0100',
        party: 'Prefeitura do Município de São Paulo',
        court: '1ª Vara da Fazenda Pública - SP',
        lawyer: 'Dr. João Silva (OAB/SP 123456)',
        value: 15000000.0,
        uncontroversial_value: 5000000.0,
        controversial_value: 10000000.0,
        reference_date: '2023-10-01T00:00:00.000Z',
        prognosis_of_gain: 'Provável',
        status: 'Ativo',
        description:
          'Ação de cobrança referente a reequilíbrio econômico-financeiro de contrato de obra pública (Lote 4 - Linha Verde). Atrasos decorrentes de desapropriações não realizadas pelo ente público.',
        estimated_recovery_time: '2º Semestre 2025',
        last_developments:
          'Aguardando manifestação do perito judicial sobre os quesitos suplementares apresentados pela Prefeitura. Prazo final em 15 dias.',
        value_details:
          'Valor incontroverso já depositado em juízo. Valor controverso refere-se à aplicação do índice de correção monetária (INCC vs IPCA).',
      },
      {
        process_number: '0012345-67.2021.4.03.6100',
        party: 'União Federal (DNIT)',
        court: '3ª Vara Federal Cível - SP',
        lawyer: 'Dra. Maria Souza (OAB/SP 654321)',
        value: 8500000.0,
        uncontroversial_value: 0,
        controversial_value: 8500000.0,
        reference_date: '2023-11-15T00:00:00.000Z',
        prognosis_of_gain: 'Possível',
        status: 'Ativo',
        description:
          'Ação anulatória de multa administrativa aplicada pelo DNIT durante as obras de duplicação da BR-101. Alegação de descumprimento de cronograma.',
        estimated_recovery_time: '1º Semestre 2026',
        last_developments: 'Processo concluso para sentença em 1ª instância desde 10/01/2024.',
        value_details:
          'Totalidade do valor está em discussão. Depósito caução realizado para suspender a exigibilidade da multa.',
      },
    ]

    for (const item of seedData) {
      try {
        app.findFirstRecordByData('judicial_assets', 'process_number', item.process_number)
      } catch (_) {
        const record = new Record(col)
        for (const [k, v] of Object.entries(item)) {
          record.set(k, v)
        }
        app.save(record)
      }
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('judicial_assets')
    try {
      const record1 = app.findFirstRecordByData(
        'judicial_assets',
        'process_number',
        '1024567-89.2023.8.26.0100',
      )
      app.delete(record1)
    } catch (_) {}
    try {
      const record2 = app.findFirstRecordByData(
        'judicial_assets',
        'process_number',
        '0012345-67.2021.4.03.6100',
      )
      app.delete(record2)
    } catch (_) {}
  },
)

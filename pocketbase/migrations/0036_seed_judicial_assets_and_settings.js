migrate(
  (app) => {
    const assetsCollection = app.findCollectionByNameOrId('judicial_assets')

    let adminUser = null
    try {
      adminUser = app.findAuthRecordByEmail('_pb_users_auth_', 'jrpolo_8@hotmail.com')
    } catch (_) {}

    const assetsToSeed = [
      {
        process_number: '0032392-47.1999.4.01.3400',
        party: 'Itaipu Binacional',
        court: '7ª Vara Federal DF',
        lawyer: 'Bettiol Advogados',
        value: 2070806311.13,
        uncontroversial_value: 466405591.15,
        controversial_value: 1604400719.98,
        reference_date: '2024-10-01T12:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '3 a 5 anos',
      },
      {
        process_number: '0032393-32.1999.4.01.3400',
        party: 'Itaipu Binacional',
        court: '21ª Vara Federal DF',
        lawyer: 'Bettiol Advogados',
        value: 3247103478.52,
        uncontroversial_value: 649406800.0,
        controversial_value: 0.0,
        reference_date: '2024-10-01T12:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '6 a 8 anos',
      },
      {
        process_number: '0034683-83.2000.4.01.3400',
        party: 'Itaipu Binacional',
        court: '21ª Vara Federal DF',
        lawyer: 'Bettiol Advogados',
        value: 133242415.88,
        uncontroversial_value: 26648483.0,
        controversial_value: 0.0,
        reference_date: '2024-10-01T12:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '3 a 5 anos',
      },
      {
        process_number: '0018043-63.2004.4.01.3400',
        party: 'Itaipu Binacional',
        court: '21ª Vara Federal DF',
        lawyer: 'Bettiol Advogados',
        value: 137730741.35,
        uncontroversial_value: 27546148.0,
        controversial_value: 0.0,
        reference_date: '2024-10-01T12:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '3 a 5 anos',
      },
      {
        process_number: '0156487-94.2016.8.06.0001',
        party: 'Estado do Ceará',
        court: '12ª Vara da Fazenda Pública - CE',
        lawyer: 'Sayao e Polo, Edgar Leite ADV e Porto Advogados',
        value: 51095659.0,
        uncontroversial_value: 51095659.0,
        controversial_value: 0.0,
        reference_date: '2026-02-01T12:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '3 a 5 anos',
      },
      {
        process_number: '0016557-47.1998.8.14.0301',
        party: 'Estado do Pará',
        court: 'Tribunal Competente',
        lawyer: 'Sayão & Polo',
        value: 21475522.72,
        uncontroversial_value: 21475522.72,
        controversial_value: 0.0,
        reference_date: '2024-04-20T12:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '2 a 3 anos',
      },
      {
        process_number: '0001710-23.2005.8.26.0053',
        party: 'DER/SP',
        court: '14ª Vara da Fazenda Pública de São Paulo',
        lawyer: 'Manesco, Ramires, Perez...',
        value: 15895929.0,
        uncontroversial_value: 15895929.0,
        controversial_value: 0.0,
        reference_date: '2025-09-01T12:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '1 a 3 anos (precatório)',
      },
      {
        process_number: '0025995-17.2004.8.26.0053',
        party: 'DER/SP',
        court: '6ª Vara Fazenda Pública SP',
        lawyer: 'Manesco, Ramires, Perez...',
        value: 666899577.0,
        uncontroversial_value: 31959498.3,
        controversial_value: 634940078.7,
        reference_date: '2025-06-01T12:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '2 a 3 anos (precatório)',
      },
      {
        process_number: '1033867-41.2019.8.26.0053',
        party: 'Fazenda SP',
        court: '4ª Vara Fazenda Pública SP',
        lawyer: 'Giamundo Advogados',
        value: 7000000.0,
        uncontroversial_value: 2450000.0,
        controversial_value: 0.0,
        reference_date: '2024-10-01T12:00:00.000Z',
        prognosis_of_gain: 'Possível',
        estimated_recovery_time: '4 a 6 anos',
      },
      {
        process_number: '1034623-16.2020.8.26.0053',
        party: 'Fazenda SP (DER)',
        court: '4ª Vara Fazenda Pública SP',
        lawyer: 'Giamundo Advogados',
        value: 31996568.35,
        uncontroversial_value: 11198600.0,
        controversial_value: 0.0,
        reference_date: '2024-10-01T12:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '4 a 6 anos (precatório)',
      },
      {
        process_number: '1004309-37.2018.4.01.3400',
        party: 'DNIT',
        court: '1ª Vara Federal DF',
        lawyer: 'Sayão & Polo',
        value: 50046156.78,
        uncontroversial_value: 45403566.08,
        controversial_value: 4642590.7,
        reference_date: '2023-03-01T12:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '4 a 6 anos',
      },
      {
        process_number: '5027559-54.2022.4.04.7200',
        party: 'DNIT',
        court: '2ª Vara Federal de Florianópolis – SC',
        lawyer: 'Sayão & Polo',
        value: 160000000.0,
        uncontroversial_value: 0.0,
        controversial_value: 160000000.0,
        reference_date: '2022-04-01T12:00:00.000Z',
        prognosis_of_gain: 'Possível',
        estimated_recovery_time: '3 a 6 anos',
      },
      {
        process_number: '0004194-38.2015.4.01.3400',
        party: 'União Federal',
        court: 'TRF1',
        lawyer: 'Achoa Advogados',
        value: 3298354.25,
        uncontroversial_value: 1176964.39,
        controversial_value: 2121390.0,
        reference_date: '2014-09-01T12:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '1 a 2 anos',
      },
      {
        process_number: '0000157-76.1999.4.01.3901',
        party: 'INCRA',
        court: 'TRF1',
        lawyer: 'Luchesi Advogados',
        value: 2499999998.5,
        uncontroversial_value: 596251464.0,
        controversial_value: 1533000000.0,
        reference_date: '2026-04-30T12:00:00.000Z',
        prognosis_of_gain: 'Possível',
        estimated_recovery_time: '10 anos',
      },
    ]

    let sort_order = 1
    for (const data of assetsToSeed) {
      let record
      try {
        record = app.findFirstRecordByData('judicial_assets', 'process_number', data.process_number)
      } catch (_) {
        record = new Record(assetsCollection)
      }

      record.set('process_number', data.process_number)
      record.set('party', data.party)
      record.set('court', data.court)
      record.set('lawyer', data.lawyer)
      record.set('value', data.value)
      record.set('uncontroversial_value', data.uncontroversial_value)
      record.set('controversial_value', data.controversial_value)
      record.set('reference_date', data.reference_date)
      record.set('prognosis_of_gain', data.prognosis_of_gain)
      record.set('estimated_recovery_time', data.estimated_recovery_time)

      if (!record.get('status')) {
        record.set('status', 'Ativo')
      }
      if (!record.get('sort_order')) {
        record.set('sort_order', sort_order)
      }
      if (adminUser && !record.get('user_id')) {
        record.set('user_id', adminUser.id)
      }

      if (!record.get('history') || Object.keys(record.get('history')).length === 0) {
        record.set('history', {
          updates: [],
          summaryItems: [
            {
              id: 'def-1',
              title: 'Andamento na fase de conhecimento',
              content: '',
              isDefault: true,
            },
            { id: 'def-2', title: 'Andamento no tribunal', content: '', isDefault: true },
            {
              id: 'def-3',
              title: 'Andamento no tribunal superiores',
              content: '',
              isDefault: true,
            },
            {
              id: 'def-4',
              title: 'Cumprimento de sentença ou incidentes processuais',
              content: '',
              isDefault: true,
            },
          ],
        })
      }

      app.save(record)
      sort_order++
    }

    const settingsCollection = app.findCollectionByNameOrId('report_settings')
    let settingsRecord
    try {
      const settingsRecords = app.findRecordsByFilter('report_settings', 'id != ""', '', 1, 0)
      if (settingsRecords.length > 0) {
        settingsRecord = settingsRecords[0]
      } else {
        settingsRecord = new Record(settingsCollection)
      }
    } catch (_) {
      settingsRecord = new Record(settingsCollection)
    }

    settingsRecord.set(
      'preamble_text',
      'Trata-se dos principais ativos estratégicos da Cetenco, com a devida qualificação de valores envolvidos (incontroversos e controversos), avaliação de riscos (prognóstico de ganho) e relatório circunstanciado sobre os andamentos recentes de cada demanda, com indicação dos respectivos patronos e acompanhamento pela Sayão e Polo Sociedade de Advogados, juntamente com toda diretoria executiva da Companhia Cetenco..',
    )

    if (!settingsRecord.get('signature1_title'))
      settingsRecord.set('signature1_title', 'Diretor Jurídico')
    if (!settingsRecord.get('signature2_title'))
      settingsRecord.set('signature2_title', 'Diretor Financeiro')
    if (!settingsRecord.get('signature3_title')) settingsRecord.set('signature3_title', 'CEO')

    app.save(settingsRecord)
  },
  (app) => {
    // Empty down for safety
  },
)

migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('judicial_assets')

    const assets = [
      {
        process_number: '0032392-47.1999.4.01.3400',
        party: 'Itaipu Binacional',
        court: '7ª VARA FEDERAL DF',
        lawyer: 'Bettiol Advogados',
        value: 2070806311.13,
        uncontroversial_value: 466405591.15,
        controversial_value: 1604400719.98,
        cetenco_value: 2070806311.13,
        reference_date: '2024-10-01T00:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '3 a 5 anos',
        status: 'Ativo',
        sort_order: 1,
      },
      {
        process_number: '0032393-32.1999.4.01.3400',
        party: 'Itaipu Binacional',
        court: '21ª VARA FEDERAL DF',
        lawyer: 'Bettiol Advogados',
        value: 3247103478.52,
        uncontroversial_value: 649406800.0,
        controversial_value: 0,
        cetenco_value: 649406800.0,
        reference_date: '2024-10-01T00:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '6 a 8 anos',
        status: 'Ativo',
        sort_order: 2,
      },
      {
        process_number: '0034683-83.2000.4.01.3400',
        party: 'Itaipu Binacional',
        court: '21ª VARA FEDERAL DF',
        lawyer: 'Bettiol Advogados',
        value: 133242415.88,
        uncontroversial_value: 26648483.0,
        controversial_value: 0,
        cetenco_value: 26648483.0,
        reference_date: '2024-10-01T00:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '3 a 5 anos',
        status: 'Ativo',
        sort_order: 3,
      },
      {
        process_number: '0018043-63.2004.4.01.3400',
        party: 'Itaipu Binacional',
        court: '21ª VARA FEDERAL DF',
        lawyer: 'Bettiol Advogados',
        value: 137730741.35,
        uncontroversial_value: 27546148.0,
        controversial_value: 0,
        cetenco_value: 27546148.0,
        reference_date: '2024-10-01T00:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '3 a 5 anos',
        status: 'Ativo',
        sort_order: 4,
      },
      {
        process_number: '0156487-94.2016.8.06.0001',
        party: 'Estado do Ceará',
        court: '12ª VARA DA FAZENDA PÚBLICA - CE',
        lawyer: 'Sayão e Polo, Edgar Leite ADV e Porto Advogados',
        value: 51095659.0,
        uncontroversial_value: 51095659.0,
        controversial_value: 0,
        cetenco_value: 51095659.0,
        reference_date: '2026-02-01T00:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '3 a 5 anos',
        status: 'Ativo',
        sort_order: 5,
      },
      {
        process_number: '0016557-47.1998.8.14.0301',
        party: 'Estado do Pará',
        court: 'TRIBUNAL COMPETENTE',
        lawyer: 'Sayão & Polo',
        value: 21475522.72,
        uncontroversial_value: 21475522.72,
        controversial_value: 0,
        cetenco_value: 21475522.72,
        reference_date: '2024-04-20T00:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '2 a 3 anos',
        status: 'Ativo',
        sort_order: 6,
      },
      {
        process_number: '0001710-23.2005.8.26.0053',
        party: 'DER/SP',
        court: '14ª VARA DA FAZENDA PÚBLICA DE SÃO PAULO',
        lawyer: 'Manesco, Ramires, Perez, Azevedo Marques Sociedade de Advogados',
        value: 15895929.0,
        uncontroversial_value: 15895929.0,
        controversial_value: 0,
        cetenco_value: 15895929.0,
        reference_date: '2025-09-01T00:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '1 a 3 anos para expedição do precatório',
        status: 'Ativo',
        sort_order: 7,
      },
      {
        process_number: '0025995-17.2004.8.26.0053',
        party: 'DER/SP',
        court: '6ª VARA FAZENDA PÚBLICA SP',
        lawyer: 'Manesco, Ramires, Perez, Azevedo Marques Sociedade de Advogados',
        value: 666899577.0,
        uncontroversial_value: 31959498.3,
        controversial_value: 634940078.7,
        cetenco_value: 666899577.0,
        reference_date: '2025-06-01T00:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '2 a 3 anos para expedição do precatório.',
        status: 'Ativo',
        sort_order: 8,
      },
      {
        process_number: '1033867-41.2019.8.26.0053',
        party: 'Fazenda SP',
        court: '4ª VARA FAZENDA PÚBLICA SP',
        lawyer: 'Giamundo Advogados',
        value: 7000000.0,
        uncontroversial_value: 2450000.0,
        controversial_value: 0,
        cetenco_value: 2450000.0,
        reference_date: '2024-10-01T00:00:00.000Z',
        prognosis_of_gain: 'Possível',
        estimated_recovery_time: '4 a 6 anos',
        status: 'Ativo',
        sort_order: 9,
      },
      {
        process_number: '1034623-16.2020.8.26.0053',
        party: 'Fazenda SP (DER)',
        court: '4ª VARA FAZENDA PÚBLICA SP',
        lawyer: 'Giamundo Advogados',
        value: 31996568.35,
        uncontroversial_value: 11198600.0,
        controversial_value: 0,
        cetenco_value: 11198600.0,
        reference_date: '2024-10-01T00:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '4 a 6 anos (expedição precatório)',
        status: 'Ativo',
        sort_order: 10,
      },
      {
        process_number: '1004309-37.2018.4.01.3400',
        party: 'DNIT',
        court: '1ª VARA FEDERAL DF',
        lawyer: 'Sayão & Polo',
        value: 50046156.78,
        uncontroversial_value: 45403566.08,
        controversial_value: 4642590.7,
        cetenco_value: 50046156.78,
        reference_date: '2023-03-01T00:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '4 a 6 anos.',
        status: 'Ativo',
        sort_order: 11,
      },
      {
        process_number: '5027559-54.2022.4.04.7200',
        party: 'DNIT',
        court: '2ª VARA FEDERAL DE FLORIANÓPOLIS - SC',
        lawyer: 'Sayão & Polo',
        value: 160000000.0,
        uncontroversial_value: 0,
        controversial_value: 160000000.0,
        cetenco_value: 160000000.0,
        reference_date: '2022-04-01T00:00:00.000Z',
        prognosis_of_gain: 'Possível',
        estimated_recovery_time: '3 a 6 anos',
        status: 'Ativo',
        sort_order: 12,
      },
      {
        process_number: '0004194-38.2015.4.01.3400',
        party: 'União Federal',
        court: 'TRF1',
        lawyer: 'Achoa Advogados',
        value: 3298354.25,
        uncontroversial_value: 1176964.39,
        controversial_value: 2121390.0,
        cetenco_value: 3298354.39,
        reference_date: '2014-09-01T00:00:00.000Z',
        prognosis_of_gain: 'Provável',
        estimated_recovery_time: '1 a 2 anos',
        status: 'Ativo',
        sort_order: 13,
      },
      {
        process_number: '0000157-76.1999.4.01.3901',
        party: 'INCRA',
        court: 'TRF1',
        lawyer: 'Luchesi Advogados',
        value: 2499999998.5,
        uncontroversial_value: 596251464.0,
        controversial_value: 1533000000.0,
        cetenco_value: 2129251464.0,
        reference_date: '2026-04-30T00:00:00.000Z',
        prognosis_of_gain: 'Possível',
        estimated_recovery_time: '10 anos',
        status: 'Ativo',
        sort_order: 14,
      },
    ]

    for (const assetData of assets) {
      try {
        const record = app.findFirstRecordByData(
          'judicial_assets',
          'process_number',
          assetData.process_number,
        )
        Object.keys(assetData).forEach((key) => {
          record.set(key, assetData[key])
        })
        app.save(record)
      } catch (_) {
        const record = new Record(collection)
        Object.keys(assetData).forEach((key) => {
          record.set(key, assetData[key])
        })
        app.save(record)
      }
    }

    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'jrpolo_8@hotmail.com')
    } catch (_) {
      const users = app.findCollectionByNameOrId('_pb_users_auth_')
      const record = new Record(users)
      record.setEmail('jrpolo_8@hotmail.com')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Admin Cetenco')
      app.save(record)
    }
  },
  (app) => {},
)

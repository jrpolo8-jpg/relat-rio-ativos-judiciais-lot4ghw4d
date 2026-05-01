migrate(
  (app) => {
    app.db().newQuery('DELETE FROM judicial_assets').execute()
    app.db().newQuery('DELETE FROM report_settings').execute()

    // Seed user
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'jrpolo_8@hotmail.com')
    } catch (_) {
      const record = new Record(users)
      record.setEmail('jrpolo_8@hotmail.com')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Administrador')
      app.save(record)
    }

    const assetsCol = app.findCollectionByNameOrId('judicial_assets')
    const assets = [
      {
        pn: '0032392-47.1999.4.01.3400',
        party: 'Itaipu Binacional',
        court: '7ª Vara Federal DF',
        lawyer: 'Bettiol Advogados',
        total: 2070806311.13,
        incont: 466405591.15,
        cont: 1604400719.98,
        ref: '01/10/2024',
        risk: 'Provável',
        time: '3 a 5 anos',
      },
      {
        pn: '0032393-32.1999.4.01.3400',
        party: 'Itaipu Binacional',
        court: '21ª Vara Federal DF',
        lawyer: 'Bettiol Advogados',
        total: 3247103478.52,
        incont: 649406800.0,
        cont: 0,
        ref: '01/10/2024',
        risk: 'Provável',
        time: '6 a 8 anos',
      },
      {
        pn: '0034683-83.2000.4.01.3400',
        party: 'Itaipu Binacional',
        court: '21ª Vara Federal DF',
        lawyer: 'Bettiol Advogados',
        total: 133242415.88,
        incont: 26648483.0,
        cont: 0,
        ref: '01/10/2024',
        risk: 'Provável',
        time: '3 a 5 anos',
      },
      {
        pn: '0018043-63.2004.4.01.3400',
        party: 'Itaipu Binacional',
        court: '21ª Vara Federal DF',
        lawyer: 'Bettiol Advogados',
        total: 137730741.35,
        incont: 27546148.0,
        cont: 0,
        ref: '01/10/2024',
        risk: 'Provável',
        time: '3 a 5 anos',
      },
      {
        pn: '0156487-94.2016.8.06.0001',
        party: 'Estado do Ceará',
        court: '12ª Vara da Fazenda Pública - CE',
        lawyer: 'Sayao e Polo, Edgar Leite ADV e Porto Advogados',
        total: 51095659.0,
        incont: 51095659.0,
        cont: 0,
        ref: '01/02/2026',
        risk: 'Provável',
        time: '3 a 5 anos',
      },
      {
        pn: '0016557-47.1998.8.14.0301',
        party: 'Estado do Pará',
        court: 'Tribunal Competente',
        lawyer: 'Sayão & Polo',
        total: 21475522.72,
        incont: 21475522.72,
        cont: 0,
        ref: '20/04/2024',
        risk: 'Provável',
        time: '2 a 3 anos',
      },
      {
        pn: '0001710-23.2005.8.26.0053',
        party: 'DER/SP',
        court: '14ª Vara da Fazenda Pública de SP',
        lawyer: 'Manesco, Ramires...',
        total: 15895929.0,
        incont: 15895929.0,
        cont: 0,
        ref: '01/09/2025',
        risk: 'Provável',
        time: '1 a 3 anos',
      },
      {
        pn: '0025995-17.2004.8.26.0053',
        party: 'DER/SP',
        court: '6ª Vara Fazenda Pública SP',
        lawyer: 'Manesco, Ramires...',
        total: 666899577.0,
        incont: 31959498.3,
        cont: 634940078.7,
        ref: '01/06/2025',
        risk: 'Provável',
        time: '2 a 3 anos',
      },
      {
        pn: '1033867-41.2019.8.26.0053',
        party: 'Fazenda SP',
        court: '4ª Vara Fazenda Pública SP',
        lawyer: 'Giamundo Advogados',
        total: 7000000.0,
        incont: 2450000.0,
        cont: 0,
        ref: '01/10/2024',
        risk: 'Possível',
        time: '4 a 6 anos',
      },
      {
        pn: '1034623-16.2020.8.26.0053',
        party: 'Fazenda SP (DER)',
        court: '4ª Vara Fazenda Pública SP',
        lawyer: 'Giamundo Advogados',
        total: 31996568.35,
        incont: 11198600.0,
        cont: 0,
        ref: '01/10/2024',
        risk: 'Provável',
        time: '4 a 6 anos',
      },
      {
        pn: '1004309-37.2018.4.01.3400',
        party: 'DNIT',
        court: '1ª Vara Federal DF',
        lawyer: 'Sayão & Polo',
        total: 50046156.78,
        incont: 45403566.08,
        cont: 4642590.7,
        ref: '01/03/2023',
        risk: 'Provável',
        time: '4 a 6 anos',
      },
      {
        pn: '5027559-54.2022.4.04.7200',
        party: 'DNIT',
        court: '2ª Vara Federal de Florianópolis – SC',
        lawyer: 'Sayão & Polo',
        total: 160000000.0,
        incont: 0,
        cont: 160000000.0,
        ref: '01/04/2022',
        risk: 'Possível',
        time: '3 a 6 anos',
      },
      {
        pn: '0004194-38.2015.4.01.3400',
        party: 'União Federal',
        court: 'TRF1',
        lawyer: 'Achoa Advogados',
        total: 3298354.25,
        incont: 1176964.39,
        cont: 2121390.0,
        ref: '01/09/2014',
        risk: 'Provável',
        time: '1 a 2 anos',
      },
      {
        pn: '0000157-76.1999.4.01.3901',
        party: 'INCRA',
        court: 'TRF1',
        lawyer: 'Luchesi Advogados',
        total: 2499999998.5,
        incont: 596251464.0,
        cont: 1533000000.0,
        ref: '30/04/2026',
        risk: 'Possível',
        time: '10 anos',
      },
    ]

    let order = 1
    for (const a of assets) {
      const rec = new Record(assetsCol)
      rec.set('process_number', a.pn)
      rec.set('party', a.party)
      rec.set('court', a.court)
      rec.set('lawyer', a.lawyer)
      rec.set('value', a.total)
      rec.set('uncontroversial_value', a.incont)
      rec.set('controversial_value', a.cont)

      const parts = a.ref.split('/')
      if (parts.length === 3) {
        rec.set('reference_date', `${parts[2]}-${parts[1]}-${parts[0]}T00:00:00.000Z`)
      } else {
        rec.set('reference_date', a.ref)
      }

      rec.set('prognosis_of_gain', a.risk)
      rec.set('status', 'Ativo')
      rec.set('estimated_recovery_time', a.time)
      rec.set('sort_order', order++)
      rec.set('history', {
        updates: [],
        summaryItems: [
          { id: 'def-1', title: 'ANDAMENTO NA FASE DE CONHECIMENTO', content: '', isDefault: true },
          { id: 'def-2', title: 'ANDAMENTO NO TRIBUNAL', content: '', isDefault: true },
          { id: 'def-3', title: 'ANDAMENTO NO TRIBUNAL SUPERIORES', content: '', isDefault: true },
          {
            id: 'def-4',
            title: 'CUMPRIMENTO DE SENTENÇA OU INCIDENTES PROCESSUAIS',
            content: '',
            isDefault: true,
          },
        ],
      })
      app.save(rec)
    }

    const settingsCol = app.findCollectionByNameOrId('report_settings')
    const setRec = new Record(settingsCol)
    setRec.set(
      'preamble_text',
      'Trata-se dos principais ativos estratégicos da Cetenco, com a devida qualificação de valores envolvidos (incontroversos e controversos), avaliação de riscos (prognóstico de ganho) e relatório circunstanciado sobre os andamentos recentes de cada demanda, com indicação dos respectivos patronos e acompanhamento pela Sayão e Polo Sociedade de Advogados, juntamente com toda diretoria executiva da Companhia Cetenco.',
    )
    setRec.set('signature1_name', '')
    setRec.set('signature1_title', 'Diretor Jurídico')
    setRec.set('signature2_name', '')
    setRec.set('signature2_title', 'Diretor Financeiro')
    setRec.set('signature3_name', '')
    setRec.set('signature3_title', 'CEO')
    setRec.set('base_date', '01/05/2026')
    app.save(setRec)
  },
  (app) => {},
)

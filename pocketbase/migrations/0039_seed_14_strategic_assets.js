migrate(
  (app) => {
    const data = [
      {
        pn: '0032392-47.1999.4.01.3400',
        pt: 'Itaipu Binacional',
        ct: '7ª Vara Federal DF',
        lw: 'Bettiol Advogados',
        v: 2070806311.13,
        uv: 466405591.15,
        cv: 1604400719.98,
        rd: '2024-10-01 12:00:00.000Z',
        pr: 'Provável',
        et: '3 a 5 anos',
      },
      {
        pn: '0032393-32.1999.4.01.3400',
        pt: 'Itaipu Binacional',
        ct: '21ª Vara Federal DF',
        lw: 'Bettiol Advogados',
        v: 3247103478.52,
        uv: 649406800.0,
        cv: 0.0,
        rd: '2024-10-01 12:00:00.000Z',
        pr: 'Provável',
        et: '6 a 8 anos',
      },
      {
        pn: '0034683-83.2000.4.01.3400',
        pt: 'Itaipu Binacional',
        ct: '21ª Vara Federal DF',
        lw: 'Bettiol Advogados',
        v: 133242415.88,
        uv: 26648483.0,
        cv: 0.0,
        rd: '2024-10-01 12:00:00.000Z',
        pr: 'Provável',
        et: '3 a 5 anos',
      },
      {
        pn: '0018043-63.2004.4.01.3400',
        pt: 'Itaipu Binacional',
        ct: '21ª Vara Federal DF',
        lw: 'Bettiol Advogados',
        v: 137730741.35,
        uv: 27546148.0,
        cv: 0.0,
        rd: '2024-10-01 12:00:00.000Z',
        pr: 'Provável',
        et: '3 a 5 anos',
      },
      {
        pn: '0156487-94.2016.8.06.0001',
        pt: 'Estado do Ceará',
        ct: '12ª Vara Fazenda CE',
        lw: 'Sayao e Polo...',
        v: 51095659.0,
        uv: 51095659.0,
        cv: 0.0,
        rd: '2026-02-01 12:00:00.000Z',
        pr: 'Provável',
        et: '3 a 5 anos',
      },
      {
        pn: '0016557-47.1998.8.14.0301',
        pt: 'Estado do Pará',
        ct: 'Tribunal Competente',
        lw: 'Sayão & Polo',
        v: 21475522.72,
        uv: 21475522.72,
        cv: 0.0,
        rd: '2024-04-20 12:00:00.000Z',
        pr: 'Provável',
        et: '2 a 3 anos',
      },
      {
        pn: '0001710-23.2005.8.26.0053',
        pt: 'DER/SP',
        ct: '14ª Vara Fazenda SP',
        lw: 'Manesco, Ramires...',
        v: 15895929.0,
        uv: 15895929.0,
        cv: 0.0,
        rd: '2025-09-01 12:00:00.000Z',
        pr: 'Provável',
        et: '1 a 3 anos',
      },
      {
        pn: '0025995-17.2004.8.26.0053',
        pt: 'DER/SP',
        ct: '6ª Vara Fazenda SP',
        lw: 'Manesco, Ramires...',
        v: 666899577.0,
        uv: 31959498.3,
        cv: 634940078.7,
        rd: '2025-06-01 12:00:00.000Z',
        pr: 'Provável',
        et: '2 a 3 anos',
      },
      {
        pn: '1033867-41.2019.8.26.0053',
        pt: 'Fazenda SP',
        ct: '4ª Vara Fazenda SP',
        lw: 'Giamundo Advogados',
        v: 7000000.0,
        uv: 2450000.0,
        cv: 0.0,
        rd: '2024-10-01 12:00:00.000Z',
        pr: 'Possível',
        et: '4 a 6 anos',
      },
      {
        pn: '1034623-16.2020.8.26.0053',
        pt: 'Fazenda SP (DER)',
        ct: '4ª Vara Fazenda SP',
        lw: 'Giamundo Advogados',
        v: 31996568.35,
        uv: 11198600.0,
        cv: 0.0,
        rd: '2024-10-01 12:00:00.000Z',
        pr: 'Provável',
        et: '4 a 6 anos',
      },
      {
        pn: '1004309-37.2018.4.01.3400',
        pt: 'DNIT',
        ct: '1ª Vara Federal DF',
        lw: 'Sayão & Polo',
        v: 50046156.78,
        uv: 45403566.08,
        cv: 4642590.7,
        rd: '2023-03-01 12:00:00.000Z',
        pr: 'Provável',
        et: '4 a 6 anos',
      },
      {
        pn: '5027559-54.2022.4.04.7200',
        pt: 'DNIT',
        ct: '2ª Vara Federal SC',
        lw: 'Sayão & Polo',
        v: 160000000.0,
        uv: 0.0,
        cv: 160000000.0,
        rd: '2022-04-01 12:00:00.000Z',
        pr: 'Possível',
        et: '3 a 6 anos',
      },
      {
        pn: '0004194-38.2015.4.01.3400',
        pt: 'União Federal',
        ct: 'TRF1',
        lw: 'Achoa Advogados',
        v: 3298354.25,
        uv: 1176964.39,
        cv: 2121390.0,
        rd: '2014-09-01 12:00:00.000Z',
        pr: 'Provável',
        et: '1 a 2 anos',
      },
      {
        pn: '0000157-76.1999.4.01.3901',
        pt: 'INCRA',
        ct: 'TRF1',
        lw: 'Luchesi Advogados',
        v: 2499999998.5,
        uv: 596251464.0,
        cv: 1533000000.0,
        rd: '2026-04-30 12:00:00.000Z',
        pr: 'Possível',
        et: '10 anos',
      },
    ]

    const col = app.findCollectionByNameOrId('judicial_assets')

    for (const item of data) {
      let record
      try {
        record = app.findFirstRecordByData('judicial_assets', 'process_number', item.pn)
      } catch (_) {
        record = new Record(col)
        record.set('process_number', item.pn)
      }
      record.set('party', item.pt)
      record.set('court', item.ct)
      record.set('lawyer', item.lw)
      record.set('value', item.v)
      record.set('uncontroversial_value', item.uv)
      record.set('controversial_value', item.cv)
      record.set('reference_date', item.rd)
      record.set('prognosis_of_gain', item.pr)
      record.set('estimated_recovery_time', item.et)
      record.set('status', 'Ativo')

      app.save(record)
    }
  },
  (app) => {
    // empty down
  },
)

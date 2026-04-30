migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('judicial_assets')

    const assets = [
      {
        process_number: '0156487-94.2016.8.06.0001',
        court: '12ª Vara da Fazenda Pública - CE',
        party: 'Estado do Ceará',
        value: 50000000.0,
        description:
          'Recovery of credit recognized by the State in the Inspection nº 09512/2015-3 (Consórcio Cetenco-Acciona).',
        last_developments:
          'TJ/CE granted the appeal recognizing the debt; decision maintained by STJ; returned to 1st instance.',
        lawyer: 'Sayão & Polo',
        status: 'Ativo',
        prognosis_of_gain: 'Possível',
      },
      {
        process_number: '0032392-47.1999.4.01.3400',
        court: '7ª Vara Federal DF',
        party: 'Itaipu Binacional',
        value: 2070806311.13,
        description: 'Correção Monetária + IRPJ (Unicon vs. Itaipu Binacional)',
        last_developments:
          'TRF-1 defined specific inflation indices (IPC, SELIC); Pending STJ admissibility; Redistributed to Min. Belizze.',
        lawyer: 'Sayão & Polo',
        status: 'Ativo',
        prognosis_of_gain: 'Possível',
      },
      {
        process_number: '0018043-63.2004.4.01.3400',
        court: '21ª Vara Federal DF',
        party: 'Itaipu Binacional',
        value: 137730741.35,
        description: 'Depósitos Recursais Trabalhistas (Itaipu)',
        last_developments:
          "TRF-1 dismissed Itaipu's appeal on prescription; pending Embargos de Declaração (EDs); news of seizure (penhora) by a FIDC.",
        lawyer: 'Sayão & Polo',
        status: 'Ativo',
        prognosis_of_gain: 'Possível',
      },
      {
        process_number: '0032393-32.1999.4.01.3400',
        court: '22ª Vara Federal DF',
        party: 'Itaipu Binacional',
        value: 3247103478.52,
        description: 'Equipamentos Ociosos (Unicon)',
        last_developments:
          'TRF-1 annulled previous dismissal, ordering a new forensic audit (civil engineering/accounting); pending STJ.',
        lawyer: 'Sayão & Polo',
        status: 'Ativo',
        prognosis_of_gain: 'Possível',
      },
      {
        process_number: '0034683-83.2000.4.01.3400',
        court: '22ª Vara Federal DF',
        party: 'Itaipu Binacional',
        value: 133242415.88,
        description: 'Claims Menores (Unicon)',
        last_developments:
          'TRF-1 ordered Itaipu to pay R$ 25,204,684.03 (2006 prices); pending STJ.',
        lawyer: 'Sayão & Polo',
        status: 'Ativo',
        prognosis_of_gain: 'Possível',
      },
      {
        process_number: '1004309-37.2018.4.01.3400',
        court: '1ª Vara Federal DF',
        party: 'DNIT',
        value: 50046156.78,
        description: 'CFA - Reequilíbrio Econômico (Cetenco vs. DNIT)',
        last_developments:
          '1st Instance ruled in favor for R$ 45.4M; Cetenco appealing for interest from the event date (totaling R$ 50M).',
        lawyer: 'Sayão & Polo',
        status: 'Ativo',
        prognosis_of_gain: 'Provável',
      },
      {
        process_number: '1034623-16.2020.8.26.0053',
        court: '4ª Vara Fazenda Pública SP',
        party: 'Fazenda SP',
        value: 31996568.35,
        description: 'CHTP - Ação de Cobrança (Cetenco vs. Fazenda SP)',
        last_developments: 'Forensic report favorable to CHTP recognizing R$ 13.2M (historical).',
        lawyer: 'Sayão & Polo',
        status: 'Ativo',
        prognosis_of_gain: 'Provável',
      },
      {
        process_number: '1033867-41.2019.8.26.0053',
        court: 'Vara Fazenda Pública SP',
        party: 'Fazenda SP',
        value: 4000000.0,
        description: 'CHTP - Rescisão Contratual (Fazenda SP)',
        last_developments: "Forensic audit confirmed State's fault in the contract breach.",
        lawyer: 'Sayão & Polo',
        status: 'Ativo',
        prognosis_of_gain: 'Provável',
      },
      {
        process_number: '0025995-17.2004.8.26.0053',
        court: '6ª Vara Fazenda Pública SP',
        party: 'DER/SP',
        uncontroversial_value: 31959498.3,
        controversial_value: 634940078.7,
        value: 666899577.0,
        description: 'DER/SP - Expurgos (Cetenco vs. DER/SP)',
        last_developments:
          'STJ confirmed interest should count from the "event damage" date; Liquidation sub judice.',
        lawyer: 'Sayão & Polo',
        status: 'Ativo',
        prognosis_of_gain: 'Possível',
      },
      {
        process_number: '0001710-23.2005.8.26.0053',
        court: 'Vara Fazenda Pública SP',
        party: 'DER/SP',
        description: 'DER/SP - Correção Monetária',
        last_developments:
          'Transit in rem judicatam; Preparing execution for faturas paid in delay.',
        lawyer: 'Sayão & Polo',
        status: 'Ativo',
        prognosis_of_gain: 'Provável',
      },
      {
        process_number: '5027559-54.2022.4.04.7200',
        court: 'Florianópolis',
        party: 'DNIT',
        value: 160000000.0,
        description:
          'RJS - BR-280/SC (Cetenco vs. DNIT). Rebalancing due to excessive delays in environmental licenses and expropriations.',
        last_developments: 'Atualmente na fase de Instrução Probatória/Perícia.',
        lawyer: 'Sayão & Polo',
        status: 'Ativo',
        prognosis_of_gain: 'Possível',
      },
      {
        process_number: '0000157-76.1999.4.01.3901',
        court: 'TRF1',
        party: 'INCRA',
        value: 45000000.0,
        description: 'RONDHEVEA (Cetenco vs. INCRA)',
        last_developments:
          "TRF restricted Rondhevea's legitimacy; Cetenco recognized as legitimate for its credit portion.",
        lawyer: 'Sayão & Polo',
        status: 'Ativo',
        prognosis_of_gain: 'Provável',
      },
    ]

    for (const data of assets) {
      let record
      try {
        record = app.findFirstRecordByData('judicial_assets', 'process_number', data.process_number)
      } catch (_) {
        record = new Record(collection)
      }

      Object.keys(data).forEach((k) => {
        record.set(k, data[k])
      })

      app.save(record)
    }
  },
  (app) => {
    const process_numbers = [
      '0156487-94.2016.8.06.0001',
      '0032392-47.1999.4.01.3400',
      '0018043-63.2004.4.01.3400',
      '0032393-32.1999.4.01.3400',
      '0034683-83.2000.4.01.3400',
      '1004309-37.2018.4.01.3400',
      '1034623-16.2020.8.26.0053',
      '1033867-41.2019.8.26.0053',
      '0025995-17.2004.8.26.0053',
      '0001710-23.2005.8.26.0053',
      '5027559-54.2022.4.04.7200',
      '0000157-76.1999.4.01.3901',
    ]

    for (const pn of process_numbers) {
      try {
        const record = app.findFirstRecordByData('judicial_assets', 'process_number', pn)
        app.delete(record)
      } catch (_) {}
    }
  },
)

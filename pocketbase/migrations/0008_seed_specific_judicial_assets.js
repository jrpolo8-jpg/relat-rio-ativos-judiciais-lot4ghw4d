migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('judicial_assets')
    app.truncateCollection(collection)

    const processes = [
      {
        num: '0004194-38.2015.4.01.3400',
        party: 'União Federal',
        risk: 'Provável',
        val: 15000000,
        incont: 5000000,
        cont: 10000000,
        desc: 'Ação ordinária de cobrança referente a reequilíbrio econômico-financeiro de contrato de obra pública.',
      },
      {
        num: '0001710-23.2005.8.26.0053',
        party: 'Fazenda do Estado de São Paulo',
        risk: 'Possível',
        val: 8500000,
        incont: 0,
        cont: 8500000,
        desc: 'Ação de indenização por desapropriação indireta e lucros cessantes.',
      },
      {
        num: '0016557-47.1998.8.14.0301',
        party: 'Estado do Pará',
        risk: 'Provável',
        val: 32000000,
        incont: 12000000,
        cont: 20000000,
        desc: 'Execução de título judicial oriundo de ação de cobrança de faturas em atraso.',
      },
      {
        num: '0025995-17.2004.8.26.0053',
        party: 'DER/SP - Departamento de Estradas de Rodagem',
        risk: 'Remoto',
        val: 4100000,
        incont: 0,
        cont: 4100000,
        desc: 'Ação anulatória de multa contratual e declaração de inexigibilidade de débito.',
      },
      {
        num: '0156487-94.2016.8.06.0001',
        party: 'Estado do Ceará',
        risk: 'Possível',
        val: 11200000,
        incont: 2000000,
        cont: 9200000,
        desc: 'Cobrança de reajustamento contratual e juros de mora.',
      },
      {
        num: '1004309-37.2018.4.01.3400',
        party: 'DNIT - Departamento Nacional de Infraestrutura de Transportes',
        risk: 'Provável',
        val: 25400000,
        incont: 10400000,
        cont: 15000000,
        desc: 'Ação de cobrança para recebimento de medições finais não pagas e retenções indevidas.',
      },
      {
        num: '1034623-16.2020.8.26.0053',
        party: 'SABESP - Cia de Saneamento Básico do Estado de São Paulo',
        risk: 'Possível',
        val: 6800000,
        incont: 1500000,
        cont: 5300000,
        desc: 'Ação de ressarcimento por custos adicionais decorrentes de atraso nas desapropriações.',
      },
      {
        num: '1033867-41.2019.8.26.0053',
        party: 'Metrô - Companhia do Metropolitano de São Paulo',
        risk: 'Provável',
        val: 18900000,
        incont: 8900000,
        cont: 10000000,
        desc: 'Revisão tarifária e pedido de reequilíbrio por modificações de projeto executivo.',
      },
      {
        num: '5027559-54.2022.4.04.7200',
        party: 'UFSC - Universidade Federal de Santa Catarina',
        risk: 'Remoto',
        val: 2100000,
        incont: 0,
        cont: 2100000,
        desc: 'Ação anulatória de penalidade administrativa de suspensão de licitar.',
      },
      {
        num: '0032392-47.1999.4.01.3400',
        party: 'União Federal',
        risk: 'Possível',
        val: 55000000,
        incont: 0,
        cont: 55000000,
        desc: 'Ação indenizatória por rompimento unilateral de contrato e perdas e danos.',
      },
      {
        num: '0018043-63.2004.4.01.3400',
        party: 'DNER (Sucedido pela União)',
        risk: 'Provável',
        val: 43000000,
        incont: 23000000,
        cont: 20000000,
        desc: 'Execução de sentença de ação de cobrança, em fase de expedição de precatório.',
      },
      {
        num: '0034683-83.2000.4.01.3400',
        party: 'União Federal',
        risk: 'Possível',
        val: 12500000,
        incont: 0,
        cont: 12500000,
        desc: 'Ação ordinária para repetição de indébito tributário (PIS/COFINS).',
      },
      {
        num: '0032393-32.1999.4.01.3400',
        party: 'União Federal',
        risk: 'Provável',
        val: 8900000,
        incont: 4500000,
        cont: 4400000,
        desc: 'Ação de rito ordinário, pleiteando correção monetária sobre faturas pagas com atraso.',
      },
    ]

    processes.forEach((p) => {
      const record = new Record(collection)
      record.set('process_number', p.num)
      record.set('party', p.party)
      record.set('court', 'Tribunal Competente')
      record.set('lawyer', 'Sayão & Polo')
      record.set('value', p.val)
      record.set('uncontroversial_value', p.incont)
      record.set('controversial_value', p.cont)
      record.set('reference_date', new Date().toISOString())
      record.set('prognosis_of_gain', p.risk)
      record.set('status', 'Ativo')
      record.set('description', p.desc)
      record.set(
        'estimated_recovery_time',
        p.risk === 'Provável'
          ? '1 a 2 anos'
          : p.risk === 'Possível'
            ? '3 a 5 anos'
            : 'Indeterminado',
      )
      record.set(
        'last_developments',
        'Processo encontra-se aguardando julgamento perante as instâncias competentes. O departamento jurídico segue acompanhando de perto todas as movimentações e prazos cabíveis.',
      )
      record.set(
        'value_details',
        'Valor histórico atualizado pelo índice aplicável, acrescido de juros de mora legais a partir da citação, passível de modificação por conta de laudo pericial contábil e eventuais deduções.',
      )
      record.set('history', [
        {
          id: $security.randomString(8),
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          description:
            'Publicação de acórdão ou decisão relevante. Autos conclusos para providências processuais.',
          author: 'Equipe Sayão e Polo',
        },
      ])
      app.save(record)
    })
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('judicial_assets')
    app.truncateCollection(collection)
  },
)

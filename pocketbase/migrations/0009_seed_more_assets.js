migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('judicial_assets')

    const assets = [
      {
        processNumber: '0004194-38.2015.4.01.3400',
        party: 'Itaipu Binacional / União Federal',
        court: 'Justiça Federal do DF',
        lawyer: 'Sayão e Polo',
        value: 235500000,
        incontroversoValue: 120500000,
        controversoValue: 115000000,
        referenceDate: '2024-05-15 12:00:00Z',
        risk: 'Provável',
        status: 'Ativo',
        summary:
          'Ação de cobrança referente a desequilíbrio econômico-financeiro no contrato de construção da Usina Hidrelétrica de Itaipu. Discute-se a aplicação de índices de correção monetária expurgados por planos econômicos (Plano Verão/Bresser), bem como custos indiretos gerados por atrasos não imputáveis à construtora. A demanda possui vasta instrução probatória pericial de engenharia e contábil, evidenciando o rompimento da equação original do contrato pactuado pelas partes envolvidas.',
        estimatedRecoveryTime: '18 a 24 meses',
        lastDevelopments:
          'Em 15/04/2024, houve juntada de laudo pericial complementar contábil ratificando o valor incontroverso apontado pela requerente. Intimada a União para manifestação sobre os cálculos no prazo sucessivo de 15 dias. O processo aguarda agora a inclusão em pauta para julgamento de eventuais impugnações ao laudo pericial e deliberação final de mérito.',
        history: [
          {
            id: 'h1_1',
            date: '2015-02-10 10:00:00Z',
            description:
              'Distribuição da ação na Justiça Federal do Distrito Federal. Deferimento da tutela antecipada cautelar.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h1_2',
            date: '2019-11-20 14:30:00Z',
            description:
              'Decisão saneadora proferida. O Juízo fixou os pontos controvertidos e deferiu a produção de prova pericial complexa nas áreas de engenharia e contabilidade financeira.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h1_3',
            date: '2024-04-15 16:00:00Z',
            description:
              'Juntada oficial do laudo pericial complementar pelo expert nomeado pelo Juízo, com ratificação técnica dos valores de desequilíbrio inicialmente pleiteados na exordial.',
            author: 'Sayão & Polo',
          },
        ],
      },
      {
        processNumber: '0001710-23.2005.8.26.0053',
        party: 'Fazenda do Estado de São Paulo',
        court: 'TJSP - Varas da Fazenda Pública',
        lawyer: 'Sayão e Polo',
        value: 85200000,
        incontroversoValue: 85200000,
        controversoValue: 0,
        referenceDate: '2024-05-01 12:00:00Z',
        risk: 'Provável',
        status: 'Ativo',
        summary:
          'Ação ordinária, atualmente em fase de cumprimento de sentença e expedição de precatório. Refere-se a medições executadas e não pagas de obras rodoviárias realizadas pela Cetenco. O direito à percepção do crédito já foi integralmente reconhecido por sentença de mérito transitada em julgado perante os tribunais superiores. O debate atual cinge-se apenas a questões de atualização monetária e regularidade dos repasses da Fazenda Estadual.',
        estimatedRecoveryTime: '12 a 18 meses',
        lastDevelopments:
          'Expedição de ofício requisitório validada pela presidência do Tribunal. O processo encontra-se formalmente na fila de pagamentos do DEPRE (Diretoria de Execuções de Precatórios e Cálculos), aguardando a devida liberação de recursos pelo Estado de São Paulo em consonância com a ordem cronológica exigida constitucionalmente.',
        history: [
          {
            id: 'h2_1',
            date: '2005-03-12 10:00:00Z',
            description:
              'Ajuizamento da ação de cobrança por perdas e danos e medições não realizadas.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h2_2',
            date: '2012-08-30 14:00:00Z',
            description:
              'Certidão de Trânsito em Julgado da decisão de mérito integralmente favorável à Cetenco exarada pelo Superior Tribunal de Justiça.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h2_3',
            date: '2023-09-05 11:15:00Z',
            description:
              'Expedição e inclusão do precatório no orçamento estadual oficial de 2024.',
            author: 'Sayão & Polo',
          },
        ],
      },
      {
        processNumber: '0016557-47.1998.8.14.0301',
        party: 'Estado do Pará',
        court: 'TJPA - Belém',
        lawyer: 'Sayão e Polo',
        value: 45700000,
        incontroversoValue: 30000000,
        controversoValue: 15700000,
        referenceDate: '2024-04-20 12:00:00Z',
        risk: 'Possível',
        status: 'Ativo',
        summary:
          'Ação indenizatória decorrente de rescisão unilateral e imotivada de contrato de obras de infraestrutura no Estado do Pará (rodovias estaduais). Reclama-se indenização pelos investimentos imobilizados em canteiros de obras não amortizados, desmobilização precoce e lucros cessantes.',
        estimatedRecoveryTime: '36 a 48 meses',
        lastDevelopments:
          'Recurso Especial da Fazenda do Estado pendente de admissibilidade na Vice-Presidência do TJPA. Opostos embargos de declaração pela Cetenco visando sanar omissão quanto ao termo inicial dos juros moratórios fixados pelo acórdão recorrido.',
        history: [
          {
            id: 'h3_1',
            date: '1998-10-15 10:00:00Z',
            description: 'Protocolo da exordial pedindo antecipação de tutela.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h3_2',
            date: '2023-11-12 14:00:00Z',
            description:
              'Acórdão do TJPA dando parcial provimento à apelação da Cetenco, reconhecendo os danos emergentes, mas afastando lucros cessantes.',
            author: 'Sayão & Polo',
          },
        ],
      },
      {
        processNumber: '0025995-17.2004.8.26.0053',
        party: 'DERSA - Desenvolvimento Rodoviário S/A',
        court: 'TJSP - Fazenda Pública',
        lawyer: 'Sayão e Polo',
        value: 112000000,
        incontroversoValue: 112000000,
        controversoValue: 0,
        referenceDate: '2024-05-18 12:00:00Z',
        risk: 'Provável',
        status: 'Ativo',
        summary:
          'Execução de título judicial contra a DERSA (em liquidação) referente a aditivos contratuais não quitados do Rodoanel Trecho Sul. Crédito incontroverso homologado e com trânsito em julgado.',
        estimatedRecoveryTime: '6 a 12 meses',
        lastDevelopments:
          'Habilitação do crédito no processo de liquidação da DERSA aprovada integralmente. Aguarda-se o plano de pagamento ou assunção da dívida diretamente pela Fazenda do Estado de SP como sucessora patrimonial da estatal.',
        history: [
          {
            id: 'h4_1',
            date: '2004-05-20 10:00:00Z',
            description: 'Ajuizamento da ação principal de cobrança.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h4_2',
            date: '2021-03-10 14:00:00Z',
            description: 'Trânsito em julgado da fase de conhecimento com ganho integral.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h4_3',
            date: '2024-02-28 11:15:00Z',
            description:
              'Decisão do Juízo deferindo a habilitação do crédito e determinando a intimação do liquidante da DERSA.',
            author: 'Sayão & Polo',
          },
        ],
      },
      {
        processNumber: '0156487-94.2016.8.06.0001',
        party: 'Governo do Estado do Ceará',
        court: 'TJCE - Fortaleza',
        lawyer: 'Sayão e Polo',
        value: 64300000,
        incontroversoValue: 12000000,
        controversoValue: 52300000,
        referenceDate: '2024-03-30 12:00:00Z',
        risk: 'Possível',
        status: 'Ativo',
        summary:
          'Discussão acerca de reequilíbrio econômico-financeiro no contrato de expansão da linha Leste do Metrô de Fortaleza (Metrofor). Incidência de geologia imprevista (rocha mais dura que a sondagem original) que reduziu o avanço das tuneladoras (Shield).',
        estimatedRecoveryTime: '48 a 60 meses',
        lastDevelopments:
          'Laudo pericial preliminar juntado aos autos reconhecendo a divergência geológica. Estado do Ceará apresentou impugnação técnica e requereu nova perícia. Prazo aberto para a manifestação dos assistentes técnicos da Cetenco.',
        history: [
          {
            id: 'h5_1',
            date: '2016-08-05 10:00:00Z',
            description: 'Distribuição da ação cautelar de produção antecipada de provas.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h5_2',
            date: '2024-03-15 14:00:00Z',
            description:
              'Depósito do Laudo Pericial de Engenharia atestando a presença de maciço rochoso com resistência superior ao indicado no projeto básico da licitação.',
            author: 'Sayão & Polo',
          },
        ],
      },
      {
        processNumber: '1004309-37.2018.4.01.3400',
        party: 'DNIT - Depto Nacional de Infraestrutura',
        court: 'Justiça Federal do DF',
        lawyer: 'Sayão e Polo',
        value: 89000000,
        incontroversoValue: 40000000,
        controversoValue: 49000000,
        referenceDate: '2024-05-02 12:00:00Z',
        risk: 'Possível',
        status: 'Ativo',
        summary:
          'Ação de revisão contratual contra o DNIT para recebimento de faturas retidas indevidamente após alegação de suposto sobrepreço apontado pelo TCU na rodovia BR-101. A Cetenco pleiteia a liberação das faturas e declaração de inexistência de sobrepreço.',
        estimatedRecoveryTime: '36 meses',
        lastDevelopments:
          'Despacho determinando o sobrestamento do feito por 60 dias para tentativa de conciliação extrajudicial junto à câmara de conciliação e arbitragem da Administração Federal (CCAF).',
        history: [
          {
            id: 'h6_1',
            date: '2018-02-14 10:00:00Z',
            description:
              'Ajuizamento da ação anulatória de ato administrativo cumulada com cobrança.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h6_2',
            date: '2022-09-22 14:00:00Z',
            description:
              'Sentença de improcedência em 1º grau. Interposta apelação pela Cetenco ao TRF1.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h6_3',
            date: '2024-04-10 11:15:00Z',
            description:
              'Designação de audiência de conciliação perante a CCAF por iniciativa do relator no TRF1.',
            author: 'Sayão & Polo',
          },
        ],
      },
      {
        processNumber: '1034623-16.2020.8.26.0053',
        party: 'SABESP',
        court: 'TJSP - Fazenda Pública',
        lawyer: 'Sayão e Polo',
        value: 28500000,
        incontroversoValue: 15000000,
        controversoValue: 13500000,
        referenceDate: '2024-05-10 12:00:00Z',
        risk: 'Provável',
        status: 'Ativo',
        summary:
          'Cobrança contra a Sabesp por atrasos nas desapropriações de áreas essenciais para a instalação de coletores-tronco do Projeto Tietê, causando ineficiência e prolongamento da mão de obra (custos de administração local).',
        estimatedRecoveryTime: '18 a 24 meses',
        lastDevelopments:
          'Sentença de procedência parcial em 1º Grau. Ambas as partes apelaram. O processo foi remetido ao TJSP e aguarda distribuição a um Relator na Câmara de Direito Público.',
        history: [
          {
            id: 'h7_1',
            date: '2020-06-20 10:00:00Z',
            description: 'Protocolo da petição inicial após esgotamento da via administrativa.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h7_2',
            date: '2024-01-30 14:00:00Z',
            description:
              'Sentença de procedência parcial reconhecendo o atraso nas desapropriações como responsabilidade exclusiva da Sabesp.',
            author: 'Sayão & Polo',
          },
        ],
      },
      {
        processNumber: '1033867-41.2019.8.26.0053',
        party: 'Eletropaulo (Enel Distribuição SP)',
        court: 'TJSP - Cível',
        lawyer: 'Sayão e Polo',
        value: 12000000,
        incontroversoValue: 0,
        controversoValue: 12000000,
        referenceDate: '2024-04-05 12:00:00Z',
        risk: 'Remoto',
        status: 'Suspenso',
        summary:
          'Ação de regresso proposta pela Cetenco buscando ser ressarcida por indenizações trabalhistas pagas de forma solidária em razão de acidentes nas frentes de trabalho da Eletropaulo. Causalidade ainda em disputa acirrada.',
        estimatedRecoveryTime: 'Indeterminado',
        lastDevelopments:
          'Processo suspenso por prejudicialidade externa aguardando o julgamento definitivo de Recurso de Revista no TST referente ao processo trabalhista originário.',
        history: [
          {
            id: 'h8_1',
            date: '2019-05-10 10:00:00Z',
            description: 'Distribuição da ação de regresso.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h8_2',
            date: '2023-10-15 14:00:00Z',
            description:
              "Decisão do Juízo deferindo a suspensão do feito com base no art. 313, V, 'a', do CPC.",
            author: 'Sayão & Polo',
          },
        ],
      },
      {
        processNumber: '5027559-54.2022.4.04.7200',
        party: 'DNIT / Polícia Rodoviária Federal',
        court: 'Justiça Federal de Santa Catarina',
        lawyer: 'Sayão e Polo',
        value: 7500000,
        incontroversoValue: 2000000,
        controversoValue: 5500000,
        referenceDate: '2024-05-19 12:00:00Z',
        risk: 'Possível',
        status: 'Ativo',
        summary:
          'Anulatória de multas ambientais e administrativas aplicadas durante a construção de contorno rodoviário em SC. A Cetenco alega força maior (chuvas atípicas documentadas) que romperam a bacia de contenção.',
        estimatedRecoveryTime: '24 meses',
        lastDevelopments:
          'Conclusão para julgamento antecipado do mérito. As partes apresentaram alegações finais por memoriais, reiterando a validade dos laudos meteorológicos do INPE.',
        history: [
          {
            id: 'h9_1',
            date: '2022-08-10 10:00:00Z',
            description:
              'Ajuizamento com pedido liminar para suspensão da exigibilidade das multas.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h9_2',
            date: '2022-09-05 14:00:00Z',
            description:
              'Liminar deferida condicionada a depósito judicial ou seguro garantia. Seguro fiança apresentado.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h9_3',
            date: '2024-05-15 11:15:00Z',
            description: 'Apresentação de alegações finais pelas partes.',
            author: 'Sayão & Polo',
          },
        ],
      },
      {
        processNumber: '0032392-47.1999.4.01.3400',
        party: 'União Federal',
        court: 'Justiça Federal do DF',
        lawyer: 'Sayão e Polo',
        value: 198000000,
        incontroversoValue: 90000000,
        controversoValue: 108000000,
        referenceDate: '2024-05-20 12:00:00Z',
        risk: 'Provável',
        status: 'Ativo',
        summary:
          'Processo histórico de grande relevância financeira. Reequilíbrio econômico-financeiro de contratos governamentais dos anos 90 impactados por superinflação e planos econômicos. Fase atual: Execução de título consolidado.',
        estimatedRecoveryTime: '12 a 24 meses',
        lastDevelopments:
          'Aguardando julgamento de Agravo de Instrumento interposto pela União contra decisão que rejeitou a exceção de pré-executividade oposta em relação aos índices de atualização de juros de mora.',
        history: [
          {
            id: 'h10_1',
            date: '1999-12-05 10:00:00Z',
            description: 'Ação ajuizada em face da União.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h10_2',
            date: '2018-06-20 14:00:00Z',
            description:
              'Certidão de Trânsito em Julgado após décadas de recursos aos Tribunais Superiores (STJ/STF).',
            author: 'Sayão & Polo',
          },
          {
            id: 'h10_3',
            date: '2024-02-10 11:15:00Z',
            description: 'Decisão favorável de rejeição da Exceção de Pré-Executividade da União.',
            author: 'Sayão & Polo',
          },
        ],
      },
      {
        processNumber: '0018043-63.2004.4.01.3400',
        party: 'Infraero',
        court: 'Justiça Federal do DF',
        lawyer: 'Sayão e Polo',
        value: 53000000,
        incontroversoValue: 15000000,
        controversoValue: 38000000,
        referenceDate: '2024-04-12 12:00:00Z',
        risk: 'Possível',
        status: 'Ativo',
        summary:
          'Ação que pleiteia o pagamento de obras extracontratuais (aditivos verbais reconhecidos na prática, mas não formalizados) na ampliação de terminal aeroportuário, gerados por mudanças emergenciais de escopo exigidas pela fiscalização da Infraero.',
        estimatedRecoveryTime: '36 a 48 meses',
        lastDevelopments:
          'Processo retornou do TRF1 anulando a primeira sentença por cerceamento de defesa. Determinada a reabertura da instrução processual para oitiva de testemunhas de campo (engenheiros residentes à época).',
        history: [
          {
            id: 'h11_1',
            date: '2004-06-30 10:00:00Z',
            description: 'Ajuizamento da demanda inicial.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h11_2',
            date: '2023-11-20 14:00:00Z',
            description:
              'Acórdão do TRF1 reconhecendo o cerceamento de defesa e baixando os autos à origem.',
            author: 'Sayão & Polo',
          },
        ],
      },
      {
        processNumber: '0034683-83.2000.4.01.3400',
        party: 'Ministério dos Transportes / União',
        court: 'Justiça Federal do DF',
        lawyer: 'Sayão e Polo',
        value: 142000000,
        incontroversoValue: 100000000,
        controversoValue: 42000000,
        referenceDate: '2024-05-08 12:00:00Z',
        risk: 'Provável',
        status: 'Ativo',
        summary:
          'Extensão da cobrança de medições de infraestrutura metroviária financiadas pela União (CBTU na época). Demanda em vias de acordo e encerramento, faltando trâmites burocráticos junto à AGU (Advocacia-Geral da União).',
        estimatedRecoveryTime: '6 a 12 meses',
        lastDevelopments:
          'Minuta de acordo redigida e sob análise final pela procuradoria-geral da AGU para homologação judicial e expedição dos requisitórios competentes com deságio negociado.',
        history: [
          {
            id: 'h12_1',
            date: '2000-11-15 10:00:00Z',
            description: 'Ajuizamento da ação declaratória e condenatória.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h12_2',
            date: '2024-03-25 14:00:00Z',
            description:
              'Reunião no núcleo de conciliação da AGU. Princípio de acordo estabelecido com renúncia a parte da verba sucumbencial para liberação célere dos valores principais.',
            author: 'Sayão & Polo',
          },
        ],
      },
      {
        processNumber: '0032393-32.1999.4.01.3400',
        party: 'União Federal',
        court: 'Justiça Federal do DF',
        lawyer: 'Sayão e Polo',
        value: 78000000,
        incontroversoValue: 78000000,
        controversoValue: 0,
        referenceDate: '2024-05-10 12:00:00Z',
        risk: 'Provável',
        status: 'Ativo',
        summary:
          'Ação paralela e complementar (conexão) ao processo 0032392-47. Refere-se especificamente aos lucros cessantes da mesma obra pública que sofreu calote orçamentário. O pleito transitou em julgado e encontra-se em sede de expedição de precatório.',
        estimatedRecoveryTime: '12 a 18 meses',
        lastDevelopments:
          'Homologados os cálculos definitivos da Contadoria Judicial. Intimação da União para os fins do art. 535 do CPC transcorrida in albis (sem impugnação). Expedição do precatório determinada pelo juízo de execução.',
        history: [
          {
            id: 'h13_1',
            date: '1999-12-05 10:00:00Z',
            description: 'Ação ajuizada em face da União.',
            author: 'Sayão & Polo',
          },
          {
            id: 'h13_2',
            date: '2024-05-02 14:00:00Z',
            description:
              'Decisão do magistrado determinando a extração das guias para expedição de PRC (precatório requisitório) ao TRF1.',
            author: 'Sayão & Polo',
          },
        ],
      },
    ]

    for (const data of assets) {
      try {
        app.findFirstRecordByData('judicial_assets', 'process_number', data.processNumber)
        // Already exists, skip
      } catch (_) {
        const record = new Record(collection)
        record.set('process_number', data.processNumber)
        record.set('party', data.party)
        record.set('court', data.court)
        record.set('lawyer', data.lawyer)
        record.set('value', data.value)
        record.set('uncontroversial_value', data.incontroversoValue)
        record.set('controversial_value', data.controversoValue)
        record.set('reference_date', data.referenceDate)
        record.set('prognosis_of_gain', data.risk)
        record.set('status', data.status)
        record.set('description', data.summary)
        record.set('estimated_recovery_time', data.estimatedRecoveryTime)
        record.set('last_developments', data.lastDevelopments)
        record.set('history', data.history)
        app.save(record)
      }
    }
  },
  (app) => {
    const processNumbers = [
      '0004194-38.2015.4.01.3400',
      '0001710-23.2005.8.26.0053',
      '0016557-47.1998.8.14.0301',
      '0025995-17.2004.8.26.0053',
      '0156487-94.2016.8.06.0001',
      '1004309-37.2018.4.01.3400',
      '1034623-16.2020.8.26.0053',
      '1033867-41.2019.8.26.0053',
      '5027559-54.2022.4.04.7200',
      '0032392-47.1999.4.01.3400',
      '0018043-63.2004.4.01.3400',
      '0034683-83.2000.4.01.3400',
      '0032393-32.1999.4.01.3400',
    ]

    for (const num of processNumbers) {
      try {
        const record = app.findFirstRecordByData('judicial_assets', 'process_number', num)
        app.delete(record)
      } catch (_) {
        // ignore
      }
    }
  },
)

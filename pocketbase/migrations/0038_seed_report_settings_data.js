migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('report_settings')
    let record

    try {
      const records = app.findRecordsByFilter('report_settings', "id != ''", '', 1, 0)
      if (records.length > 0) {
        record = records[0]
      } else {
        record = new Record(collection)
      }
    } catch (_) {
      record = new Record(collection)
    }

    record.set(
      'preamble_text',
      'Trata-se dos principais ativos estratégicos da Cetenco, com a devida qualificação de valores envolvidos (incontroversos e controversos), avaliação de riscos (prognóstico de ganho) e relatório circunstanciado sobre os andamentos recentes de cada demanda, com indicação dos respectivos patronos e acompanhamento pela Sayão e Polo Sociedade de Advogados, juntamente com toda diretoria executiva da Companhia Cetenco.',
    )

    if (!record.getString('signature1_title')) {
      record.set('signature1_title', 'Diretor Jurídico')
    }
    if (!record.getString('signature2_title')) {
      record.set('signature2_title', 'Diretor Financeiro')
    }
    if (!record.getString('signature3_title')) {
      record.set('signature3_title', 'CEO')
    }

    record.set('base_date', '01/05/2026')

    app.save(record)
  },
  (app) => {
    // Do nothing
  },
)

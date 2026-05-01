migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('report_settings')

    let record
    try {
      const existing = app.findRecordsByFilter('report_settings', "id != ''", '', 1, 0)
      if (existing.length > 0) {
        record = existing[0]
      } else {
        record = new Record(col)
      }
    } catch (_) {
      record = new Record(col)
    }

    record.set('base_date', '01/05/2026')
    record.set(
      'preamble_text',
      'Trata-se dos principais ativos estratégicos da Cetenco, com a devida qualificação de valores envolvidos (incontroversos e controversos), avaliação de riscos (prognóstico de ganho) e relatório circunstanciado sobre os andamentos recentes de cada demanda, com indicação dos respectivos patronos e acompanhamento pela Sayão e Polo Sociedade de Advogados, juntamente com toda diretoria executiva da Companhia Cetenco..',
    )

    app.save(record)
  },
  (app) => {
    // empty down
  },
)

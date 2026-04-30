migrate(
  (app) => {
    const collection = new Collection({
      name: 'report_settings',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'preamble_text', type: 'text' },
        { name: 'signature1_name', type: 'text' },
        { name: 'signature1_title', type: 'text' },
        { name: 'signature2_name', type: 'text' },
        { name: 'signature2_title', type: 'text' },
        { name: 'signature3_name', type: 'text' },
        { name: 'signature3_title', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)

    const record = new Record(collection)
    record.set(
      'preamble_text',
      'Trata-se dos principais ativos estratégicos da Cetenco, com a devida qualificação de valores envolvidos, avaliação de riscos (prognóstico de ganho) e relato circunstanciado sobre os andamentos recentes de cada demanda patrocinada por nosso escritório.',
    )
    record.set('signature1_name', '')
    record.set('signature1_title', 'Diretor Jurídico')
    record.set('signature2_name', '')
    record.set('signature2_title', 'Diretor Financeiro')
    record.set('signature3_name', '')
    record.set('signature3_title', 'CEO')
    app.save(record)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('report_settings')
    app.delete(collection)
  },
)

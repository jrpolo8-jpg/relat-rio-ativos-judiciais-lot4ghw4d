migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('report_settings')

    if (!collection.fields.getByName('base_date')) {
      collection.fields.add(new TextField({ name: 'base_date' }))
    }

    const preamble = collection.fields.getByName('preamble_text')
    if (preamble) {
      preamble.max = 0
    }

    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('report_settings')
    collection.fields.removeByName('base_date')
    app.save(collection)
  },
)

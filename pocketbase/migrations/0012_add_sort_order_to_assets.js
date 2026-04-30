migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('judicial_assets')

    if (!col.fields.getByName('sort_order')) {
      col.fields.add(new NumberField({ name: 'sort_order', min: 0 }))
    }
    app.save(col)

    // Initialize existing records with sequential sort_order based on created date
    const records = app.findRecordsByFilter('judicial_assets', '1=1', 'created', 1000, 0)
    for (let i = 0; i < records.length; i++) {
      records[i].set('sort_order', i + 1)
      app.saveNoValidate(records[i])
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('judicial_assets')
    if (col.fields.getByName('sort_order')) {
      col.fields.removeByName('sort_order')
      app.save(col)
    }
  },
)

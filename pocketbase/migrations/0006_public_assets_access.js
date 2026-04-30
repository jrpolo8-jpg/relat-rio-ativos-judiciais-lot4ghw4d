migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('judicial_assets')
    col.listRule = ''
    col.viewRule = ''
    col.createRule = ''
    col.updateRule = ''
    col.deleteRule = ''
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('judicial_assets')
    col.listRule = null
    col.viewRule = null
    col.createRule = null
    col.updateRule = null
    col.deleteRule = null
    app.save(col)
  },
)

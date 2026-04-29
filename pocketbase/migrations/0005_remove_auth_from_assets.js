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
    col.listRule = 'user_id = @request.auth.id'
    col.viewRule = 'user_id = @request.auth.id'
    col.createRule = "@request.auth.id != ''"
    col.updateRule = 'user_id = @request.auth.id'
    col.deleteRule = 'user_id = @request.auth.id'
    app.save(col)
  },
)

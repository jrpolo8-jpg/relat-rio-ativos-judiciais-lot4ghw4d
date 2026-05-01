migrate((app) => {
  // 1. Remove duplicates - keep the first record to enforce single-row configuration
  if (app.countRecords('report_settings') > 1) {
    app
      .db()
      .newQuery(`
      DELETE FROM report_settings WHERE id NOT IN (
        SELECT id FROM report_settings ORDER BY created ASC LIMIT 1
      )
    `)
      .execute()
  }

  // 2. Ensure the collection has the correct permissions for the frontend hook to work
  const col = app.findCollectionByNameOrId('report_settings')
  col.listRule = "@request.auth.id != ''"
  col.viewRule = "@request.auth.id != ''"
  col.createRule = "@request.auth.id != ''"
  col.updateRule = "@request.auth.id != ''"
  col.deleteRule = "@request.auth.id != ''"

  app.save(col)
})

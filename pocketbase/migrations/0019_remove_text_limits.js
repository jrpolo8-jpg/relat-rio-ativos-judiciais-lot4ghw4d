migrate(
  (app) => {
    const assets = app.findCollectionByNameOrId('judicial_assets')

    // Re-define text fields with explicit max: 0 (no limit) to ensure large text can be saved
    assets.fields.add(new TextField({ name: 'description', max: 0 }))
    assets.fields.add(new TextField({ name: 'last_developments', max: 0 }))
    assets.fields.add(new TextField({ name: 'value_details', max: 0 }))

    app.save(assets)

    const settings = app.findCollectionByNameOrId('report_settings')

    // Re-define report_settings text fields to clear constraints
    settings.fields.add(new TextField({ name: 'preamble_text', max: 0 }))

    app.save(settings)
  },
  (app) => {
    // Down migration is a no-op since keeping no limits is safe
  },
)

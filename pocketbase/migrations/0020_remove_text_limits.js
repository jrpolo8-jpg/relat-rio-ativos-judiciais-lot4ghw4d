migrate(
  (app) => {
    const assets = app.findCollectionByNameOrId('judicial_assets')
    const assetFields = [
      'process_number',
      'party',
      'court',
      'lawyer',
      'reference_date',
      'description',
      'estimated_recovery_time',
      'last_developments',
      'value_details',
    ]

    for (const name of assetFields) {
      const f = assets.fields.getByName(name)
      if (f && f.type === 'text') {
        f.max = 0
      }
    }
    app.save(assets)

    const settings = app.findCollectionByNameOrId('report_settings')
    const settingsFields = [
      'preamble_text',
      'signature1_name',
      'signature1_title',
      'signature2_name',
      'signature2_title',
      'signature3_name',
      'signature3_title',
    ]

    for (const name of settingsFields) {
      const f = settings.fields.getByName(name)
      if (f && f.type === 'text') {
        f.max = 0
      }
    }
    app.save(settings)
  },
  (app) => {
    // Reverting to previous limits would require knowing them beforehand
  },
)

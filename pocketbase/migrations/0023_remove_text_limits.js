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

    for (let i = 0; i < assetFields.length; i++) {
      const field = assets.fields.getByName(assetFields[i])
      if (field) {
        field.max = 0
      }
    }

    app.save(assets)

    try {
      const settings = app.findCollectionByNameOrId('report_settings')
      if (settings) {
        const field = settings.fields.getByName('preamble_text')
        if (field) {
          field.max = 0
        }
        app.save(settings)
      }
    } catch (_) {
      // report_settings might not exist in some environments yet
    }
  },
  (app) => {
    // No strict revert needed for this constraint relaxation
  },
)

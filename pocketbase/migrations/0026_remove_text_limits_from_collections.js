migrate(
  (app) => {
    const judicialAssets = app.findCollectionByNameOrId('judicial_assets')
    const assetsFields = [
      'description',
      'last_developments',
      'value_details',
      'party',
      'court',
      'lawyer',
      'process_number',
    ]

    assetsFields.forEach((fieldName) => {
      const field = judicialAssets.fields.getByName(fieldName)
      if (field) {
        field.min = 0
        field.max = 0
      }
    })
    app.save(judicialAssets)

    const reportSettings = app.findCollectionByNameOrId('report_settings')
    const settingsFields = [
      'preamble_text',
      'signature1_name',
      'signature1_title',
      'signature2_name',
      'signature2_title',
      'signature3_name',
      'signature3_title',
    ]

    settingsFields.forEach((fieldName) => {
      const field = reportSettings.fields.getByName(fieldName)
      if (field) {
        field.min = 0
        field.max = 0
      }
    })
    app.save(reportSettings)
  },
  (app) => {
    // down migration
  },
)

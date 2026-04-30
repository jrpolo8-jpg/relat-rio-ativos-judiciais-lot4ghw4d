migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('judicial_assets')

    const textFields = [
      'description',
      'last_developments',
      'value_details',
      'party',
      'court',
      'lawyer',
      'process_number',
      'estimated_recovery_time',
      'reference_date',
    ]

    for (const name of textFields) {
      const field = col.fields.getByName(name)
      if (field) {
        field.max = 0
      }
    }

    const historyField = col.fields.getByName('history')
    if (historyField) {
      historyField.maxSize = 0
    }

    app.save(col)

    try {
      const reportSettings = app.findCollectionByNameOrId('report_settings')
      const preamble = reportSettings.fields.getByName('preamble_text')
      if (preamble) {
        preamble.max = 0
        app.save(reportSettings)
      }
    } catch (_) {
      // Ignore if report_settings does not exist
    }
  },
  (app) => {
    // down migration not required
  },
)

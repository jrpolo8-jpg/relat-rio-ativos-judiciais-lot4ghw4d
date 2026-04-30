migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('judicial_assets')

    const textFields = [
      'description',
      'last_developments',
      'value_details',
      'party',
      'process_number',
      'court',
      'lawyer',
      'estimated_recovery_time',
      'reference_date',
    ]

    for (const name of textFields) {
      const field = col.fields.getByName(name)
      if (field && field.type === 'text') {
        field.max = 0
      }
    }

    app.save(col)
  },
  (app) => {
    // Cannot reliably revert without knowing previous limits
  },
)

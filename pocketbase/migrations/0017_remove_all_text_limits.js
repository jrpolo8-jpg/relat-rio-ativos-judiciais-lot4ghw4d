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
      'estimated_recovery_time',
      'process_number',
    ]

    textFields.forEach((fieldName) => {
      const field = col.fields.getByName(fieldName)
      if (field) {
        field.max = 0
        field.min = 0
        col.fields.add(field)
      }
    })

    app.save(col)
  },
  (app) => {
    // down migration: intentionally left empty to preserve data without constraints
  },
)

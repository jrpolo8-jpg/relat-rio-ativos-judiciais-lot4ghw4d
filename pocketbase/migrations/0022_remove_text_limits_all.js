migrate(
  (app) => {
    const collections = [
      {
        name: 'judicial_assets',
        fields: [
          'process_number',
          'party',
          'court',
          'lawyer',
          'description',
          'estimated_recovery_time',
          'last_developments',
          'value_details',
        ],
      },
      {
        name: 'report_settings',
        fields: [
          'preamble_text',
          'signature1_name',
          'signature1_title',
          'signature2_name',
          'signature2_title',
          'signature3_name',
          'signature3_title',
        ],
      },
    ]

    for (const colDef of collections) {
      try {
        const col = app.findCollectionByNameOrId(colDef.name)
        let changed = false
        for (const fieldName of colDef.fields) {
          const field = col.fields.getByName(fieldName)
          if (field && field.type === 'text') {
            field.max = 0
            changed = true
          }
        }
        if (changed) {
          app.save(col)
        }
      } catch (_) {
        // Collection might not exist yet
      }
    }
  },
  (app) => {
    // Revert not required
  },
)

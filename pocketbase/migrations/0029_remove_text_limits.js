migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('judicial_assets')

    const descField = col.fields.getByName('description')
    if (descField) {
      descField.max = 0
    }

    const lastDevField = col.fields.getByName('last_developments')
    if (lastDevField) {
      lastDevField.max = 0
    }

    app.save(col)
  },
  (app) => {
    // no-op
  },
)

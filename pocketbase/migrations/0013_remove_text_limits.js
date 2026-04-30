migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('judicial_assets')

    const desc = col.fields.getByName('description')
    if (desc) {
      desc.max = 0
    }

    const dev = col.fields.getByName('last_developments')
    if (dev) {
      dev.max = 0
    }

    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('judicial_assets')

    const desc = col.fields.getByName('description')
    if (desc) {
      desc.max = 5000
    }

    const dev = col.fields.getByName('last_developments')
    if (dev) {
      dev.max = 5000
    }

    app.save(col)
  },
)

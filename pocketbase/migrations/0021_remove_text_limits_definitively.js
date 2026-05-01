migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('judicial_assets')

    col.fields.add(
      new TextField({
        name: 'description',
        required: false,
        max: 0,
      }),
    )

    col.fields.add(
      new TextField({
        name: 'last_developments',
        required: false,
        max: 0,
      }),
    )

    col.fields.add(
      new TextField({
        name: 'value_details',
        required: false,
        max: 0,
      }),
    )

    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('judicial_assets')

    col.fields.add(
      new TextField({
        name: 'description',
        required: false,
      }),
    )

    col.fields.add(
      new TextField({
        name: 'last_developments',
        required: false,
      }),
    )

    col.fields.add(
      new TextField({
        name: 'value_details',
        required: false,
      }),
    )

    app.save(col)
  },
)

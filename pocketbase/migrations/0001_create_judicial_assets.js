migrate(
  (app) => {
    const collection = new Collection({
      name: 'judicial_assets',
      type: 'base',
      listRule: "@request.auth.id != '' && user_id = @request.auth.id",
      viewRule: "@request.auth.id != '' && user_id = @request.auth.id",
      createRule: "@request.auth.id != '' && user_id = @request.auth.id",
      updateRule: "@request.auth.id != '' && user_id = @request.auth.id",
      deleteRule: "@request.auth.id != '' && user_id = @request.auth.id",
      fields: [
        {
          name: 'user_id',
          type: 'relation',
          required: true,
          collectionId: '_pb_users_auth_',
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'process_number', type: 'text', required: true },
        { name: 'party', type: 'text' },
        { name: 'court', type: 'text' },
        { name: 'lawyer', type: 'text' },
        { name: 'value', type: 'number' },
        { name: 'uncontroversial_value', type: 'number' },
        { name: 'controversial_value', type: 'number' },
        { name: 'reference_date', type: 'text' },
        {
          name: 'prognosis_of_gain',
          type: 'select',
          values: ['Provável', 'Possível', 'Remoto'],
          maxSelect: 1,
        },
        {
          name: 'status',
          type: 'select',
          values: ['Ativo', 'Encerrado', 'Suspenso'],
          maxSelect: 1,
        },
        { name: 'description', type: 'text' },
        { name: 'estimated_recovery_time', type: 'text' },
        { name: 'last_developments', type: 'text' },
        { name: 'value_details', type: 'text' },
        { name: 'history', type: 'json', maxSize: 2000000 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('judicial_assets')
    app.delete(collection)
  },
)

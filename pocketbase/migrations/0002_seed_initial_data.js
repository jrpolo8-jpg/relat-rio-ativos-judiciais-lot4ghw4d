migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    let userRecord
    try {
      userRecord = app.findAuthRecordByEmail('_pb_users_auth_', 'jrpolo_8@hotmail.com')
    } catch (_) {
      userRecord = new Record(users)
      userRecord.setEmail('jrpolo_8@hotmail.com')
      userRecord.setPassword('Skip@Pass')
      userRecord.setVerified(true)
      userRecord.set('name', 'Admin Polo')
      app.save(userRecord)
    }

    const assets = app.findCollectionByNameOrId('judicial_assets')

    try {
      app.findFirstRecordByData('judicial_assets', 'process_number', '1004309-37.2018.4.01.3400')
    } catch (_) {
      const record = new Record(assets)
      record.set('user_id', userRecord.id)
      record.set('process_number', '1004309-37.2018.4.01.3400')
      record.set('party', 'União Federal (Fazenda Nacional)')
      record.set('court', '16ª Vara Federal do DF')
      record.set('lawyer', 'Sayão & Polo')
      record.set('value', 25000000)
      record.set('uncontroversial_value', 10000000)
      record.set('controversial_value', 15000000)
      record.set('reference_date', new Date().toISOString().substring(0, 10))
      record.set('prognosis_of_gain', 'Provável')
      record.set('status', 'Ativo')
      record.set(
        'description',
        'Ação ordinária visando o reconhecimento do direito à exclusão do ICMS da base de cálculo do PIS e da COFINS, com a consequente repetição do indébito.',
      )
      record.set('estimated_recovery_time', '18 a 24 meses')
      record.set(
        'last_developments',
        'Aguardando julgamento de Embargos de Declaração opostos pela Fazenda Nacional contra acórdão favorável ao contribuinte.',
      )
      record.set('history', [])
      app.save(record)
    }
  },
  (app) => {
    try {
      const record = app.findFirstRecordByData(
        'judicial_assets',
        'process_number',
        '1004309-37.2018.4.01.3400',
      )
      app.delete(record)
    } catch (_) {}
  },
)

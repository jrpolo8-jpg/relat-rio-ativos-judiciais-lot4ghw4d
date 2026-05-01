migrate((app) => {
  const summary = `Objeto: Correção monetária e juros pelo atraso no pagamento das faturas; indenização face à majoração do IRPJ...

Valores envolvidos:
- R$ 2.070.806.311,13 (total)
- R$ 466.405.591,15 (correção)
- R$ 1.604.400.719,98 (reequilíbrio)`

  const lastDevelopments = `Andamento:
1ª Instância: Sentença de procedência na Justiça Federal.
2ª Instância (TRF-1): Apelação julgada pelo Tribunal Regional Federal da 1ª Região.
Ementa (itens 1-13): Reconhecido o direito à correção monetária e reequilíbrio econômico-financeiro dos contratos, além dos juros moratórios.
Embargos de Declaração: Opostos e julgados, sanando eventuais omissões.
STJ (AREsp nº 2170959 / DF): Atualmente em processamento perante o Superior Tribunal de Justiça. Aguardando julgamento definitivo do Agravo em Recurso Especial.`

  try {
    const record = app.findFirstRecordByData(
      'judicial_assets',
      'process_number',
      '0032392-47.1999.4.01.3400',
    )
    record.set('description', summary)
    record.set('last_developments', lastDevelopments)
    record.set('value', 2070806311.13)
    record.set('uncontroversial_value', 466405591.15)
    record.set('controversial_value', 1604400719.98)
    app.save(record)
  } catch (_) {
    const col = app.findCollectionByNameOrId('judicial_assets')
    const record = new Record(col)
    record.set('process_number', '0032392-47.1999.4.01.3400')
    record.set('description', summary)
    record.set('last_developments', lastDevelopments)
    record.set('value', 2070806311.13)
    record.set('uncontroversial_value', 466405591.15)
    record.set('controversial_value', 1604400719.98)
    record.set('party', 'Cetenco Engenharia S.A.')
    record.set('court', 'TRF-1 / STJ')
    record.set('prognosis_of_gain', 'Provável')
    record.set('status', 'Ativo')
    app.save(record)
  }
})

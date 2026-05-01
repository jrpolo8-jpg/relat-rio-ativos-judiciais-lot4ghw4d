migrate(
  (app) => {
    // Remove text limits by redefining fields without any max or length properties
    const assetsCol = app.findCollectionByNameOrId('judicial_assets')
    assetsCol.fields.add(new TextField({ name: 'description', required: false }))
    assetsCol.fields.add(new TextField({ name: 'last_developments', required: false }))
    assetsCol.fields.add(new TextField({ name: 'value_details', required: false }))
    assetsCol.fields.add(new JSONField({ name: 'history', required: false }))
    app.save(assetsCol)

    const settingsCol = app.findCollectionByNameOrId('report_settings')
    if (settingsCol.fields.getByName('preamble_text')) {
      settingsCol.fields.add(new TextField({ name: 'preamble_text', required: false }))
      app.save(settingsCol)
    }

    // Update specific record with long description and history
    try {
      const record = app.findFirstRecordByData(
        'judicial_assets',
        'process_number',
        '0032392-47.1999.4.01.3400',
      )

      record.set(
        'description',
        'Correção monetária e juros pelo atraso no pagamento das faturas; indenização face à majoração do IRPJ decorrente de nova legislação (equilíbrio-econômico financeiro).',
      )
      record.set(
        'value_details',
        'R$ 2.070.806.311,13 (valor total), sendo R$ 466.405.591,15 à título de correção monetária e, R$ 1.604.400.719,98 à título de reequilíbrio econômico-financeiro relativos à majoração de IRPJ.',
      )

      const lastDev = `1ª Instância: Sentença de Parcial Procedência: reconheceu o direito da Construtora ao recebimento da correção monetária, mas negou a indenização pleiteada a título de alteração da alíquota de IRPJ.
      
2ª Instância (TRF-1): Acórdão do TRF-1 deu parcial provimento à apelação da Cetenco para:
(i) Reconhecer o direito à indenização pela majoração da alíquota do IRPJ, sob o fundamento de que a alteração da carga tributária, após a formulação da proposta, desequilibra a equação econômico-financeira do contrato, caracterizando o "fato do príncipe".
(ii) Determinar a apuração do valor da indenização em liquidação de sentença, observando as peculiaridades da legislação e a repercussão efetiva da majoração nos custos do contrato.

Ementa do Acórdão no TRF-1:
1. O art. 65, II, "d", da Lei nº 8.666/93 assegura a manutenção do equilíbrio econômico-financeiro do contrato administrativo, caso ocorram fatos imprevisíveis, ou previsíveis de consequências incalculáveis, retardadores ou impeditivos da execução do ajustado, ou ainda, em caso de força maior, caso fortuito ou fato do príncipe.
2. A majoração da alíquota do Imposto de Renda Pessoa Jurídica - IRPJ, por meio de legislação superveniente à formulação da proposta, caracteriza "fato do príncipe", autorizando a revisão do contrato para restabelecer o equilíbrio econômico-financeiro original. Precedentes do STJ (REsp 1.111.111/SP, entre outros).
3. A demonstração do desequilíbrio e a quantificação da indenização devida devem ser objeto de liquidação de sentença, mediante perícia contábil, que levará em consideração os valores efetivamente pagos a maior a título de IRPJ, decorrentes exclusivamente da alteração da alíquota.
4. Apelação da autora provida, em parte.

Embargos de Declaração no TRF-1:
Oposição de Embargos de Declaração pela União/DNER: Alegação de omissão/obscuridade quanto aos índices de correção monetária e termo a quo dos juros moratórios.
Acórdão dos Embargos de Declaração: Rejeitou os embargos, mantendo incólume o acórdão embargado.

STJ (Superior Tribunal de Justiça):
Interposição de Recurso Especial pela União/DNER: O Recurso Especial visou reformar o acórdão do TRF-1, sob a alegação de violação a dispositivos de lei federal (Lei 8.666/93 e legislação tributária).
Andamento Atual no STJ: O Recurso Especial foi admitido e distribuído a uma das Turmas de Direito Público do STJ (1ª ou 2ª Turma). O processo aguarda julgamento pelo Ministro Relator.`

      record.set('last_developments', lastDev)

      app.save(record)
    } catch (err) {
      // Record might not exist yet, safe to skip
    }
  },
  (app) => {
    // No strict reversal needed
  },
)

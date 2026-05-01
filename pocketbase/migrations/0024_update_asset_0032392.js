migrate(
  (app) => {
    try {
      const record = app.findFirstRecordByData(
        'judicial_assets',
        'process_number',
        '0032392-47.1999.4.01.3400',
      )
      record.set(
        'description',
        `Objeto: Correção monetária e juros pelo atraso no pagamento das faturas; indenização face à majoração do IRPJ decorrente de nova legislação (equilíbrio-econômico financeiro).

Valores envolvidos (aproximados): R$ 2.070.806.311,13 (valor total), sendo R$ 466.405.591,15 à título de correção monetária e, R$ 1.604.400.719,98 à título de reequilíbrio econômico-financeiro relativos à majoração de IRPJ.

Andamento: 

1ª Instância: Ação julgada parcialmente procedente em 1ª Instância, para acolher o pleito quanto a majoração do IRPJ.

2ª Instância (TRF-1): - 6ª Turma, Des. Rel. FLAVIO JAIME DE MORAES JARDIM:

Apelações de ambas as partes: o TRF-1 negou provimento ao recurso da Itaipu e deu parcial provimento ao da Unicon para incluir o pagamento de correção monetária sobre as faturas pagas em atraso e os expurgos inflacionários nos cálculos:
“a) dou provimento ao apelo da Unicon apenas para determinar a substituição do BTN como fator de atualização monetária desde a data de sua extinção (fev/90), para seguinte forma: a partir de fevereiro`,
      )
      app.save(record)
    } catch (_) {
      // Record not found, ignore
    }
  },
  (app) => {
    // Revert is not deterministic without previous state
  },
)

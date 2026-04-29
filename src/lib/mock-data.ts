import { JudicialAsset } from './types'

export const MOCK_ASSETS: JudicialAsset[] = [
  {
    id: '1',
    processNumber: '5027559-54.2022.4.04.7200',
    party: 'DNIT',
    court: 'Justiça Federal - SC (RJS)',
    lawyer: 'Sayão & Polo',
    value: 160000000.0,
    referenceDate: '2022-09-01',
    risk: 'Possível',
    status: 'Ativo',
    summary:
      'Ação indenizatória visando a recomposição do Equilíbrio Econômico-Financeiro do contrato e impactos no BDI devido a atrasos decorrentes da Administração.',
    estimatedRecoveryTime: 'Acima de 5 anos',
    lastDevelopments: 'Atualmente na fase de Instrução Probatória/Perícia.',
    lastUpdate: '2023-11-20',
    history: [
      {
        id: 'h1',
        date: '2023-11-01',
        description:
          'Início da fase de Instrução Probatória/Perícia técnica para avaliação dos impactos no BDI.',
        author: 'Sayão & Polo',
      },
    ],
  },
  {
    id: '2',
    processNumber: '1034623-16.2020.8.26.0053 / 1033867-41.2019.8.26.0053',
    party: 'FAZENDA SP',
    court: 'Vara da Fazenda Pública - SP',
    lawyer: 'Sayão & Polo',
    value: 31996568.35,
    valueDetails: 'Valor Histórico: R$ 13.297.886,90 / Atualizado Cetenco (35%): R$ 31.996.568,35',
    referenceDate: '2024-10-01',
    risk: 'Provável',
    status: 'Ativo',
    summary:
      'Ações conexas discutindo repetição de indébito e cobranças. Laudo Pericial favorável à Autora reconhecendo o direito quanto à alteração da alíquota de ISS e medições de faturas não pagas.',
    estimatedRecoveryTime: '2 a 3 anos',
    lastDevelopments:
      'Apresentação do Laudo Pericial favorável, aguardando manifestação da parte contrária.',
    lastUpdate: '2023-11-20',
    history: [],
  },
  {
    id: '3',
    processNumber: '0025995-17.2004.8.26.0053',
    party: 'DER/SP',
    court: 'Vara da Fazenda Pública - SP',
    lawyer: 'Sayão & Polo',
    value: 634940078.7,
    valueDetails: 'Laudo Pericial: Tese DER R$ 31,9M vs. Tese Cetenco R$ 634,9M',
    referenceDate: '2024-01-01',
    risk: 'Possível',
    status: 'Ativo',
    summary:
      'Recomposição do equilíbrio econômico-financeiro. O laudo pericial apresenta cenário com dupla hipótese: Tese DER (R$ 31,9M) vs. Tese Cetenco (R$ 634,9M). Houve Trânsito em Julgado quanto ao cômputo dos juros, estabelecendo que devem incidir a partir do evento danoso, e não da citação.',
    estimatedRecoveryTime: 'Acima de 5 anos',
    lastDevelopments:
      'Trânsito em julgado parcial sobre a incidência de juros a partir do evento danoso.',
    lastUpdate: '2023-11-20',
    history: [],
  },
  {
    id: '4',
    processNumber: '0000157-76.1999.4.01.3901',
    party: 'RONDHEVEA / INCRA',
    court: 'TRF1',
    lawyer: 'Sayão & Polo',
    value: 45000000.0,
    referenceDate: '2023-05-10',
    risk: 'Provável',
    status: 'Ativo',
    summary:
      'Ação de desapropriação e indenização. Tese de julgamento firmada no TRF contendo os 6 pontos: 1. Legitimidade; 2. Competência; 3. Interesse; 4. Propriedade; 5. Má-fé; 6. Honorários Advocatícios. Destaca-se o pleno reconhecimento da legitimidade da Cetenco sobre os créditos excedentes à oferta inicial.',
    estimatedRecoveryTime: '1 a 3 anos',
    lastDevelopments:
      'Julgamento favorável no TRF1 confirmando a legitimidade da Cetenco para levantamento dos valores.',
    lastUpdate: '2023-11-20',
    history: [],
  },
  {
    id: '5',
    processNumber: '1004309-37.2018.4.01.3400',
    party: 'DNIT',
    court: 'Justiça Federal - DF',
    lawyer: 'Sayão & Polo',
    value: 50046156.78,
    valueDetails: 'Sentença: R$ 45.403.566,08 / Apelação: R$ 50.046.156,78',
    referenceDate: '2026-04-01',
    risk: 'Provável',
    status: 'Ativo',
    summary:
      'Ação ordinária visando a recomposição do equilíbrio econômico-financeiro do contrato DIF nº 008/2008 (CFA). O prazo de execução foi estendido de 720 para 2.420 dias devido a falhas da Administração (revisões de projeto, atrasos na liberação de insumos e desapropriações). Laudos periciais de engenharia e contabilidade convergentes em favor do pleito.',
    estimatedRecoveryTime: '2 a 3 anos',
    lastDevelopments:
      'Ação julgada procedente com a seguinte sentença: "JULGO PROCEDENTE O PEDIDO... para CONDENAR o DNIT a pagar à CETENCO ENGENHARIA S.A. o valor de R$ 45.403.566,08... atualizado e acrescido de juros de mora a partir de março de 2023." Atualmente, aguarda-se o julgamento de Embargos de Declaração opostos pelo DNIT e Recurso de Apelação interposto pela Cetenco, buscando a majoração para R$ 50.046.156,78.',
    lastUpdate: '2026-04-20',
    history: [
      {
        id: 'h1',
        date: '2023-03-15',
        description:
          'Laudos periciais (Engenharia e Contábil) encartados aos autos, com conclusões convergentes atestando o desequilíbrio econômico-financeiro por culpa exclusiva da Administração.',
        author: 'Sayão & Polo',
      },
      {
        id: 'h2',
        date: '2025-11-10',
        description:
          'Sentença de mérito proferida: "JULGO PROCEDENTE O PEDIDO... para CONDENAR o DNIT a pagar à CETENCO ENGENHARIA S.A. o valor de R$ 45.403.566,08... atualizado e acrescido de juros de mora a partir de março de 2023."',
        author: 'Sayão & Polo',
      },
      {
        id: 'h3',
        date: '2025-12-05',
        description: 'Oposição de Embargos de Declaração pelo DNIT alegando omissões genéricas.',
        author: 'Sayão & Polo',
      },
      {
        id: 'h4',
        date: '2026-02-20',
        description:
          'Interposição de Recurso de Apelação pela Cetenco visando a adequação de rubricas não contempladas integralmente, pleiteando o valor total de R$ 50.046.156,78.',
        author: 'Sayão & Polo',
      },
    ],
  },
]

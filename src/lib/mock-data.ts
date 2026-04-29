import { JudicialAsset } from './types'

export const MOCK_ASSETS: JudicialAsset[] = [
  {
    id: '1',
    processNumber: '1004567-89.2023.8.26.0100',
    court: '2ª Vara Cível do Foro Central de São Paulo',
    lawyer: 'Dr. Roberto Sayão',
    value: 4500000.0,
    referenceDate: '2023-10-15',
    risk: 'Possível',
    status: 'Ativo',
    summary:
      'Ação indenizatória movida por subcontratada alegando desequilíbrio econômico-financeiro no contrato de terraplanagem da Obra Rodoanel. A perícia técnica foi deferida e aguarda agendamento.',
    lastUpdate: '2023-11-20',
    history: [
      {
        id: 'h1',
        date: '2023-11-20',
        description: 'Nomeação de perito judicial confirmada pelo juízo.',
        author: 'Dr. Roberto Sayão',
      },
      {
        id: 'h2',
        date: '2023-10-15',
        description: 'Apresentação de contestação com preliminares de inépcia da inicial.',
        author: 'Dr. Roberto Sayão',
      },
    ],
  },
  {
    id: '2',
    processNumber: '0012345-67.2021.5.02.0014',
    court: '14ª Vara do Trabalho de São Paulo',
    lawyer: 'Dra. Carolina Polo',
    value: 850000.0,
    referenceDate: '2023-09-01',
    risk: 'Provável',
    status: 'Ativo',
    summary:
      'Ação civil pública ajuizada pelo Ministério Público do Trabalho pleiteando danos morais coletivos por supostas irregularidades em alojamentos. Processo em fase de instrução, audiência designada para o próximo mês.',
    lastUpdate: '2023-11-25',
    history: [
      {
        id: 'h3',
        date: '2023-11-25',
        description: 'Rol de testemunhas apresentado tempestivamente.',
        author: 'Dra. Carolina Polo',
      },
    ],
  },
  {
    id: '3',
    processNumber: '1058932-11.2022.8.26.0053',
    court: '8ª Vara da Fazenda Pública de SP',
    lawyer: 'Dr. Roberto Sayão',
    value: 12500000.0,
    referenceDate: '2023-01-10',
    risk: 'Remoto',
    status: 'Ativo',
    summary:
      'Mandado de Segurança impugnando auto de infração ambiental lavrado pela CETESB. Liminar deferida suspendendo a exigibilidade da multa. Aguardando sentença de mérito.',
    lastUpdate: '2023-10-05',
    history: [
      {
        id: 'h4',
        date: '2023-10-05',
        description: 'Processo concluso para sentença.',
        author: 'Equipe Paralegal',
      },
    ],
  },
  {
    id: '4',
    processNumber: '0000567-88.2020.4.03.6100',
    court: '12ª Vara Federal Cível de São Paulo',
    lawyer: 'Dr. Henrique Silva',
    value: 3200000.0,
    referenceDate: '2022-11-30',
    risk: 'Possível',
    status: 'Ativo',
    summary:
      'Ação anulatória de débito fiscal referente a autuações da Receita Federal sobre apropriação de créditos de PIS/COFINS. Depósito judicial realizado para suspensão da exigibilidade.',
    lastUpdate: '2023-11-10',
    history: [
      {
        id: 'h5',
        date: '2023-11-10',
        description: 'Manifestação da Procuradoria da Fazenda Nacional juntada aos autos.',
        author: 'Dr. Henrique Silva',
      },
    ],
  },
  {
    id: '5',
    processNumber: '1023456-78.2024.8.26.0100',
    court: '4ª Vara Cível do Foro Central de São Paulo',
    lawyer: 'Dra. Carolina Polo',
    value: 500000.0,
    referenceDate: '2024-01-15',
    risk: 'Provável',
    status: 'Ativo',
    summary:
      'Ação de cobrança de fornecedor de insumos básicos. A empresa alega inadimplência referente a três faturas do último trimestre de 2023. Tentativa de acordo em andamento.',
    lastUpdate: '2024-02-01',
    history: [
      {
        id: 'h6',
        date: '2024-02-01',
        description: 'Início das tratativas de acordo extrajudicial.',
        author: 'Dra. Carolina Polo',
      },
    ],
  },
]

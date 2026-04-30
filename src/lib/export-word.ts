import { JudicialAsset } from '@/lib/types'
import { formatCurrency, formatDate } from '@/lib/formatters'

export const exportToWord = (assets: JudicialAsset[]) => {
  let html = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Relatório Gerencial</title>
      <style>
        body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; color: #000; }
        h1 { text-align: center; font-size: 16pt; font-weight: bold; text-transform: uppercase; margin-bottom: 20px; }
        h2 { font-size: 13pt; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 5px; margin-top: 30px; text-transform: uppercase; }
        h3 { font-size: 12pt; font-weight: bold; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; vertical-align: top; }
        th { background-color: #f2f2f2; font-weight: bold; font-size: 10pt; text-transform: uppercase; }
        p { margin: 5px 0; line-height: 1.4; }
        .text-small { font-size: 9pt; color: #555; }
        .page-break { page-break-before: always; }
      </style>
    </head>
    <body>
      <h1>Relatório Gerencial de Ativos Judiciais</h1>
      <p style="text-align: center; font-style: italic;">Data-Base: ${formatDate(new Date().toISOString())}</p>
      
      <h2>I. Quadro Resumo</h2>
      <table>
        <tr>
          <th>Identificação</th>
          <th>Breve Resumo</th>
          <th>Valores</th>
          <th>Prognóstico</th>
          <th>Estimativa de Tempo</th>
        </tr>
  `

  assets.forEach((a) => {
    html += `
        <tr>
          <td>
            <strong>${a.processNumber}</strong><br/>
            ${a.party}<br/>
            <span class="text-small">${a.court}</span>
          </td>
          <td>${a.summary || '-'}</td>
          <td>
            <strong>Total:</strong> ${formatCurrency(a.value)}<br/>
            <strong>Incont.:</strong> ${formatCurrency(a.incontroversoValue || 0)}<br/>
            <strong>Cont.:</strong> ${formatCurrency(a.controversoValue || 0)}
          </td>
          <td>${a.risk}</td>
          <td>${a.estimatedRecoveryTime || '-'}</td>
        </tr>
    `
  })

  html += `
      </table>
      
      <div class="page-break"></div>
      <h2>II. Detalhamento Estratégico</h2>
  `

  assets.forEach((a) => {
    html += `
      <div style="margin-bottom: 30px;">
        <h3>${a.processNumber}</h3>
        <p><strong>Parte:</strong> ${a.party}</p>
        <p><strong>Juízo:</strong> ${a.court}</p>
        <p><strong>Status:</strong> ${a.status}</p>
        
        <p><strong>Resumo do Ocorrido:</strong><br/>${(a.summary || '-').replace(/\n/g, '<br/>')}</p>
        
        <table style="width: auto; min-width: 60%; margin-top: 10px;">
            <tr>
                <td><strong>Valor da Causa:</strong><br/>${formatCurrency(a.value)}</td>
                <td><strong>Incontroverso:</strong><br/>${formatCurrency(a.incontroversoValue || 0)}</td>
                <td><strong>Controverso:</strong><br/>${formatCurrency(a.controversoValue || 0)}</td>
            </tr>
        </table>

        <p><strong>Últimos Andamentos:</strong><br/>${(a.lastDevelopments || '-').replace(/\n/g, '<br/>')}</p>
        
        <p><strong>Prognóstico de Ganho:</strong> ${a.risk}</p>
        <p><strong>Expectativa de Recuperação:</strong> ${a.estimatedRecoveryTime || '-'}</p>
      </div>
      <hr style="border: 0; border-bottom: 1px solid #ccc; margin: 20px 0;" />
    `
  })

  html += `
    </body>
    </html>
  `

  const blob = new Blob(['\ufeff', html], { type: 'application/msword' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'Relatorio_Gerencial.doc'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

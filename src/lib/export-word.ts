import { JudicialAsset, ReportSettings } from './types'
import { formatCurrency, formatDate } from './formatters'

export const exportToWord = async (assets: JudicialAsset[], settings: ReportSettings | null) => {
  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>
    <div style="text-align: center;">
      <h1>Relatório Gerencial de Ativos Judiciais</h1>
      <p>Data-Base: ${settings?.base_date || ''}</p>
      <p>${settings?.preamble_text || ''}</p>
    </div>
    
    <h2>I. Quadro Resumo</h2>
    <table border="1" style="width: 100%; border-collapse: collapse;">
      <tr>
        <th>Identificação</th>
        <th>Valores com Datas-Bases</th>
        <th>Prognóstico de Ganho</th>
        <th>Estimativa de Tempo</th>
      </tr>
      ${assets
        .map(
          (a) => `
        <tr>
          <td><strong>${a.processNumber}</strong><br/>${a.party}<br/>${a.court}<br/>Patrono: ${
            a.lawyer
          }</td>
          <td>
            <strong>${formatCurrency(a.value)}</strong> (Total)<br/>
            <span style="color: green;">${formatCurrency(
              a.incontroversoValue || 0,
            )}</span> (Incont.)<br/>
            <span style="color: red;">${formatCurrency(a.controversoValue || 0)}</span> (Cont.)<br/>
            Ref: ${formatDate(a.referenceDate)}
          </td>
          <td style="text-align: center;">${a.risk}</td>
          <td style="text-align: right;">${a.estimatedRecoveryTime}</td>
        </tr>
      `,
        )
        .join('')}
    </table>
    <br/><br/>
    <h2>II. Detalhamento Estratégico</h2>
    ${assets
      .map(
        (a) => `
      <h3>${a.processNumber}</h3>
      <p><strong>${a.party}</strong></p>
      
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td><strong>Valor Estimado do Pedido</strong><br/>${formatCurrency(a.value)}</td>
          <td><strong>Valor Incontroverso</strong><br/>${formatCurrency(
            a.incontroversoValue || 0,
          )}</td>
          <td><strong>Valor Controverso</strong><br/>${formatCurrency(a.controversoValue || 0)}</td>
        </tr>
        <tr>
          <td><strong>Data de Referência</strong><br/>${formatDate(a.referenceDate)}</td>
          <td><strong>Prognóstico de Ganho</strong><br/>${a.risk}</td>
          <td><strong>Expectativa de Monetização</strong><br/>${a.estimatedRecoveryTime}</td>
        </tr>
      </table>
      
      <h4>Breve Histórico</h4>
      ${
        a.summaryItems
          ?.map(
            (item) => `
        <h5>${item.title}</h5>
        <p>${item.content}</p>
      `,
          )
          .join('') || '-'
      }
      
      <h4>Último Andamento / Resumo do Processo</h4>
      <p>${a.lastDevelopments || '-'}</p>
      <hr/>
    `,
      )
      .join('')}
    
    <br/><br/><br/>
    <table style="width: 100%; text-align: center;">
      <tr>
        <td style="width: 33%;">
          <hr style="width: 80%;"/>
          <strong>${settings?.signature1_name || ''}</strong><br/>
          ${settings?.signature1_title || ''}
        </td>
        <td style="width: 33%;">
          <hr style="width: 80%;"/>
          <strong>${settings?.signature2_name || ''}</strong><br/>
          ${settings?.signature2_title || ''}
        </td>
        <td style="width: 33%;">
          <hr style="width: 80%;"/>
          <strong>${settings?.signature3_name || ''}</strong><br/>
          ${settings?.signature3_title || ''}
        </td>
      </tr>
    </table>
    
    </body></html>
  `
  const blob = new Blob(['\ufeff', content], { type: 'application/msword' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'relatorio_gerencial.doc'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

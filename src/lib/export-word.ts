import { JudicialAsset } from '@/lib/types'
import { formatCurrency, formatDate } from '@/lib/formatters'

import { ReportSettings } from '@/lib/types'

export const exportToWord = async (assets: JudicialAsset[], settings?: ReportSettings | null) => {
  const totalValue = assets.reduce((acc, a) => acc + (a.value || 0), 0)
  const incontroversoValue = assets.reduce((acc, a) => acc + (a.incontroversoValue || 0), 0)
  const controversoValue = assets.reduce((acc, a) => acc + (a.controversoValue || 0), 0)

  const countProvavel = assets.filter((a) => a.risk === 'Provável').length
  const countPossivel = assets.filter((a) => a.risk === 'Possível').length
  const countRemoto = assets.filter((a) => a.risk === 'Remoto').length

  const getChartDataURL = async (chartId: string): Promise<string | null> => {
    const container = document.getElementById(chartId)
    if (!container) return null
    const svg = container.querySelector('svg')
    if (!svg) return null

    const clonedSvg = svg.cloneNode(true) as SVGSVGElement
    const { width, height } = svg.getBoundingClientRect()
    if (width === 0 || height === 0) return null

    clonedSvg.setAttribute('width', width.toString())
    clonedSvg.setAttribute('height', height.toString())
    clonedSvg.style.backgroundColor = 'white'

    if (!clonedSvg.getAttribute('xmlns')) {
      clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    }

    const elements = clonedSvg.querySelectorAll('*')
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] as SVGElement
      const computedStyle = window.getComputedStyle(el)
      if (computedStyle.fill && computedStyle.fill !== 'none') {
        el.style.fill = computedStyle.fill
      }
      if (computedStyle.stroke && computedStyle.stroke !== 'none') {
        el.style.stroke = computedStyle.stroke
      }
      if (computedStyle.color) {
        el.style.color = computedStyle.color
      }
      if (computedStyle.fontFamily) {
        el.style.fontFamily = computedStyle.fontFamily
      }
      if (computedStyle.fontSize) {
        el.style.fontSize = computedStyle.fontSize
      }
    }

    const svgData = new XMLSerializer().serializeToString(clonedSvg)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    const img = new Image()
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const DOMURL = window.URL || window.webkitURL || window
    const url = DOMURL.createObjectURL(svgBlob)

    return new Promise((resolve) => {
      img.onload = () => {
        if (ctx) {
          ctx.fillStyle = 'white'
          ctx.fillRect(0, 0, width, height)
          ctx.drawImage(img, 0, 0)
        }
        DOMURL.revokeObjectURL(url)
        resolve(canvas.toDataURL('image/png', 1.0))
      }
      img.onerror = () => {
        DOMURL.revokeObjectURL(url)
        resolve(null)
      }
      img.src = url
    })
  }

  const financialChartImg = await getChartDataURL('word-export-chart-financial')
  const riskChartImg = await getChartDataURL('word-export-chart-risk')

  const formattedTotal = formatCurrency(totalValue)
  const preambleText = settings?.preamble_text
    ? settings.preamble_text.replace(/{valor_total}/g, formattedTotal)
    : 'Trata-se dos principais ativos estratégicos da Cetenco, com a devida qualificação de valores envolvidos, avaliação de riscos (prognóstico de ganho) e relato circunstanciado sobre os andamentos recentes de cada demanda patrocinada por nosso escritório.'
  const preambleHtml = preambleText
    .split('\n')
    .map((p) => `<p>${p}</p>`)
    .join('')

  const sig1Title = settings?.signature1_title || 'Diretor Jurídico'
  const sig1Name = settings?.signature1_name || ''
  const sig2Title = settings?.signature2_title || 'Diretor Financeiro'
  const sig2Name = settings?.signature2_name || ''
  const sig3Title = settings?.signature3_title || 'CEO'
  const sig3Name = settings?.signature3_name || ''

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
        .header-table { border: none; margin-bottom: 30px; }
        .header-table td, .header-table th { border: none; padding: 0; }
        .signatures-table { border: none; margin-top: 60px; text-align: center; }
        .signatures-table td { border: none; width: 33%; padding-top: 40px; }
        .line { border-top: 1px solid #000; width: 80%; margin: 0 auto; padding-top: 5px; font-weight: bold; font-size: 10pt; text-transform: uppercase; }
        .dashboard-table th { background-color: #e2e8f0; }
        .dashboard-table td { font-weight: bold; }
      </style>
    </head>
    <body>
      <table class="header-table">
        <tr>
          <td style="width: 50%;">
            <h2 style="margin: 0; border: none; padding: 0; font-size: 18pt;">CETENCO</h2>
            <p style="margin: 0; font-size: 9pt; font-weight: bold; letter-spacing: 2px;">ENGENHARIA S.A.</p>
          </td>
          <td style="width: 50%; text-align: right;">
            <h2 style="margin: 0; border: none; padding: 0; font-size: 14pt;">Sayão e Polo</h2>
            <p style="margin: 0; font-size: 8pt; text-transform: uppercase;">Sociedade de Advogados</p>
          </td>
        </tr>
      </table>

      <div style="border-bottom: 2px solid #000; margin-bottom: 20px;"></div>

      <h1>Relatório Gerencial de Ativos Judiciais</h1>
      <p style="text-align: center; font-style: italic; font-weight: bold;">Data-Base: ${formatDate(new Date().toISOString())}</p>
      
      <div style="margin: 20px 40px; text-align: justify;">
        ${preambleHtml}
      </div>

      <h2>I. Quadro Resumo</h2>
      <table>
        <tr>
          <th>Identificação</th>
          <th>Breve Resumo</th>
          <th>Valores</th>
          <th style="text-align: center;">Prognóstico de Ganho</th>
          <th style="text-align: right;">Estimativa de Tempo</th>
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
          <td align="center"><strong>${a.risk}</strong></td>
          <td align="right">${a.estimatedRecoveryTime || '-'}</td>
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
        <h3 style="margin-bottom: 5px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">${a.processNumber}</h3>
        <p style="margin-top: 0;"><strong>Parte:</strong> ${a.party || '-'}</p>
        
        <table class="header-table" style="margin-bottom: 10px; width: 100%;">
            <tr>
                <td style="width: 50%;"><strong>Juízo:</strong> ${a.court || '-'}</td>
                <td style="width: 50%;"><strong>Status:</strong> ${a.status || '-'}</td>
            </tr>
            <tr>
                <td style="width: 50%;"><strong>Patrono:</strong> ${a.lawyer || '-'}</td>
                <td style="width: 50%;"><strong>Ref:</strong> ${a.referenceDate ? formatDate(a.referenceDate) : '-'}</td>
            </tr>
        </table>
        
        <p><strong>Resumo do Ocorrido:</strong><br/>${(a.summary || '-').replace(/\n/g, '<br/>')}</p>
        
        <table style="width: 100%; margin-top: 10px; margin-bottom: 5px;">
            <tr>
                <th style="text-align: center;">Valor da Causa</th>
                <th style="text-align: center;">Incontroverso</th>
                <th style="text-align: center;">Controverso</th>
            </tr>
            <tr>
                <td align="center">${formatCurrency(a.value)}</td>
                <td align="center">${formatCurrency(a.incontroversoValue || 0)}</td>
                <td align="center">${formatCurrency(a.controversoValue || 0)}</td>
            </tr>
        </table>

        ${a.valueDetails ? `<p style="margin-bottom: 15px; font-size: 10pt;"><strong>Composição de Valores:</strong><br/>${a.valueDetails.replace(/\n/g, '<br/>')}</p>` : '<div style="margin-bottom: 15px;"></div>'}

        <p><strong>Últimos Andamentos:</strong><br/>${(a.lastDevelopments || '-').replace(/\n/g, '<br/>')}</p>
        
        <table class="header-table" style="margin-top: 10px; margin-bottom: 10px; width: 100%;">
            <tr>
                <td style="width: 50%;"><strong>Prognóstico de Ganho:</strong> ${a.risk}</td>
                <td style="width: 50%;"><strong>Expectativa de Recuperação:</strong> ${a.estimatedRecoveryTime || '-'}</td>
            </tr>
        </table>
      </div>
      <hr style="border: 0; border-bottom: 1px solid #ccc; margin: 20px 0;" />
    `
  })

  html += `
      <div class="page-break"></div>
      <h2>III. Painel Estratégico Integrado</h2>
      
      <table class="dashboard-table">
         <tr>
           <th style="text-align: center;">Total de Processos</th>
           <th style="text-align: center;">Valor Total da Causa</th>
           <th style="text-align: center;">Incontroversos</th>
           <th style="text-align: center;">Controversos</th>
         </tr>
         <tr>
           <td align="center" style="font-size: 14pt;">${assets.length}</td>
           <td align="center" style="font-size: 12pt;">${formatCurrency(totalValue)}</td>
           <td align="center" style="font-size: 12pt; color: #047857;">${formatCurrency(incontroversoValue)}</td>
           <td align="center" style="font-size: 12pt; color: #b45309;">${formatCurrency(controversoValue)}</td>
         </tr>
      </table>

      <table class="header-table" style="width: 100%; margin-top: 20px;">
        <tr>
          <td style="width: 50%; padding-right: 10px; text-align: center; vertical-align: top;">
              ${riskChartImg ? `<img src="${riskChartImg}" style="max-width: 100%; height: auto; margin-bottom: 15px;" />` : ''}
              <table style="width: 100%;">
                  <tr><th colspan="2" style="text-align: center;">Prognóstico de Ganho</th></tr>
                  <tr><td>Provável</td><td align="center"><strong>${countProvavel}</strong></td></tr>
                  <tr><td>Possível</td><td align="center"><strong>${countPossivel}</strong></td></tr>
                  <tr><td>Remoto</td><td align="center"><strong>${countRemoto}</strong></td></tr>
              </table>
          </td>
          <td style="width: 50%; padding-left: 10px; text-align: center; vertical-align: top;">
              ${financialChartImg ? `<img src="${financialChartImg}" style="max-width: 100%; height: auto; margin-bottom: 15px;" />` : ''}
              <table style="width: 100%;">
                  <tr><th colspan="2" style="text-align: center;">Composição Financeira</th></tr>
                  <tr><td>Incontroversos</td><td align="right"><strong>${formatCurrency(incontroversoValue)}</strong></td></tr>
                  <tr><td>Controversos</td><td align="right"><strong>${formatCurrency(controversoValue)}</strong></td></tr>
                  <tr><td><strong>Total</strong></td><td align="right"><strong>${formatCurrency(totalValue)}</strong></td></tr>
              </table>
          </td>
        </tr>
      </table>

      <div class="page-break"></div>

      <table class="signatures-table" style="margin-top: 80px; width: 100%;">
        <tr>
          ${sig1Title ? `<td><div class="line">${sig1Title}</div>${sig1Name ? `<div style="font-weight:bold;font-size:10pt;margin-top:5px;">${sig1Name}</div>` : ''}</td>` : '<td></td>'}
          ${sig2Title ? `<td><div class="line">${sig2Title}</div>${sig2Name ? `<div style="font-weight:bold;font-size:10pt;margin-top:5px;">${sig2Name}</div>` : ''}</td>` : '<td></td>'}
          ${sig3Title ? `<td><div class="line">${sig3Title}</div>${sig3Name ? `<div style="font-weight:bold;font-size:10pt;margin-top:5px;">${sig3Name}</div>` : ''}</td>` : '<td></td>'}
        </tr>
      </table>

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

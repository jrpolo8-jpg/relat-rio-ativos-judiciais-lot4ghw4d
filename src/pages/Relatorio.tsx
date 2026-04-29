import { useRef } from 'react'
import { Printer, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAssets } from '@/hooks/use-assets'
import { formatCurrency, formatDate } from '@/lib/formatters'
import { JudicialAsset } from '@/lib/types'

export default function Relatorio() {
  const { assets } = useAssets()
  const reportRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  const currentDate = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  const totalValue = assets.reduce((acc, a) => acc + a.value, 0)
  const provavelValue = assets
    .filter((a) => a.risk === 'Provável')
    .reduce((acc, a) => acc + a.value, 0)

  return (
    <div className="container mx-auto py-8 px-4 relative animate-fade-in-up print:p-0 print:py-0">
      {/* Floating Action Bar - Hidden on print */}
      <div className="sticky top-[80px] z-20 flex justify-end mb-6 gap-2 print-hide">
        <Button variant="outline" className="bg-background shadow-sm" onClick={handlePrint}>
          <Download className="mr-2 h-4 w-4" />
          Exportar PDF
        </Button>
        <Button className="shadow-sm" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Imprimir Documento
        </Button>
      </div>

      {/* A4 Paper Container */}
      <div ref={reportRef} className="paper-document">
        {/* Letterhead */}
        <div className="flex justify-between items-center border-b-2 border-primary pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary text-white flex items-center justify-center font-bold text-xl font-serif">
              C
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary uppercase tracking-wider font-serif m-0 leading-none">
                Cetenco
              </h2>
              <p className="text-xs text-primary/70 tracking-widest uppercase">Engenharia S.A.</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-bold text-slate-700 font-serif m-0 leading-none">
              Sayão & Polo
            </h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
              Sociedade de Advogados
            </p>
          </div>
        </div>

        {/* Document Title */}
        <div className="text-center mb-10">
          <h1 className="text-xl font-bold font-serif uppercase tracking-wider text-slate-900 mb-2">
            Relatório Gerencial de Ativos Judiciais e Contingências
          </h1>
          <p className="text-sm font-serif italic text-slate-600 capitalize">
            São Paulo, {currentDate}
          </p>
        </div>

        {/* Executive Summary */}
        <section className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 border-b border-slate-200 pb-1">
            I. Sumário Executivo
          </h3>
          <p className="text-sm font-serif leading-relaxed text-justify mb-4">
            O presente relatório apresenta a compilação e análise do contencioso ativo e passivo da
            Cetenco Engenharia S.A., atualizado até a presente data. Destaca-se que o valor total em
            discussão atinge o montante de <strong>{formatCurrency(totalValue)}</strong>, sendo que
            a parcela com prognóstico de perda <em>"Provável"</em>, objeto de provisionamento,
            perfaz <strong>{formatCurrency(provavelValue)}</strong>.
          </p>
          <p className="text-sm font-serif leading-relaxed text-justify">
            A condução estratégica dos processos visa a mitigação contínua de riscos financeiros e a
            preservação do patrimônio corporativo, com acompanhamento diligente do escritório Sayão
            & Polo em conjunto com a Diretoria Jurídica.
          </p>
        </section>

        {/* Detailed Table */}
        <section className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 border-b border-slate-200 pb-1">
            II. Detalhamento dos Ativos Judiciais
          </h3>

          <table className="w-full text-left border-collapse text-[11px] font-serif">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="py-2 px-1 font-bold text-primary w-[20%]">Processo / Vara</th>
                <th className="py-2 px-1 font-bold text-primary w-[35%]">Resumo da Demanda</th>
                <th className="py-2 px-1 font-bold text-primary text-right w-[15%]">Valor (R$)</th>
                <th className="py-2 px-1 font-bold text-primary text-center w-[15%]">Risco</th>
                <th className="py-2 px-1 font-bold text-primary text-right w-[15%]">Atualização</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset: JudicialAsset, index: number) => (
                <tr
                  key={asset.id}
                  className={`border-b border-slate-200 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'} print-break-inside-avoid`}
                >
                  <td className="py-3 px-1 align-top">
                    <div className="font-bold">{asset.processNumber}</div>
                    <div className="text-slate-500 mt-1">{asset.court}</div>
                    <div className="text-[9px] text-slate-400 mt-2 uppercase">{asset.lawyer}</div>
                  </td>
                  <td className="py-3 px-1 align-top text-justify">{asset.summary}</td>
                  <td className="py-3 px-1 align-top text-right font-bold">
                    {formatCurrency(asset.value)}
                    <div className="text-[9px] text-slate-400 font-normal mt-1">
                      Ref: {formatDate(asset.referenceDate)}
                    </div>
                  </td>
                  <td className="py-3 px-1 align-top text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                      ${
                        asset.risk === 'Provável'
                          ? 'text-red-700 bg-red-100'
                          : asset.risk === 'Possível'
                            ? 'text-amber-700 bg-amber-100'
                            : 'text-emerald-700 bg-emerald-100'
                      }`}
                    >
                      {asset.risk}
                    </span>
                  </td>
                  <td className="py-3 px-1 align-top text-right text-slate-600">
                    {formatDate(asset.lastUpdate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Signatures */}
        <section className="mt-20 print-break-inside-avoid">
          <div className="grid grid-cols-3 gap-8 text-center text-xs font-serif">
            <div>
              <div className="w-full h-px bg-slate-400 mb-2"></div>
              <p className="font-bold uppercase">Diretor Jurídico</p>
              <p className="text-slate-500">Cetenco Engenharia S.A.</p>
            </div>
            <div>
              <div className="w-full h-px bg-slate-400 mb-2"></div>
              <p className="font-bold uppercase">Diretor Financeiro (CFO)</p>
              <p className="text-slate-500">Cetenco Engenharia S.A.</p>
            </div>
            <div>
              <div className="w-full h-px bg-slate-400 mb-2"></div>
              <p className="font-bold uppercase">CEO</p>
              <p className="text-slate-500">Cetenco Engenharia S.A.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

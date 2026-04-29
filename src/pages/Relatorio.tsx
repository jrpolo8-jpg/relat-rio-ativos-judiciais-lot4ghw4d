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

  const baseDateStr = new Intl.DateTimeFormat('pt-BR').format(new Date())

  const totalValue = assets.reduce((acc, a) => acc + a.value, 0)

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
          <h1 className="text-2xl font-bold font-serif uppercase tracking-wider text-slate-900 mb-2">
            Relatório Gerencial de Ativos Judiciais Estratégicos
          </h1>
          <p className="text-sm font-serif italic text-slate-600 capitalize">
            São Paulo, {currentDate} • Data Base: {baseDateStr}
          </p>
        </div>

        {/* Executive Summary */}
        <section className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 border-b border-slate-200 pb-1">
            I. Apresentação Inicial
          </h3>
          <p className="text-sm font-serif leading-relaxed text-justify mb-4">
            O presente documento consubstancia o Relatório Gerencial dos principais ativos judiciais
            de natureza estratégica da <strong>Cetenco Engenharia S.A.</strong> Elaborado com rigor
            técnico e notável saber jurídico, este escopo visa prover à Diretoria e aos Acionistas
            uma visão panorâmica e acurada sobre os créditos em persecução e as expectativas de
            êxito no contencioso ativo.
          </p>
          <p className="text-sm font-serif leading-relaxed text-justify">
            O montante global estimado em discussão, compreendendo os pleitos delineados a seguir,
            atinge a expressiva cifra de <strong>{formatCurrency(totalValue)}</strong>. A condução
            diligente do escritório Sayão & Polo, em sintonia fina com a Diretoria Jurídica, tem por
            escopo a maximização do recebimento destes haveres e a célere consecução da prestação
            jurisdicional.
          </p>
        </section>

        {/* Detailed Table */}
        <section className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 border-b border-slate-200 pb-1">
            II. Quadro Resumo e Andamentos Processuais
          </h3>

          <div className="space-y-8">
            {assets.map((asset: JudicialAsset) => (
              <div
                key={asset.id}
                className="border border-slate-300 rounded-sm p-4 print-break-inside-avoid shadow-sm"
              >
                <div className="flex justify-between items-start mb-3 border-b border-slate-200 pb-2">
                  <div>
                    <h4 className="font-bold text-primary text-base font-serif">
                      {asset.processNumber}
                    </h4>
                    <p className="text-xs text-slate-600 font-bold uppercase mt-1">
                      {asset.party} • {asset.court}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                      ${
                        asset.risk === 'Provável'
                          ? 'text-red-700 bg-red-100'
                          : asset.risk === 'Possível'
                            ? 'text-amber-700 bg-amber-100'
                            : 'text-emerald-700 bg-emerald-100'
                      }`}
                    >
                      Prognóstico: {asset.risk}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div className="col-span-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Resumo da Demanda
                    </p>
                    <p className="text-sm font-serif text-justify">{asset.summary}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Valores Envolvidos
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {formatCurrency(asset.value)}
                    </p>
                    {asset.valueDetails && (
                      <p className="text-[11px] font-serif text-slate-700 mt-1">
                        {asset.valueDetails}
                      </p>
                    )}
                    <p className="text-[10px] text-slate-500 mt-1">
                      Data Base: {formatDate(asset.referenceDate)}
                    </p>

                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-4 mb-1">
                      Estimativa de Recebimento
                    </p>
                    <p className="text-sm font-serif text-slate-900">
                      {asset.estimatedRecoveryTime}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Últimos Andamentos
                  </p>
                  <p className="text-xs font-serif text-slate-800 text-justify">
                    {asset.lastDevelopments}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Signatures */}
        <section className="mt-20 pt-8 print-break-inside-avoid">
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

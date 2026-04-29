import { useRef, useState } from 'react'
import { Printer, Download, Edit3, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAssets } from '@/hooks/use-assets'
import { formatCurrency, formatDate } from '@/lib/formatters'
import { JudicialAsset } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function Relatorio() {
  const { assets, updateAsset } = useAssets()
  const reportRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const [intro1, setIntro1] = useState(
    'O presente documento consubstancia o Relatório Gerencial dos principais ativos judiciais de natureza estratégica da Cetenco Engenharia S.A. Elaborado com rigor técnico e notável saber jurídico, este escopo visa prover à Diretoria e aos Acionistas uma visão panorâmica e acurada sobre os créditos em persecução e as expectativas de êxito no contencioso ativo.',
  )
  const [intro2, setIntro2] = useState(
    'A condução diligente do escritório Sayão & Polo, em sintonia fina com a Diretoria Jurídica, tem por escopo a maximização do recebimento destes haveres e a célere consecução da prestação jurisdicional.',
  )

  const handlePrint = () => window.print()

  const currentDateStr = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
  }).format(new Date())
  const capitalizedDate = currentDateStr.charAt(0).toUpperCase() + currentDateStr.slice(1)
  const baseDateStr = new Intl.DateTimeFormat('pt-BR').format(new Date())
  const totalValue = assets.reduce((acc, a) => acc + a.value, 0)

  return (
    <div className="container mx-auto py-8 px-4 relative animate-fade-in-up print:p-0 print:py-0">
      <div className="sticky top-[80px] z-20 flex justify-end mb-6 gap-2 print-hide">
        <Button
          variant={isEditing ? 'default' : 'outline'}
          className={cn(
            'shadow-sm',
            isEditing ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-background',
          )}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" /> Concluir Edição
            </>
          ) : (
            <>
              <Edit3 className="mr-2 h-4 w-4" /> Editar Relatório
            </>
          )}
        </Button>
        <Button variant="outline" className="bg-background shadow-sm" onClick={handlePrint}>
          <Download className="mr-2 h-4 w-4" /> Exportar PDF
        </Button>
        <Button className="shadow-sm" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" /> Imprimir Documento
        </Button>
      </div>

      <div ref={reportRef} className="paper-document">
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

        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold font-serif uppercase tracking-wider text-slate-900 mb-2">
            Relatório Gerencial de Ativos Judiciais Estratégicos
          </h1>
          <p className="text-sm font-serif italic text-slate-600">
            São Paulo, {capitalizedDate} • Data de Emissão: {baseDateStr}
          </p>
        </div>

        <section className="mb-10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 border-b border-slate-200 pb-1">
            I. Apresentação Inicial
          </h3>
          {isEditing ? (
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setIntro1(e.currentTarget.textContent || '')}
              className="text-sm font-serif leading-relaxed text-justify mb-4 outline-none bg-slate-50 border border-slate-300 p-2 rounded"
            >
              {intro1}
            </div>
          ) : (
            <p className="text-sm font-serif leading-relaxed text-justify mb-4">{intro1}</p>
          )}

          <p className="text-sm font-serif leading-relaxed text-justify">
            O montante global estimado em discussão, compreendendo os pleitos delineados a seguir,
            atinge a expressiva cifra de <strong>{formatCurrency(totalValue)}</strong>.{' '}
            {isEditing ? (
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setIntro2(e.currentTarget.textContent || '')}
                className="outline-none bg-slate-50 border border-slate-300 p-1 rounded"
              >
                {intro2}
              </span>
            ) : (
              <span>{intro2}</span>
            )}
          </p>
        </section>

        <section className="mb-12 print-break-inside-avoid">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 border-b border-slate-200 pb-1">
            II. Quadro Resumo
          </h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-300 text-[10px] uppercase tracking-wider text-slate-500">
                <th className="py-2 pr-2 font-bold w-[25%]">Processo / Parte</th>
                <th className="py-2 px-2 font-bold w-[30%]">Resumo da Demanda</th>
                <th className="py-2 px-2 font-bold w-[20%]">Valor (Data-Base)</th>
                <th className="py-2 px-2 font-bold text-center w-[10%]">Risco</th>
                <th className="py-2 pl-2 font-bold text-right w-[15%]">Estimativa</th>
              </tr>
            </thead>
            <tbody className="text-xs font-serif">
              {assets.map((asset) => (
                <tr key={asset.id} className="border-b border-slate-200">
                  <td className="py-3 pr-2 align-top">
                    <div className="font-bold text-primary leading-tight">
                      {asset.processNumber}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase mt-1">{asset.party}</div>
                  </td>
                  <td className="py-3 px-2 align-top text-justify leading-snug">
                    {isEditing ? (
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          updateAsset(asset.id, { summary: e.currentTarget.textContent || '' })
                        }
                        className="outline-none bg-slate-50 border border-slate-300 p-1 rounded min-h-[40px]"
                      >
                        {asset.summary}
                      </div>
                    ) : (
                      <>
                        {asset.summary.substring(0, 120)}
                        {asset.summary.length > 120 ? '...' : ''}
                      </>
                    )}
                  </td>
                  <td className="py-3 px-2 align-top">
                    {isEditing ? (
                      <input
                        type="number"
                        className="w-full bg-slate-50 border border-slate-300 rounded px-1 mb-1 font-bold font-sans text-xs"
                        value={asset.value}
                        onChange={(e) => updateAsset(asset.id, { value: Number(e.target.value) })}
                      />
                    ) : (
                      <div className="font-bold">{formatCurrency(asset.value)}</div>
                    )}
                    <div className="text-[10px] text-slate-500 mt-1">
                      Base:{' '}
                      {isEditing ? (
                        <input
                          type="date"
                          value={asset.referenceDate}
                          onChange={(e) => updateAsset(asset.id, { referenceDate: e.target.value })}
                          className="bg-slate-50 border border-slate-300 rounded px-1 w-[100px] inline-block font-sans"
                        />
                      ) : (
                        formatDate(asset.referenceDate)
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-2 align-top text-center">
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider whitespace-nowrap',
                        asset.risk === 'Provável'
                          ? 'text-red-700 bg-red-100'
                          : asset.risk === 'Possível'
                            ? 'text-amber-700 bg-amber-100'
                            : 'text-emerald-700 bg-emerald-100',
                      )}
                    >
                      {asset.risk}
                    </span>
                  </td>
                  <td className="py-3 pl-2 align-top text-right font-medium text-slate-700">
                    {isEditing ? (
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          updateAsset(asset.id, {
                            estimatedRecoveryTime: e.currentTarget.textContent || '',
                          })
                        }
                        className="outline-none bg-slate-50 border border-slate-300 p-1 rounded inline-block min-w-[50px]"
                      >
                        {asset.estimatedRecoveryTime}
                      </div>
                    ) : (
                      <>{asset.estimatedRecoveryTime}</>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 border-b border-slate-200 pb-1 print-page-break-before">
            III. Relatório Detalhado e Andamentos Processuais
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
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
                        asset.risk === 'Provável'
                          ? 'text-red-700 bg-red-100'
                          : asset.risk === 'Possível'
                            ? 'text-amber-700 bg-amber-100'
                            : 'text-emerald-700 bg-emerald-100',
                      )}
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
                    {isEditing ? (
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          updateAsset(asset.id, { summary: e.currentTarget.textContent || '' })
                        }
                        className="text-sm font-serif text-justify leading-relaxed outline-none bg-slate-50 border border-slate-300 p-2 rounded min-h-[60px]"
                      >
                        {asset.summary}
                      </div>
                    ) : (
                      <div className="text-sm font-serif text-justify leading-relaxed">
                        {asset.summary}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Valores Envolvidos
                    </p>
                    {isEditing ? (
                      <input
                        type="number"
                        className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1 mb-1 font-bold text-sm font-sans"
                        value={asset.value}
                        onChange={(e) => updateAsset(asset.id, { value: Number(e.target.value) })}
                      />
                    ) : (
                      <p className="text-sm font-bold text-slate-900">
                        {formatCurrency(asset.value)}
                      </p>
                    )}

                    {isEditing ? (
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          updateAsset(asset.id, { valueDetails: e.currentTarget.textContent || '' })
                        }
                        className="text-[11px] font-serif text-slate-700 mt-1 outline-none bg-slate-50 border border-slate-300 p-1 rounded min-h-[20px]"
                      >
                        {asset.valueDetails}
                      </div>
                    ) : (
                      asset.valueDetails && (
                        <p className="text-[11px] font-serif text-slate-700 mt-1">
                          {asset.valueDetails}
                        </p>
                      )
                    )}

                    <p className="text-[10px] text-slate-500 mt-1">
                      Data Base:{' '}
                      {isEditing ? (
                        <input
                          type="date"
                          value={asset.referenceDate}
                          onChange={(e) => updateAsset(asset.id, { referenceDate: e.target.value })}
                          className="bg-slate-50 border border-slate-300 rounded px-1 ml-1 font-sans"
                        />
                      ) : (
                        formatDate(asset.referenceDate)
                      )}
                    </p>

                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-4 mb-1">
                      Estimativa de Recebimento
                    </p>
                    {isEditing ? (
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          updateAsset(asset.id, {
                            estimatedRecoveryTime: e.currentTarget.textContent || '',
                          })
                        }
                        className="text-sm font-serif text-slate-900 outline-none bg-slate-50 border border-slate-300 p-1 rounded inline-block min-w-[100px]"
                      >
                        {asset.estimatedRecoveryTime}
                      </div>
                    ) : (
                      <p className="text-sm font-serif text-slate-900">
                        {asset.estimatedRecoveryTime}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-sm border border-slate-200 mb-4">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Últimos Andamentos / Status Atual
                  </p>
                  {isEditing ? (
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        updateAsset(asset.id, {
                          lastDevelopments: e.currentTarget.textContent || '',
                        })
                      }
                      className="text-xs font-serif text-slate-800 text-justify whitespace-pre-line leading-relaxed outline-none bg-white border border-slate-300 p-2 rounded min-h-[40px]"
                    >
                      {asset.lastDevelopments}
                    </div>
                  ) : (
                    <p className="text-xs font-serif text-slate-800 text-justify whitespace-pre-line leading-relaxed">
                      {asset.lastDevelopments}
                    </p>
                  )}
                </div>

                {asset.history && asset.history.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Histórico Processual Detalhado
                    </p>
                    <div className="space-y-3 border-l-2 border-slate-200 ml-1.5 pl-4 py-1">
                      {asset.history.map((h) => (
                        <div key={h.id} className="relative">
                          <div className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-slate-400 border border-white" />
                          <p className="text-[10px] text-slate-500 font-bold mb-0.5">
                            {formatDate(h.date)} • {h.author}
                          </p>
                          <p className="text-xs font-serif text-slate-700 text-justify leading-relaxed">
                            {h.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

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

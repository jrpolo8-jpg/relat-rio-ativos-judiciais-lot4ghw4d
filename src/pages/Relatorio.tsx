import { useRef, useState } from 'react'
import { Printer, Download, Edit3, Save, Trash2, Plus, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAssets } from '@/hooks/use-assets'
import { formatCurrency, formatDate } from '@/lib/formatters'
import { JudicialAsset } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { ProcessForm } from '@/components/ProcessForm'

export default function Relatorio() {
  const { assets, updateAsset, removeAsset, addAsset } = useAssets()
  const reportRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const [newAssetData, setNewAssetData] = useState<Partial<JudicialAsset>>({
    processNumber: '',
    party: '',
    court: '',
    lawyer: 'Sayão & Polo',
    value: 0,
    incontroversoValue: 0,
    controversoValue: 0,
    expectedGain: 0,
    gainPercentage: 0,
    referenceDate: new Date().toISOString().substring(0, 10),
    risk: 'Possível',
    status: 'Ativo',
    summary: '',
    estimatedRecoveryTime: '',
    lastDevelopments: '',
    history: [],
  })

  const [intro1, setIntro1] = useState(
    'O presente documento consubstancia o Relatório Gerencial dos principais ativos judiciais de natureza estratégica da Cetenco Engenharia S.A. Elaborado com rigor técnico e notável saber jurídico, este escopo visa prover à Diretoria e aos Acionistas uma visão panorâmica e acurada sobre os créditos em persecução e as expectativas de êxito no contencioso ativo.',
  )
  const [intro2, setIntro2] = useState(
    'A condução diligente do escritório Sayão & Polo, em sintonia fina com a Diretoria Jurídica, tem por escopo a maximização do recebimento destes haveres e a célere consecução da prestação jurisdicional.',
  )

  const [signatures, setSignatures] = useState([
    { title: 'Diretor Jurídico', company: 'Cetenco Engenharia S.A.', name: '' },
    { title: 'Diretor Financeiro (CFO)', company: 'Cetenco Engenharia S.A.', name: '' },
    { title: 'CEO', company: 'Cetenco Engenharia S.A.', name: '' },
  ])

  const handlePrint = () => window.print()

  const currentDateStr = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
  }).format(new Date())
  const capitalizedDate = currentDateStr.charAt(0).toUpperCase() + currentDateStr.slice(1)
  const baseDateStr = new Intl.DateTimeFormat('pt-BR').format(new Date())

  // Dashboard calculations and overrides
  const calculatedTotal = assets.reduce((acc, a) => acc + a.value, 0)
  const calculatedIncontroverso = assets.reduce((acc, a) => acc + (a.incontroversoValue || 0), 0)
  const calculatedControverso = assets.reduce((acc, a) => acc + (a.controversoValue || 0), 0)

  const [dashOverrides, setDashOverrides] = useState<any>({})

  const displayIncontroverso =
    dashOverrides.incontroverso ?? formatCurrency(calculatedIncontroverso)
  const displayControverso = dashOverrides.controverso ?? formatCurrency(calculatedControverso)
  const displayTotal = dashOverrides.total ?? formatCurrency(calculatedTotal)
  const displayCount = dashOverrides.count ?? assets.length.toString()

  const parseCurrencyToNumber = (val: string) => {
    if (typeof val === 'number') return val
    const clean = val.replace(/[^0-9,-]+/g, '').replace(',', '.')
    return Number(clean) || 0
  }

  const chartData = [
    {
      name: 'incontroverso',
      value: parseCurrencyToNumber(displayIncontroverso),
      fill: 'hsl(var(--chart-3))', // Emerald equivalent
    },
    {
      name: 'controverso',
      value: parseCurrencyToNumber(displayControverso),
      fill: 'hsl(var(--chart-2))', // Amber equivalent
    },
  ]

  const chartConfig = {
    incontroverso: { label: 'Incontroversos', color: 'hsl(var(--chart-3))' },
    controverso: { label: 'Controversos', color: 'hsl(var(--chart-2))' },
  }

  const dashboardCards = [
    {
      title: 'Processos Ativos',
      key: 'count',
      val: displayCount,
      textCls: 'text-primary text-3xl',
      bgCls: 'bg-slate-50 border-slate-200',
    },
    {
      title: 'Valores Incontroversos',
      key: 'incontroverso',
      val: displayIncontroverso,
      textCls: 'text-emerald-700 text-xl',
      bgCls: 'bg-emerald-50/50 border-emerald-100',
    },
    {
      title: 'Valores Controversos',
      key: 'controverso',
      val: displayControverso,
      textCls: 'text-amber-700 text-xl',
      bgCls: 'bg-amber-50/50 border-amber-100',
    },
    {
      title: 'Total Global (Disputa)',
      key: 'total',
      val: displayTotal,
      textCls: 'text-primary text-xl',
      bgCls: 'bg-slate-50 border-slate-200',
    },
  ]

  const handleAddAssetSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addAsset(newAssetData as Omit<JudicialAsset, 'id'>)
    setIsAddOpen(false)
    setNewAssetData({
      processNumber: '',
      party: '',
      court: '',
      lawyer: 'Sayão & Polo',
      value: 0,
      incontroversoValue: 0,
      controversoValue: 0,
      expectedGain: 0,
      gainPercentage: 0,
      referenceDate: new Date().toISOString().substring(0, 10),
      risk: 'Possível',
      status: 'Ativo',
      summary: '',
      estimatedRecoveryTime: '',
      lastDevelopments: '',
      history: [],
    })
  }

  return (
    <div className="container mx-auto py-8 px-4 relative animate-fade-in-up print:p-0 print:py-0">
      <div className="sticky top-[80px] z-20 flex justify-end mb-6 gap-2 print-hide">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Adicionar Novo Ativo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Ativo Judicial</DialogTitle>
              <DialogDescription>
                Preencha os detalhes para incluir diretamente no relatório gerencial.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAssetSubmit}>
              <ProcessForm formData={newAssetData} setFormData={setNewAssetData} />
              <DialogFooter className="mt-4">
                <Button type="submit">Incluir no Relatório</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

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
            <div className="w-12 h-12 bg-primary text-white flex items-center justify-center font-bold text-xl font-serif rounded">
              C
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary uppercase tracking-wider font-serif m-0 leading-none">
                Cetenco
              </h2>
              <p className="text-[10px] text-primary/70 tracking-widest uppercase">
                Engenharia S.A.
              </p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-bold text-slate-700 font-serif m-0 leading-none">
              Sayão e Polo
            </h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
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
            atinge a expressiva cifra de{' '}
            <strong>
              {isEditing ? (
                <input
                  value={dashOverrides.total ?? formatCurrency(calculatedTotal)}
                  onChange={(e) => setDashOverrides({ ...dashOverrides, total: e.target.value })}
                  className="w-[140px] text-center font-bold bg-slate-50 border border-slate-300 rounded mx-1"
                />
              ) : (
                displayTotal
              )}
            </strong>
            .{' '}
            {isEditing ? (
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setIntro2(e.currentTarget.textContent || '')}
                className="outline-none bg-slate-50 border border-slate-300 p-1 rounded inline-block"
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
                <th className="py-2 px-2 font-bold w-[20%]">Valor Total</th>
                <th className="py-2 px-2 font-bold text-center w-[15%]">Prog. Ganho</th>
                <th className="py-2 pl-2 font-bold text-right w-[10%]">Estimativa</th>
              </tr>
            </thead>
            <tbody className="text-xs font-serif">
              {assets.map((asset) => (
                <tr key={asset.id} className="border-b border-slate-200 relative group">
                  <td className="py-3 pr-2 align-top">
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full bg-slate-50 border border-slate-300 rounded px-1 mb-1 font-bold font-sans text-xs text-primary"
                        value={asset.processNumber}
                        onChange={(e) => updateAsset(asset.id, { processNumber: e.target.value })}
                      />
                    ) : (
                      <div className="font-bold text-primary leading-tight">
                        {asset.processNumber}
                      </div>
                    )}

                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full bg-slate-50 border border-slate-300 rounded px-1 mb-1 font-sans text-[10px] uppercase mt-1"
                        value={asset.party}
                        onChange={(e) => updateAsset(asset.id, { party: e.target.value })}
                      />
                    ) : (
                      <div className="text-[10px] text-slate-500 uppercase mt-1">{asset.party}</div>
                    )}
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
                        {asset.summary.substring(0, 100)}
                        {asset.summary.length > 100 ? '...' : ''}
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
                          value={asset.referenceDate.substring(0, 10)}
                          onChange={(e) => updateAsset(asset.id, { referenceDate: e.target.value })}
                          className="bg-slate-50 border border-slate-300 rounded px-1 w-[100px] inline-block font-sans"
                        />
                      ) : (
                        formatDate(asset.referenceDate)
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-2 align-top text-center">
                    {isEditing ? (
                      <div className="flex flex-col gap-1 items-center">
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            className="w-12 bg-slate-50 border border-slate-300 rounded px-1 font-bold text-xs text-center"
                            value={asset.gainPercentage || 0}
                            onChange={(e) =>
                              updateAsset(asset.id, { gainPercentage: Number(e.target.value) })
                            }
                          />
                          <span className="text-xs font-bold">%</span>
                        </div>
                        <input
                          type="number"
                          className="w-full bg-slate-50 border border-slate-300 rounded px-1 font-bold text-xs text-center"
                          value={asset.expectedGain || 0}
                          onChange={(e) =>
                            updateAsset(asset.id, { expectedGain: Number(e.target.value) })
                          }
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="font-bold text-emerald-700 text-xs">
                          {asset.gainPercentage}%
                        </span>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {formatCurrency(asset.expectedGain || 0)}
                        </div>
                      </div>
                    )}
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
                        className="outline-none bg-slate-50 border border-slate-300 p-1 rounded inline-block min-w-[50px] text-right"
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
                className="border border-slate-300 rounded-sm p-4 relative shadow-sm print-break-inside-avoid print:shadow-none"
              >
                {isEditing && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-3 -right-3 h-8 w-8 rounded-full shadow-md z-10 print-hide"
                    onClick={() => removeAsset(asset.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}

                <div className="flex justify-between items-start mb-3 border-b border-slate-200 pb-2">
                  <div className="w-full pr-4">
                    {isEditing ? (
                      <input
                        className="w-full bg-slate-50 border border-slate-300 rounded px-1 font-bold text-primary text-base font-serif"
                        value={asset.processNumber}
                        onChange={(e) => updateAsset(asset.id, { processNumber: e.target.value })}
                      />
                    ) : (
                      <h4 className="font-bold text-primary text-base font-serif">
                        {asset.processNumber}
                      </h4>
                    )}
                    {isEditing ? (
                      <div className="flex gap-2 mt-1">
                        <input
                          className="w-1/2 bg-slate-50 border border-slate-300 rounded px-1 text-xs text-slate-600 font-bold uppercase"
                          value={asset.party}
                          onChange={(e) => updateAsset(asset.id, { party: e.target.value })}
                          placeholder="Parte"
                        />
                        <input
                          className="w-1/2 bg-slate-50 border border-slate-300 rounded px-1 text-xs text-slate-600 font-bold uppercase"
                          value={asset.court}
                          onChange={(e) => updateAsset(asset.id, { court: e.target.value })}
                          placeholder="Vara / Tribunal"
                        />
                      </div>
                    ) : (
                      <p className="text-xs text-slate-600 font-bold uppercase mt-1">
                        {asset.party} • {asset.court}
                      </p>
                    )}
                  </div>
                  <div className="text-right whitespace-nowrap">
                    {isEditing ? (
                      <select
                        value={asset.risk}
                        onChange={(e) => updateAsset(asset.id, { risk: e.target.value as any })}
                        className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs uppercase font-bold"
                      >
                        <option value="Provável">Provável</option>
                        <option value="Possível">Possível</option>
                        <option value="Remoto">Remoto</option>
                      </select>
                    ) : (
                      <span
                        className={cn(
                          'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
                          asset.risk === 'Provável'
                            ? 'text-red-700 bg-red-100'
                            : asset.risk === 'Possível'
                              ? 'text-amber-700 bg-amber-100'
                              : 'text-blue-700 bg-blue-100',
                        )}
                      >
                        Tese: {asset.risk}
                      </span>
                    )}
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
                      <div className="text-sm font-serif text-justify leading-relaxed whitespace-pre-wrap">
                        {asset.summary}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Valor Total
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

                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1 mt-3">
                      Prognóstico de Ganho
                    </p>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="number"
                          className="w-2/3 bg-slate-50 border border-slate-300 rounded px-2 py-1 text-sm font-sans"
                          value={asset.expectedGain || 0}
                          onChange={(e) =>
                            updateAsset(asset.id, { expectedGain: Number(e.target.value) })
                          }
                          title="Valor Esperado"
                        />
                        <input
                          type="number"
                          className="w-1/3 bg-slate-50 border border-slate-300 rounded px-2 py-1 text-sm font-sans"
                          value={asset.gainPercentage || 0}
                          onChange={(e) =>
                            updateAsset(asset.id, { gainPercentage: Number(e.target.value) })
                          }
                          title="Percentual"
                        />
                      </div>
                    ) : (
                      <p className="text-sm font-bold text-emerald-700">
                        {formatCurrency(asset.expectedGain || 0)}{' '}
                        <span className="text-xs font-normal text-slate-500">
                          ({asset.gainPercentage}%)
                        </span>
                      </p>
                    )}

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
                        className="text-sm font-serif text-slate-900 outline-none bg-slate-50 border border-slate-300 p-1 rounded inline-block w-full"
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
                      className="text-xs font-serif text-slate-800 text-justify whitespace-pre-wrap leading-relaxed outline-none bg-white border border-slate-300 p-2 rounded min-h-[40px]"
                    >
                      {asset.lastDevelopments}
                    </div>
                  ) : (
                    <p className="text-xs font-serif text-slate-800 text-justify whitespace-pre-wrap leading-relaxed">
                      {asset.lastDevelopments}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- NOVO PAINEL GERENCIAL (DASHBOARD) INTEGRADO --- */}
        <section className="mt-12 mb-12 print-page-break-before">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
              IV. Painel Gerencial Integrado (Dashboard)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {dashboardCards.map((c) => (
              <div
                key={c.key}
                className={cn(
                  'border rounded p-4 flex flex-col justify-center items-center text-center h-[120px]',
                  c.bgCls,
                )}
              >
                <p
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-wider mb-2',
                    c.key === 'incontroverso'
                      ? 'text-emerald-700'
                      : c.key === 'controverso'
                        ? 'text-amber-700'
                        : 'text-slate-500',
                  )}
                >
                  {c.title}
                </p>
                {isEditing ? (
                  <input
                    value={c.val}
                    onChange={(e) =>
                      setDashOverrides({ ...dashOverrides, [c.key]: e.target.value })
                    }
                    className={cn(
                      'font-bold text-center bg-white border border-slate-300 w-[90%] rounded p-1',
                      c.textCls,
                    )}
                  />
                ) : (
                  <p className={cn('font-bold', c.textCls)}>{c.val}</p>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print-break-inside-avoid">
            <div className="border border-slate-200 rounded p-4 bg-slate-50/50">
              <h4 className="text-xs font-bold uppercase text-slate-500 mb-4 text-center">
                Distribuição de Valores (Controverso vs Incontroverso)
              </h4>
              <ChartContainer config={chartConfig} className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="border border-slate-200 rounded p-4 bg-slate-50/50">
              <h4 className="text-xs font-bold uppercase text-slate-500 mb-4 text-center">
                Atualizações Recentes (Todos os Ativos)
              </h4>
              <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2 print:max-h-none print:overflow-visible">
                {assets.map((a) => (
                  <div key={a.id} className="border-l-2 border-primary pl-3 py-1">
                    <p className="text-xs font-bold text-primary">{a.processNumber}</p>
                    <p className="text-[10px] text-slate-500 mb-1">{a.party}</p>
                    {isEditing ? (
                      <textarea
                        value={a.lastDevelopments}
                        onChange={(e) => updateAsset(a.id, { lastDevelopments: e.target.value })}
                        className="w-full text-xs font-serif p-1 border border-slate-300 rounded bg-white mt-1"
                        rows={2}
                      />
                    ) : (
                      <p className="text-xs font-serif text-slate-700 leading-snug">
                        {a.lastDevelopments}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 pt-8 print-break-inside-avoid">
          <div className="grid grid-cols-3 gap-8 text-center text-xs font-serif">
            {signatures.map((sig, idx) => (
              <div key={idx}>
                <div className="w-full h-px bg-slate-400 mb-2"></div>
                {isEditing ? (
                  <div className="space-y-1">
                    <input
                      value={sig.name}
                      onChange={(e) =>
                        setSignatures((s) =>
                          s.map((x, i) => (i === idx ? { ...x, name: e.target.value } : x)),
                        )
                      }
                      placeholder="Nome do Assinante"
                      className="w-full text-center border bg-slate-50 font-bold outline-none p-1"
                    />
                    <input
                      value={sig.title}
                      onChange={(e) =>
                        setSignatures((s) =>
                          s.map((x, i) => (i === idx ? { ...x, title: e.target.value } : x)),
                        )
                      }
                      className="w-full text-center border bg-slate-50 font-bold uppercase outline-none p-1"
                    />
                    <input
                      value={sig.company}
                      onChange={(e) =>
                        setSignatures((s) =>
                          s.map((x, i) => (i === idx ? { ...x, company: e.target.value } : x)),
                        )
                      }
                      className="w-full text-center border bg-slate-50 text-slate-500 outline-none p-1"
                    />
                  </div>
                ) : (
                  <>
                    {sig.name && <p className="font-bold mb-1 text-sm">{sig.name}</p>}
                    <p className="font-bold uppercase">{sig.title}</p>
                    <p className="text-slate-500">{sig.company}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

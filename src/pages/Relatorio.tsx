import { useState } from 'react'
import { Printer, Plus, Loader2, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAssets } from '@/hooks/use-assets'
import { JudicialAsset } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { ProcessForm } from '@/components/ProcessForm'
import { RelatorioDashboard } from '@/components/relatorio/RelatorioDashboard'
import { formatCurrency, formatDate } from '@/lib/formatters'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'

export default function Relatorio() {
  const { assets, updateAsset, removeAsset, addAsset, loading } = useAssets()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newAssetData, setNewAssetData] = useState<Partial<JudicialAsset>>({})

  const [editingAssetId, setEditingAssetId] = useState<string | null>(null)
  const [editAssetData, setEditAssetData] = useState<Partial<JudicialAsset>>({})

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addAsset(newAssetData as Omit<JudicialAsset, 'id'>)
    setIsAddOpen(false)
    setNewAssetData({})
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingAssetId) {
      await updateAsset(editingAssetId, editAssetData)
      setEditingAssetId(null)
    }
  }

  const handleEditOpen = (asset: JudicialAsset) => {
    setEditAssetData(asset)
    setEditingAssetId(asset.id)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-32 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-slate-500 font-medium">Carregando relatório...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 animate-fade-in-up print:p-0 print:py-0 print:max-w-none print:w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 print-hide bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Relatório Gerencial</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" /> Imprimir / PDF
          </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" /> Novo Ativo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Ativo</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSubmit}>
                <ProcessForm formData={newAssetData} setFormData={setNewAssetData} />
                <DialogFooter className="mt-4">
                  <Button type="submit">Salvar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="paper-document">
        <table className="w-full">
          <thead className="hidden print:table-header-group">
            <tr>
              <td>
                <div className="flex justify-between items-end border-b-4 border-slate-800 pb-2 mb-6">
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-extrabold text-slate-900 uppercase font-serif tracking-tight m-0">
                      Cetenco
                    </h2>
                    <p className="text-[10px] text-slate-600 font-bold tracking-[0.2em] uppercase">
                      Engenharia S.A.
                    </p>
                  </div>
                  <div className="text-right flex flex-col justify-end">
                    <h2 className="text-lg font-bold text-slate-800 font-serif m-0">
                      Sayão e Polo
                    </h2>
                    <p className="text-[8px] text-slate-500 uppercase tracking-widest mt-1 font-semibold">
                      Sociedade de Advogados
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex justify-between items-end border-b-4 border-slate-800 pb-4 mb-8 print:hidden">
                  <div className="flex flex-col">
                    <h2 className="text-3xl font-extrabold text-slate-900 uppercase font-serif tracking-tight m-0">
                      Cetenco
                    </h2>
                    <p className="text-xs text-slate-600 font-bold tracking-[0.2em] uppercase">
                      Engenharia S.A.
                    </p>
                  </div>
                  <div className="text-right flex flex-col justify-end">
                    <h2 className="text-xl font-bold text-slate-800 font-serif m-0">
                      Sayão e Polo
                    </h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-semibold">
                      Sociedade de Advogados
                    </p>
                  </div>
                </div>

                {assets.length > 0 && (
                  <div className="mb-10">
                    <RelatorioDashboard assets={assets} />
                  </div>
                )}

                <div className="text-center mb-12">
                  <h1 className="text-2xl font-bold font-serif uppercase tracking-widest text-slate-900 mb-2 border-b-2 border-slate-200 inline-block pb-2 px-8">
                    Relatório Gerencial de Ativos Judiciais
                  </h1>
                  <p className="text-sm font-serif italic text-slate-600 mt-4 font-bold">
                    Data-Base: {formatDate(new Date().toISOString())}
                  </p>
                  <div className="mt-6 mb-8 text-left max-w-3xl mx-auto hidden print:block">
                    <p className="text-sm font-serif text-slate-800 leading-relaxed text-justify">
                      Trata-se dos principais ativos estratégicos da Cetenco, com a devida
                      qualificação de valores envolvidos, avaliação de riscos (prognóstico de
                      perda/êxito) e relato circunstanciado sobre os andamentos recentes de cada
                      demanda patrocinada por nosso escritório.
                    </p>
                  </div>
                </div>

                <section className="mb-12 print-break-inside-avoid">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 border-b border-slate-200 pb-1">
                    I. Quadro Resumo
                  </h3>
                  <div className="rounded-md border border-slate-200 overflow-hidden print:border-none print:overflow-visible">
                    <Table>
                      <TableHeader className="bg-slate-50 print:bg-transparent">
                        <TableRow>
                          <TableHead className="text-[11px] uppercase font-bold text-slate-700 w-1/4">
                            Identificação
                          </TableHead>
                          <TableHead className="text-[11px] uppercase font-bold text-slate-700 w-1/3">
                            Breve Resumo
                          </TableHead>
                          <TableHead className="text-[11px] uppercase font-bold text-slate-700">
                            Valores com Datas-Bases
                          </TableHead>
                          <TableHead className="text-[11px] uppercase font-bold text-slate-700 text-center">
                            Prognóstico
                          </TableHead>
                          <TableHead className="text-[11px] uppercase font-bold text-slate-700 text-right">
                            Estimativa de Tempo
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {assets.map((asset) => (
                          <TableRow
                            key={asset.id}
                            className="hover:bg-slate-50/50 print:border-b print:border-slate-200"
                          >
                            <TableCell className="align-top py-4">
                              <div className="font-bold text-slate-900 text-xs">
                                {asset.processNumber}
                              </div>
                              <div className="text-[10px] text-slate-600 font-medium mt-1">
                                {asset.party}
                              </div>
                              <div className="text-[9px] text-slate-400 mt-1 uppercase">
                                {asset.court}
                              </div>
                            </TableCell>
                            <TableCell className="align-top py-4">
                              <p className="text-[11px] text-slate-700 font-serif leading-snug line-clamp-3 print:line-clamp-none">
                                {asset.summary || '-'}
                              </p>
                            </TableCell>
                            <TableCell className="align-top py-4">
                              <div className="font-bold text-xs text-slate-800">
                                {formatCurrency(asset.value)}{' '}
                                <span className="text-[9px] font-normal text-slate-500">
                                  (Total)
                                </span>
                              </div>
                              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                                {formatCurrency(asset.incontroversoValue || 0)}{' '}
                                <span className="text-[9px] font-normal text-slate-500">
                                  (Incont.)
                                </span>
                              </div>
                              <div className="text-[11px] text-amber-700 font-semibold mt-1">
                                {formatCurrency(asset.controversoValue || 0)}{' '}
                                <span className="text-[9px] font-normal text-slate-500">
                                  (Cont.)
                                </span>
                              </div>
                              {asset.referenceDate && (
                                <div className="text-[9px] text-slate-500 uppercase mt-2 font-semibold">
                                  Ref: {formatDate(asset.referenceDate)}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="align-top py-4 text-center">
                              <span
                                className={cn(
                                  'px-2 py-1 rounded text-[10px] font-bold uppercase',
                                  asset.risk === 'Provável'
                                    ? 'text-red-700 bg-red-50 print:border print:border-red-200'
                                    : asset.risk === 'Possível'
                                      ? 'text-amber-700 bg-amber-50 print:border print:border-amber-200'
                                      : 'text-blue-700 bg-blue-50 print:border print:border-blue-200',
                                )}
                              >
                                {asset.risk}
                              </span>
                            </TableCell>
                            <TableCell className="align-top py-4 text-right font-medium text-[11px] text-slate-700">
                              {asset.estimatedRecoveryTime || '-'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </section>

                <section className="mb-12">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 border-b border-slate-200 pb-1 print-page-break-before">
                    II. Detalhamento Estratégico
                  </h3>
                  <div className="space-y-6">
                    {assets.map((asset) => (
                      <Card
                        key={asset.id}
                        className="relative shadow-sm print:shadow-none print:border print:border-slate-300 print-break-inside-avoid group"
                      >
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 print-hide">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white"
                            onClick={() => handleEditOpen(asset)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              if (confirm('Tem certeza que deseja excluir este ativo?')) {
                                removeAsset(asset.id)
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardContent className="pt-6">
                          <div className="border-b border-slate-200 pb-3 mb-4 pr-20">
                            <h4 className="font-bold text-slate-900 text-lg font-serif">
                              {asset.processNumber}
                            </h4>
                            {asset.party && (
                              <p className="text-sm text-slate-600 font-serif mt-1">
                                {asset.party}
                              </p>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                                Resumo do Ocorrido
                              </p>
                              <p className="text-sm font-serif text-justify whitespace-pre-wrap text-slate-800 leading-relaxed">
                                {asset.summary || '-'}
                              </p>
                              <div className="mt-4 grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-md border border-slate-100 print:border-slate-200">
                                <div>
                                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                                    Valor da Causa
                                  </p>
                                  <p className="text-xs text-slate-900 font-bold">
                                    {formatCurrency(asset.value || 0)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                                    Incontroverso
                                  </p>
                                  <p className="text-xs text-emerald-700 font-bold">
                                    {formatCurrency(asset.incontroversoValue || 0)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                                    Controverso
                                  </p>
                                  <p className="text-xs text-amber-700 font-bold">
                                    {formatCurrency(asset.controversoValue || 0)}
                                  </p>
                                </div>
                              </div>
                              {asset.valueDetails && (
                                <div className="mt-4">
                                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                                    Composição de Valores
                                  </p>
                                  <p className="text-sm font-serif text-justify whitespace-pre-wrap text-slate-800">
                                    {asset.valueDetails}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                                Últimos Andamentos e Andamento
                              </p>
                              <p className="text-sm font-serif text-justify whitespace-pre-wrap text-slate-800 leading-relaxed">
                                {asset.lastDevelopments || '-'}
                              </p>
                              <div className="grid grid-cols-2 gap-4 mt-4 bg-slate-50 p-3 rounded-md border border-slate-100 print:border-slate-200">
                                <div>
                                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                                    Juízo
                                  </p>
                                  <p className="text-xs text-slate-800 font-semibold">
                                    {asset.court || '-'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                                    Patrono
                                  </p>
                                  <p className="text-xs text-slate-800 font-semibold">
                                    {asset.lawyer || '-'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                                    Status
                                  </p>
                                  <p className="text-xs text-slate-800 font-semibold">
                                    {asset.status || '-'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                                    Data de Referência
                                  </p>
                                  <p className="text-xs text-slate-800 font-semibold">
                                    {asset.referenceDate ? formatDate(asset.referenceDate) : '-'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                                    Expectativa de Recuperação
                                  </p>
                                  <p className="text-xs text-slate-800 font-semibold">
                                    {asset.estimatedRecoveryTime || '-'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                                    Prognóstico
                                  </p>
                                  <p className="text-xs text-slate-800 font-semibold">
                                    {asset.risk || '-'}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {asset.history && asset.history.length > 0 && (
                              <div className="mt-6 md:col-span-2 pt-4 border-t border-slate-100 print:border-slate-200">
                                <p className="text-[10px] font-bold text-slate-500 uppercase mb-3">
                                  Histórico Processual
                                </p>
                                <div className="space-y-3">
                                  {asset.history.map((h, i) => (
                                    <div key={i} className="flex gap-4">
                                      <div className="w-24 shrink-0 text-xs font-semibold text-slate-600 border-r border-slate-200 pr-2 text-right py-0.5">
                                        {formatDate(h.date)}
                                      </div>
                                      <div className="flex-1 pb-2">
                                        <p className="text-sm font-serif text-slate-800 text-justify leading-relaxed">
                                          {h.description}
                                        </p>
                                        <p className="text-[9px] text-slate-400 mt-1 italic uppercase tracking-wider">
                                          Por: {h.author}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                <div className="mt-32 pt-8 print-break-inside-avoid">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
                    <div>
                      <div className="border-t-2 border-slate-800 mx-auto w-48 mb-3"></div>
                      <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                        Diretor Jurídico
                      </p>
                    </div>
                    <div>
                      <div className="border-t-2 border-slate-800 mx-auto w-48 mb-3"></div>
                      <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                        Diretor Financeiro
                      </p>
                    </div>
                    <div>
                      <div className="border-t-2 border-slate-800 mx-auto w-48 mb-3"></div>
                      <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                        CEO
                      </p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Dialog open={!!editingAssetId} onOpenChange={(open) => !open && setEditingAssetId(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Ativo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <ProcessForm formData={editAssetData} setFormData={setEditAssetData} />
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setEditingAssetId(null)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Alterações</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

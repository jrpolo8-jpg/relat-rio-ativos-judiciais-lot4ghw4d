import { useState } from 'react'
import { Printer, Save, Plus, Loader2, Edit3, Check, Trash2 } from 'lucide-react'
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
import { AssetForm } from '@/components/relatorio/AssetForm'
import { RelatorioDashboard } from '@/components/relatorio/RelatorioDashboard'
import { formatCurrency, formatDate } from '@/lib/formatters'

export default function Relatorio() {
  const { assets, updateAsset, removeAsset, addAsset, loading, saving, saveChanges, hasChanges } =
    useAssets()
  const [isEditing, setIsEditing] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newAssetData, setNewAssetData] = useState<Partial<JudicialAsset>>({})

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addAsset(newAssetData as Omit<JudicialAsset, 'id'>)
    setIsAddOpen(false)
    setNewAssetData({})
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
          {saving && (
            <div className="flex items-center text-sm text-slate-500 animate-pulse px-2">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Salvando...
            </div>
          )}
          {(isEditing || hasChanges) && (
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => saveChanges()}
              disabled={!hasChanges || saving}
            >
              <Save className="mr-2 h-4 w-4" /> Salvar
            </Button>
          )}
          <Button
            variant={isEditing ? 'default' : 'outline'}
            className={cn(isEditing ? 'bg-emerald-600 hover:bg-emerald-700' : '')}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Concluir Edição
              </>
            ) : (
              <>
                <Edit3 className="mr-2 h-4 w-4" /> Editar Relatório
              </>
            )}
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
                <AssetForm formData={newAssetData} setFormData={setNewAssetData} />
                <DialogFooter className="mt-4">
                  <Button type="submit">Salvar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="paper-document">
        <div className="flex justify-between items-end border-b-2 border-primary pb-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-primary uppercase font-serif m-0">Cetenco</h2>
            <p className="text-[10px] text-primary/70 tracking-widest uppercase">Engenharia S.A.</p>
          </div>
          <div className="text-right pb-1">
            <h2 className="text-lg font-bold text-slate-700 font-serif m-0">Sayão e Polo</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
              Sociedade de Advogados
            </p>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold font-serif uppercase tracking-wider text-slate-900 mb-2">
            Relatório Gerencial de Ativos Judiciais
          </h1>
          <p className="text-sm font-serif italic text-slate-600">
            São Paulo, {formatDate(new Date().toISOString())}
          </p>
        </div>

        <section className="mb-12 print-break-inside-avoid">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 border-b border-slate-200 pb-1">
            I. Quadro Resumo
          </h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-300 text-[10px] uppercase text-slate-500">
                <th className="py-2 pr-2">Processo / Parte</th>
                <th className="py-2 px-2">Valores</th>
                <th className="py-2 px-2 text-center">Prognóstico</th>
                <th className="py-2 pl-2 text-right">Estimativa</th>
              </tr>
            </thead>
            <tbody className="text-xs font-serif">
              {assets.map((asset) => (
                <tr
                  key={asset.id}
                  className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3 pr-2 align-top">
                    {isEditing ? (
                      <input
                        className="w-full bg-slate-50 border rounded px-1 mb-1 text-primary"
                        value={asset.processNumber}
                        onChange={(e) => updateAsset(asset.id, { processNumber: e.target.value })}
                      />
                    ) : (
                      <div className="font-bold text-primary">{asset.processNumber}</div>
                    )}
                    <div className="text-[10px] text-slate-500 uppercase mt-1">{asset.party}</div>
                  </td>
                  <td className="py-3 px-2 align-top">
                    <div className="font-bold text-xs">
                      {formatCurrency(asset.value)}{' '}
                      <span className="text-[9px] text-slate-500 uppercase">(Total)</span>
                    </div>
                    <div className="text-xs text-emerald-700 font-semibold">
                      {formatCurrency(asset.incontroversoValue || 0)}{' '}
                      <span className="text-[9px] text-slate-500 uppercase">(Incont.)</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 align-top text-center">
                    <span
                      className={cn(
                        'px-2 py-1 rounded text-[10px] font-bold uppercase',
                        asset.risk === 'Provável'
                          ? 'text-red-700 bg-red-50'
                          : asset.risk === 'Possível'
                            ? 'text-amber-700 bg-amber-50'
                            : 'text-blue-700 bg-blue-50',
                      )}
                    >
                      {asset.risk}
                    </span>
                  </td>
                  <td className="py-3 pl-2 align-top text-right font-medium text-slate-700">
                    {asset.estimatedRecoveryTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4 border-b border-slate-200 pb-1 print-page-break-before">
            II. Detalhamento
          </h3>
          <div className="space-y-8">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="border border-slate-300 rounded-sm p-4 relative shadow-sm print-break-inside-avoid"
              >
                {isEditing && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-3 -right-3 h-8 w-8 rounded-full z-10 print-hide"
                    onClick={() => removeAsset(asset.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                <h4 className="font-bold text-primary text-base font-serif border-b pb-2 mb-3">
                  {asset.processNumber}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Resumo da Demanda
                    </p>
                    {isEditing ? (
                      <textarea
                        className="w-full text-sm font-serif p-2 border rounded"
                        value={asset.summary}
                        onChange={(e) => updateAsset(asset.id, { summary: e.target.value })}
                        rows={4}
                      />
                    ) : (
                      <p className="text-sm font-serif text-justify whitespace-pre-wrap">
                        {asset.summary}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Últimos Andamentos
                    </p>
                    {isEditing ? (
                      <textarea
                        className="w-full text-sm font-serif p-2 border rounded"
                        value={asset.lastDevelopments}
                        onChange={(e) =>
                          updateAsset(asset.id, { lastDevelopments: e.target.value })
                        }
                        rows={4}
                      />
                    ) : (
                      <p className="text-sm font-serif text-justify whitespace-pre-wrap">
                        {asset.lastDevelopments}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {assets.length > 0 && <RelatorioDashboard assets={assets} />}
      </div>
    </div>
  )
}

import { useState, useEffect, Fragment } from 'react'
import {
  Printer,
  Plus,
  Loader2,
  Pencil,
  Trash2,
  CheckSquare,
  Edit3,
  Save,
  X,
  FileDown,
  FileText,
  Settings,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAssets } from '@/hooks/use-assets'
import { useReportSettings } from '@/hooks/use-report-settings'
import { JudicialAsset, ReportSettings } from '@/lib/types'
import { cn } from '@/lib/utils'
import { exportToWord } from '@/lib/export-word'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ShieldAlert } from 'lucide-react'
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
  const { toast } = useToast()
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newAssetData, setNewAssetData] = useState<Partial<JudicialAsset>>({})

  const [editingAssetId, setEditingAssetId] = useState<string | null>(null)
  const [editAssetData, setEditAssetData] = useState<Partial<JudicialAsset>>({})

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [knownAssetIds, setKnownAssetIds] = useState<Set<string>>(new Set())
  const [initialized, setInitialized] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [drafts, setDrafts] = useState<Record<string, Partial<JudicialAsset>>>({})
  const [savingEdits, setSavingEdits] = useState(false)

  const [summaryOverrides, setSummaryOverrides] = useState<Record<string, string>>({})
  const [editingSummaryId, setEditingSummaryId] = useState<string | null>(null)
  const [editingSummaryText, setEditingSummaryText] = useState('')

  const { settings, loading: loadingSettings, updateSettings } = useReportSettings()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [editSettings, setEditSettings] = useState<Partial<ReportSettings>>({})

  const handleSettingsOpen = () => {
    if (settings) {
      setEditSettings(settings)
      setIsSettingsOpen(true)
    }
  }

  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateSettings(editSettings)
      setIsSettingsOpen(false)
      toast({ title: 'Sucesso', description: 'Configurações salvas.' })
    } catch (err) {
      toast({ title: 'Erro', description: 'Erro ao salvar configurações.', variant: 'destructive' })
    }
  }

  useEffect(() => {
    if (loading) return

    let changed = false
    const nextSelected = new Set(selectedIds)
    const currentIds = new Set(assets.map((a) => a.id))

    assets.forEach((a) => {
      if (!knownAssetIds.has(a.id)) {
        changed = true
        nextSelected.add(a.id)
      }
    })

    knownAssetIds.forEach((id) => {
      if (!currentIds.has(id)) {
        changed = true
        nextSelected.delete(id)
      }
    })

    if (changed || !initialized) {
      setKnownAssetIds(currentIds)
      setSelectedIds(nextSelected)
      setInitialized(true)
    }
  }, [assets, loading, initialized, knownAssetIds, selectedIds])

  const selectedAssets = assets.filter((a) => selectedIds.has(a.id))

  const handleSelectAll = () => setSelectedIds(new Set(assets.map((a) => a.id)))
  const handleDeselectAll = () => setSelectedIds(new Set())
  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const handleToggleEdit = () => {
    if (!isEditMode) {
      const initialDrafts: Record<string, Partial<JudicialAsset>> = {}
      selectedAssets.forEach((a) => (initialDrafts[a.id] = { ...a }))
      setDrafts(initialDrafts)
    }
    setIsEditMode(!isEditMode)
  }

  const handleDraftChange = (id: string, field: keyof JudicialAsset, value: any) => {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }))
  }

  const handleSaveEdits = async () => {
    setSavingEdits(true)
    try {
      const promises = Object.entries(drafts).map(([id, draft]) => updateAsset(id, draft))
      await Promise.all(promises)
      setIsEditMode(false)
      toast({ title: 'Sucesso', description: 'Alterações salvas com sucesso.' })
    } catch (e) {
      // Error toast is handled by updateAsset
    } finally {
      setSavingEdits(false)
    }
  }

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

  const handleOpenSummaryEdit = (asset: JudicialAsset) => {
    setEditingSummaryId(asset.id)
    setEditingSummaryText(summaryOverrides[asset.id] ?? asset.summary ?? '')
  }

  const totalValue = selectedAssets.reduce((acc, a) => acc + (a.value || 0), 0)
  const formattedTotal = formatCurrency(totalValue)
  const preambleHtml = settings?.preamble_text
    ? settings.preamble_text.replace(/{valor_total}/g, formattedTotal)
    : 'Trata-se dos principais ativos estratégicos da Cetenco, com a devida qualificação de valores envolvidos, avaliação de riscos (prognóstico de ganho) e relato circunstanciado sobre os andamentos recentes de cada demanda patrocinada por nosso escritório.'

  if (loading || loadingSettings) {
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-slate-50">
                <CheckSquare className="mr-2 h-4 w-4" /> Selecionar Ativos ({selectedIds.size})
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl max-h-[80vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Selecionar Ativos para o Relatório</DialogTitle>
              </DialogHeader>
              <div className="flex gap-2 my-2">
                <Button variant="secondary" size="sm" onClick={handleSelectAll}>
                  Selecionar Todos
                </Button>
                <Button variant="secondary" size="sm" onClick={handleDeselectAll}>
                  Desmarcar Todos
                </Button>
              </div>
              <ScrollArea className="flex-1 h-[50vh] overflow-y-auto -mx-6 px-6 pb-4">
                <div className="space-y-4">
                  {assets.map((a) => (
                    <div key={a.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={`select-${a.id}`}
                        checked={selectedIds.has(a.id)}
                        onCheckedChange={() => toggleSelection(a.id)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={`select-${a.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {a.processNumber}
                        </label>
                        <p className="text-xs text-muted-foreground">{a.party}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {isEditMode ? (
            <>
              <Button variant="outline" onClick={handleToggleEdit} disabled={savingEdits}>
                <X className="mr-2 h-4 w-4" /> Cancelar
              </Button>
              <Button
                onClick={handleSaveEdits}
                disabled={savingEdits}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {savingEdits ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Salvar Alterações
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={handleToggleEdit}>
              <Edit3 className="mr-2 h-4 w-4" /> Alterações
            </Button>
          )}

          <Button variant="outline" onClick={handleSettingsOpen}>
            <Settings className="mr-2 h-4 w-4" /> Configurações
          </Button>

          <Button
            variant="outline"
            onClick={async () => {
              try {
                const assetsForExport = selectedAssets.map((a) => ({
                  ...a,
                  summary: summaryOverrides[a.id] ?? a.summary,
                }))
                await exportToWord(assetsForExport, settings)
                toast({ title: 'Sucesso', description: 'Relatório Word gerado com sucesso.' })
              } catch (err) {
                toast({
                  title: 'Erro',
                  description: 'Ocorreu um erro ao gerar o Word.',
                  variant: 'destructive',
                })
              }
            }}
            disabled={isEditMode || selectedAssets.length === 0}
          >
            <FileDown className="mr-2 h-4 w-4" /> Exportar Word
          </Button>

          <Button
            variant="outline"
            onClick={() => window.print()}
            disabled={isEditMode || selectedAssets.length === 0}
          >
            <FileText className="mr-2 h-4 w-4" /> Exportar PDF
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

                <div className="text-center mb-12">
                  <h1 className="text-2xl font-bold font-serif uppercase tracking-widest text-slate-900 mb-2 border-b-2 border-slate-200 inline-block pb-2 px-8">
                    Relatório Gerencial de Ativos Judiciais
                  </h1>
                  <p className="text-sm font-serif italic text-slate-600 mt-4 font-bold">
                    Data-Base: {formatDate(new Date().toISOString())}
                  </p>
                  <div className="mt-6 mb-8 text-left max-w-3xl mx-auto block">
                    <p className="text-sm font-serif text-slate-800 leading-relaxed text-justify whitespace-pre-wrap">
                      {preambleHtml}
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
                          <TableHead className="text-[11px] uppercase font-bold text-slate-700">
                            Valores com Datas-Bases
                          </TableHead>
                          <TableHead className="text-[11px] uppercase font-bold text-slate-700 text-center">
                            Prognóstico de Ganho
                          </TableHead>
                          <TableHead className="text-[11px] uppercase font-bold text-slate-700 text-right">
                            Estimativa de Tempo
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedAssets.map((asset) => (
                          <Fragment key={asset.id}>
                            <TableRow className="hover:bg-slate-50/50 print:border-t print:border-slate-200 border-b-0">
                              <TableCell className="align-top pt-4 pb-2">
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
                              <TableCell className="align-top pt-4 pb-2">
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
                              <TableCell className="align-top pt-4 pb-2 text-center">
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
                              <TableCell className="align-top pt-4 pb-2 text-right font-medium text-[11px] text-slate-700">
                                {asset.estimatedRecoveryTime || '-'}
                              </TableCell>
                            </TableRow>
                            <TableRow className="border-b print:border-slate-200 bg-slate-50/30 print:bg-transparent">
                              <TableCell colSpan={4} className="align-top pb-6 pt-2">
                                <div className="print:hidden">
                                  <Label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">
                                    Breve Histórico
                                  </Label>
                                  <Textarea
                                    className="text-[11px] font-serif min-h-[80px] w-full resize-y bg-white"
                                    value={summaryOverrides[asset.id] ?? asset.summary ?? ''}
                                    onChange={(e) =>
                                      setSummaryOverrides({
                                        ...summaryOverrides,
                                        [asset.id]: e.target.value,
                                      })
                                    }
                                    placeholder="Breve Histórico..."
                                  />
                                </div>
                                <div className="hidden print:block bg-slate-50/50 p-3 rounded border border-slate-200">
                                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                                    Breve Histórico
                                  </p>
                                  <p className="text-[11px] text-slate-800 font-serif leading-snug whitespace-pre-wrap text-justify">
                                    {summaryOverrides[asset.id] ?? asset.summary ?? '-'}
                                  </p>
                                </div>
                              </TableCell>
                            </TableRow>
                          </Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </section>

                <section className="mb-12">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 border-b border-slate-200 pb-1 print-page-break-before">
                    II. Detalhamento Estratégico
                  </h3>
                  <div className="space-y-12">
                    {selectedAssets.map((asset) => {
                      const draft = drafts[asset.id] || asset
                      return (
                        <div key={asset.id} className="relative print-break-inside-avoid group">
                          {!isEditMode && (
                            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 print-hide">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-white"
                                onClick={() => handleEditOpen(asset)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="icon" className="h-8 w-8">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="flex items-center gap-2">
                                      <ShieldAlert className="h-5 w-5 text-destructive" />
                                      Excluir Ativo
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Deseja realmente excluir este ativo? Esta ação não poderá ser
                                      desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => removeAsset(asset.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Sim, Excluir
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          )}

                          {isEditMode ? (
                            <Card className="shadow-sm mt-8">
                              <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Número do Processo</Label>
                                    <Input
                                      value={draft.processNumber || ''}
                                      onChange={(e) =>
                                        handleDraftChange(asset.id, 'processNumber', e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Parte</Label>
                                    <Input
                                      value={draft.party || ''}
                                      onChange={(e) =>
                                        handleDraftChange(asset.id, 'party', e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Juízo</Label>
                                    <Input
                                      value={draft.court || ''}
                                      onChange={(e) =>
                                        handleDraftChange(asset.id, 'court', e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Data de Referência</Label>
                                    <Input
                                      type="date"
                                      value={
                                        draft.referenceDate
                                          ? draft.referenceDate.substring(0, 10)
                                          : ''
                                      }
                                      onChange={(e) => {
                                        const val = e.target.value
                                        handleDraftChange(
                                          asset.id,
                                          'referenceDate',
                                          val ? new Date(val).toISOString() : '',
                                        )
                                      }}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select
                                      value={draft.status || 'Ativo'}
                                      onValueChange={(v) =>
                                        handleDraftChange(asset.id, 'status', v as any)
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Ativo">Ativo</SelectItem>
                                        <SelectItem value="Encerrado">Encerrado</SelectItem>
                                        <SelectItem value="Suspenso">Suspenso</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Prognóstico de Ganho</Label>
                                    <Select
                                      value={draft.risk || 'Possível'}
                                      onValueChange={(v) =>
                                        handleDraftChange(asset.id, 'risk', v as any)
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Provável">Provável</SelectItem>
                                        <SelectItem value="Possível">Possível</SelectItem>
                                        <SelectItem value="Remoto">Remoto</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Expectativa de Recuperação</Label>
                                    <Input
                                      value={draft.estimatedRecoveryTime || ''}
                                      onChange={(e) =>
                                        handleDraftChange(
                                          asset.id,
                                          'estimatedRecoveryTime',
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Valor da Causa</Label>
                                    <Input
                                      type="number"
                                      value={draft.value || 0}
                                      onChange={(e) =>
                                        handleDraftChange(asset.id, 'value', Number(e.target.value))
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Valor Incontroverso</Label>
                                    <Input
                                      type="number"
                                      value={draft.incontroversoValue || 0}
                                      onChange={(e) =>
                                        handleDraftChange(
                                          asset.id,
                                          'incontroversoValue',
                                          Number(e.target.value),
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Valor Controverso</Label>
                                    <Input
                                      type="number"
                                      value={draft.controversoValue || 0}
                                      onChange={(e) =>
                                        handleDraftChange(
                                          asset.id,
                                          'controversoValue',
                                          Number(e.target.value),
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Patrono</Label>
                                    <Input
                                      value={draft.lawyer || ''}
                                      onChange={(e) =>
                                        handleDraftChange(asset.id, 'lawyer', e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="col-span-1 md:col-span-2 space-y-2">
                                    <Label>Breve Histórico</Label>
                                    <Textarea
                                      rows={3}
                                      value={draft.summary || ''}
                                      onChange={(e) =>
                                        handleDraftChange(asset.id, 'summary', e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="col-span-1 md:col-span-2 space-y-2">
                                    <Label>Último andamento</Label>
                                    <Textarea
                                      rows={3}
                                      value={draft.lastDevelopments || ''}
                                      onChange={(e) =>
                                        handleDraftChange(
                                          asset.id,
                                          'lastDevelopments',
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ) : (
                            <div>
                              <div className="border-b-2 border-slate-300 pb-2 mb-4 pr-20">
                                <h4 className="font-bold text-slate-900 text-lg font-serif">
                                  {asset.processNumber}
                                </h4>
                                {asset.party && (
                                  <p className="text-sm text-slate-600 font-serif mt-1">
                                    {asset.party}
                                  </p>
                                )}
                              </div>

                              <Card className="shadow-sm print:shadow-none print:border print:border-slate-300 mb-6 bg-slate-50/50 w-full relative group/summary">
                                <CardContent className="p-4 sm:p-6">
                                  <div className="flex justify-between items-start mb-3">
                                    <p className="text-[9px] font-bold text-slate-500 uppercase flex items-center gap-2">
                                      Breve Histórico
                                      {summaryOverrides[asset.id] !== undefined && (
                                        <span className="text-[8px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded print:hidden font-medium">
                                          Editado para exportação
                                        </span>
                                      )}
                                    </p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 px-2 text-xs print-hide opacity-0 group-hover/summary:opacity-100 transition-opacity"
                                      onClick={() => handleOpenSummaryEdit(asset)}
                                    >
                                      <Pencil className="h-3 w-3 mr-1" /> Editar para Relatório
                                    </Button>
                                  </div>
                                  <p className="text-sm sm:text-base font-serif text-justify whitespace-pre-wrap text-slate-800 leading-relaxed w-full">
                                    {summaryOverrides[asset.id] ?? asset.summary ?? '-'}
                                  </p>
                                </CardContent>
                              </Card>

                              <Card className="shadow-sm print:shadow-none print:border print:border-slate-300 mb-6 bg-slate-50/50">
                                <CardContent className="p-4 sm:p-6">
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                                    <div>
                                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                                        Valor estimado do pedido
                                      </p>
                                      <p className="text-xs text-slate-800 font-bold">
                                        {formatCurrency(asset.value || 0)}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                                        Valor Incontroverso
                                      </p>
                                      <p className="text-xs text-emerald-700 font-bold">
                                        {formatCurrency(asset.incontroversoValue || 0)}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                                        Valor Controverso
                                      </p>
                                      <p className="text-xs text-amber-700 font-bold">
                                        {formatCurrency(asset.controversoValue || 0)}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                                        Data de Referência dos Valores
                                      </p>
                                      <p className="text-xs text-slate-800 font-semibold">
                                        {asset.referenceDate
                                          ? formatDate(asset.referenceDate)
                                          : '-'}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                                        Prognóstico de Ganho
                                      </p>
                                      <p className="text-xs text-slate-800 font-semibold">
                                        {asset.risk || '-'}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                                        Expectativa de Monetização do Ativo
                                      </p>
                                      <p className="text-xs text-slate-800 font-semibold">
                                        {asset.estimatedRecoveryTime || '-'}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">
                                        Patrono Responsável
                                      </p>
                                      <p className="text-xs text-slate-800 font-semibold">
                                        {asset.lawyer || '-'}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {asset.history && asset.history.length > 0 && (
                                <div className="pt-4 mb-6 w-full">
                                  <p className="text-xs font-bold text-slate-500 uppercase mb-3">
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
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="pt-4 border-t border-slate-200 print:border-slate-300 w-full">
                                <p className="text-xs font-bold text-slate-500 uppercase mb-2">
                                  Último andamento
                                </p>
                                <p className="text-base font-serif text-justify whitespace-pre-wrap text-slate-800 leading-relaxed w-full">
                                  {asset.lastDevelopments || '-'}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>

                {selectedAssets.length > 0 && (
                  <div className="mt-12 print-page-break-before">
                    <RelatorioDashboard assets={selectedAssets} />
                  </div>
                )}

                <div className="mt-32 pt-8 print-break-inside-avoid">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
                    {settings?.signature1_title ? (
                      <div>
                        <div className="border-t-2 border-slate-800 mx-auto w-48 mb-3"></div>
                        {settings.signature1_name && (
                          <p className="font-bold text-slate-900 text-sm mb-1">
                            {settings.signature1_name}
                          </p>
                        )}
                        <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                          {settings.signature1_title}
                        </p>
                      </div>
                    ) : (
                      <div />
                    )}
                    {settings?.signature2_title ? (
                      <div>
                        <div className="border-t-2 border-slate-800 mx-auto w-48 mb-3"></div>
                        {settings.signature2_name && (
                          <p className="font-bold text-slate-900 text-sm mb-1">
                            {settings.signature2_name}
                          </p>
                        )}
                        <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                          {settings.signature2_title}
                        </p>
                      </div>
                    ) : (
                      <div />
                    )}
                    {settings?.signature3_title ? (
                      <div>
                        <div className="border-t-2 border-slate-800 mx-auto w-48 mb-3"></div>
                        {settings.signature3_name && (
                          <p className="font-bold text-slate-900 text-sm mb-1">
                            {settings.signature3_name}
                          </p>
                        )}
                        <p className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                          {settings.signature3_title}
                        </p>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configurações do Relatório</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSettingsSave} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Preâmbulo (Use {'{valor_total}'} para inserir o valor total dos ativos)</Label>
              <Textarea
                rows={6}
                value={editSettings.preamble_text || ''}
                onChange={(e) =>
                  setEditSettings({ ...editSettings, preamble_text: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200 pt-4">
              <div className="space-y-2">
                <Label>Assinatura 1 - Nome</Label>
                <Input
                  value={editSettings.signature1_name || ''}
                  onChange={(e) =>
                    setEditSettings({ ...editSettings, signature1_name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Assinatura 1 - Título</Label>
                <Input
                  value={editSettings.signature1_title || ''}
                  onChange={(e) =>
                    setEditSettings({ ...editSettings, signature1_title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Assinatura 2 - Nome</Label>
                <Input
                  value={editSettings.signature2_name || ''}
                  onChange={(e) =>
                    setEditSettings({ ...editSettings, signature2_name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Assinatura 2 - Título</Label>
                <Input
                  value={editSettings.signature2_title || ''}
                  onChange={(e) =>
                    setEditSettings({ ...editSettings, signature2_title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Assinatura 3 - Nome</Label>
                <Input
                  value={editSettings.signature3_name || ''}
                  onChange={(e) =>
                    setEditSettings({ ...editSettings, signature3_name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Assinatura 3 - Título</Label>
                <Input
                  value={editSettings.signature3_title || ''}
                  onChange={(e) =>
                    setEditSettings({ ...editSettings, signature3_title: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setIsSettingsOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Configurações</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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

      <Dialog open={!!editingSummaryId} onOpenChange={(open) => !open && setEditingSummaryId(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Resumo para Exportação</DialogTitle>
            <DialogDescription>
              O texto abaixo será usado apenas na exportação atual e não alterará o registro
              original no banco de dados.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              rows={10}
              value={editingSummaryText}
              onChange={(e) => setEditingSummaryText(e.target.value)}
              placeholder="Digite o resumo simplificado..."
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const next = { ...summaryOverrides }
                delete next[editingSummaryId!]
                setSummaryOverrides(next)
                setEditingSummaryId(null)
              }}
            >
              Restaurar Original
            </Button>
            <Button
              type="button"
              onClick={() => {
                setSummaryOverrides({
                  ...summaryOverrides,
                  [editingSummaryId!]: editingSummaryText,
                })
                setEditingSummaryId(null)
              }}
            >
              Aplicar ao Relatório
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

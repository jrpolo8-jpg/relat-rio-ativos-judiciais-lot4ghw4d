import { useState } from 'react'
import { Search, Filter, Eye, FileText, Pencil, Plus, Trash2, ShieldAlert } from 'lucide-react'
import { useAssets } from '@/hooks/use-assets'
import { formatCurrency, formatDate } from '@/lib/formatters'
import { JudicialAsset, RiskLevel } from '@/lib/types'
import { cn } from '@/lib/utils'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
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
import { ProcessForm } from '@/components/ProcessForm'

function RiskBadge({ risk }: { risk: RiskLevel }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium border-transparent text-white',
        risk === 'Provável' && 'bg-risk-provavel hover:bg-risk-provavel/80',
        risk === 'Possível' && 'bg-risk-possivel hover:bg-risk-possivel/80',
        risk === 'Remoto' && 'bg-risk-remoto hover:bg-risk-remoto/80',
      )}
    >
      {risk}
    </Badge>
  )
}

function AddProcessModal() {
  const { addAsset } = useAssets()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<JudicialAsset>>({
    processNumber: '',
    party: '',
    court: '',
    lawyer: 'Sayão & Polo',
    value: 0,
    valueDetails: '',
    referenceDate: new Date().toISOString().substring(0, 10),
    risk: 'Possível',
    status: 'Ativo',
    summary: '',
    estimatedRecoveryTime: '',
    lastDevelopments: '',
    lastUpdate: new Date().toISOString().substring(0, 10),
    history: [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addAsset(formData as Omit<JudicialAsset, 'id'>)
    setOpen(false)
    setFormData({
      processNumber: '',
      party: '',
      court: '',
      lawyer: 'Sayão & Polo',
      value: 0,
      valueDetails: '',
      referenceDate: new Date().toISOString().substring(0, 10),
      risk: 'Possível',
      status: 'Ativo',
      summary: '',
      estimatedRecoveryTime: '',
      lastDevelopments: '',
      lastUpdate: new Date().toISOString().substring(0, 10),
      history: [],
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Adicionar Processo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Processo</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo ativo judicial para incluí-lo no painel e nos relatórios.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ProcessForm formData={formData} setFormData={setFormData} />
          <DialogFooter className="mt-4">
            <Button type="submit">Cadastrar Processo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditProcessModal({ asset }: { asset: JudicialAsset }) {
  const { updateAsset } = useAssets()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<Partial<JudicialAsset>>(asset)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateAsset(asset.id, formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Pencil className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Processo: {asset.processNumber}</DialogTitle>
          <DialogDescription>
            Atualize os dados e andamentos do processo. As mudanças refletirão no relatório
            gerencial.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ProcessForm formData={formData} setFormData={setFormData} />
          <DialogFooter className="mt-4">
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ProcessDetailModal({ asset }: { asset: JudicialAsset }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {asset.processNumber}
          </DialogTitle>
          <DialogDescription>
            {asset.party} • {asset.court}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-muted/30 border-none shadow-none md:col-span-2">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                  Valor
                </p>
                <p className="text-lg font-bold text-foreground">{formatCurrency(asset.value)}</p>
                {asset.valueDetails && (
                  <p className="text-xs font-medium mt-1">{asset.valueDetails}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Data Base: {formatDate(asset.referenceDate)}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30 border-none shadow-none">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                  Risco
                </p>
                <div className="mt-1">
                  <RiskBadge risk={asset.risk} />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/30 border-none shadow-none">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                  Recebimento
                </p>
                <p className="text-sm font-medium">{asset.estimatedRecoveryTime}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
              Resumo da Demanda
            </h4>
            <div className="p-4 rounded-md bg-secondary/50 border text-sm leading-relaxed text-foreground/90 font-serif whitespace-pre-wrap">
              {asset.summary}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
              Últimos Andamentos
            </h4>
            <div className="p-4 rounded-md border text-sm leading-relaxed text-foreground/90 font-serif whitespace-pre-wrap">
              {asset.lastDevelopments}
            </div>
          </div>

          {asset.history && asset.history.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
                Histórico Processual
              </h4>
              <div className="space-y-3 border-l-2 border-border ml-2 pl-4 py-2">
                {asset.history.map((h) => (
                  <div key={h.id} className="relative">
                    <div className="absolute -left-[23px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background" />
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">
                      {formatDate(h.date)} • {h.author}
                    </p>
                    <p className="text-sm whitespace-pre-wrap">{h.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DeleteProcessAction({ asset }: { asset: JudicialAsset }) {
  const { removeAsset } = useAssets()
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-destructive" />
            Remover Processo
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja remover o processo <strong>{asset.processNumber}</strong> do
            painel? Esta ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => removeAsset(asset.id)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Sim, Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default function Processos() {
  const { assets } = useAssets()
  const [searchTerm, setSearchTerm] = useState('')
  const [riskFilter, setRiskFilter] = useState<string>('todos')

  const filteredAssets = assets.filter((asset) => {
    const term = searchTerm.toLowerCase()
    const matchesSearch =
      asset.processNumber.toLowerCase().includes(term) ||
      asset.court.toLowerCase().includes(term) ||
      asset.party.toLowerCase().includes(term) ||
      asset.lawyer.toLowerCase().includes(term)
    const matchesRisk = riskFilter === 'todos' || asset.risk === riskFilter
    return matchesSearch && matchesRisk
  })

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Ativos Judiciais</h1>
          <p className="text-muted-foreground mt-1">Gestão detalhada do portfólio contencioso.</p>
        </div>
        <AddProcessModal />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar processo, parte ou vara..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Prognóstico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Riscos</SelectItem>
              <SelectItem value="Provável">Provável</SelectItem>
              <SelectItem value="Possível">Possível</SelectItem>
              <SelectItem value="Remoto">Remoto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border bg-card shadow-subtle overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold text-primary">Nº Processo / Parte</TableHead>
              <TableHead className="font-semibold text-primary">Advogado(a)</TableHead>
              <TableHead className="text-right font-semibold text-primary">
                Valor Envolvido
              </TableHead>
              <TableHead className="font-semibold text-primary text-center">Prognóstico</TableHead>
              <TableHead className="text-right font-semibold text-primary">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Nenhum processo encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredAssets.map((asset) => (
                <TableRow key={asset.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="font-medium">{asset.processNumber}</div>
                    <div
                      className="text-xs text-muted-foreground truncate max-w-[250px]"
                      title={asset.party}
                    >
                      {asset.party}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{asset.lawyer}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(asset.value)}
                  </TableCell>
                  <TableCell className="text-center">
                    <RiskBadge risk={asset.risk} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <ProcessDetailModal asset={asset} />
                      <EditProcessModal asset={asset} />
                      <DeleteProcessAction asset={asset} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

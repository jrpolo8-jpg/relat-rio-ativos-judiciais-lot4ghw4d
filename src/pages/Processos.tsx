import { useState } from 'react'
import { Search, Filter, Eye, FileText } from 'lucide-react'
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
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'

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

export default function Processos() {
  const { assets } = useAssets()
  const [searchTerm, setSearchTerm] = useState('')
  const [riskFilter, setRiskFilter] = useState<string>('todos')

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.processNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.court.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.lawyer.toLowerCase().includes(searchTerm.toLowerCase())

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
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Adicionar Processo
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar processo, vara ou advogado..."
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
              <TableHead className="font-semibold text-primary">Nº Processo / Vara</TableHead>
              <TableHead className="font-semibold text-primary">Advogado(a)</TableHead>
              <TableHead className="text-right font-semibold text-primary">
                Valor Envolvido
              </TableHead>
              <TableHead className="font-semibold text-primary text-center">Prognóstico</TableHead>
              <TableHead className="font-semibold text-primary">Última Atualização</TableHead>
              <TableHead className="text-right font-semibold text-primary">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
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
                      title={asset.court}
                    >
                      {asset.court}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{asset.lawyer}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(asset.value)}
                  </TableCell>
                  <TableCell className="text-center">
                    <RiskBadge risk={asset.risk} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(asset.lastUpdate)}
                  </TableCell>
                  <TableCell className="text-right">
                    <ProcessDetailModal asset={asset} />
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

function ProcessDetailModal({ asset }: { asset: JudicialAsset }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1">
          <Eye className="h-4 w-4" />
          <span className="hidden xl:inline-block">Detalhes</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {asset.processNumber}
          </DialogTitle>
          <DialogDescription>{asset.court}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-muted/30 border-none shadow-none">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                  Valor
                </p>
                <p className="text-lg font-bold text-foreground">{formatCurrency(asset.value)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Ref: {formatDate(asset.referenceDate)}
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
            <Card className="bg-muted/30 border-none shadow-none md:col-span-2">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                  Responsável
                </p>
                <p className="text-sm font-medium">{asset.lawyer}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Status:{' '}
                  <Badge variant="secondary" className="text-[10px] h-4">
                    {asset.status}
                  </Badge>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
              Resumo do Ocorrido
            </h4>
            <div className="p-4 rounded-md bg-secondary/50 border text-sm leading-relaxed text-foreground/90 font-serif">
              {asset.summary}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
              Histórico de Atualizações
            </h4>
            <div className="space-y-3 border-l-2 border-border ml-2 pl-4 py-2">
              {asset.history.map((h) => (
                <div key={h.id} className="relative">
                  <div className="absolute -left-[23px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background" />
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">
                    {formatDate(h.date)} • {h.author}
                  </p>
                  <p className="text-sm">{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

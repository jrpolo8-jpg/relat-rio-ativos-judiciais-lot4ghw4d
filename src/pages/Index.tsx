import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Scale,
  AlertCircle,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Loader2,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { useAssets } from '@/hooks/use-assets'
import { formatCurrency, formatDate } from '@/lib/formatters'

export default function Index() {
  const { assets, loading } = useAssets()

  const stats = useMemo(() => {
    const total = assets.reduce((sum, asset) => sum + asset.value, 0)
    const active = assets.filter((a) => a.status === 'Ativo').length
    const provavel = assets
      .filter((a) => a.risk === 'Provável')
      .reduce((sum, a) => sum + a.value, 0)

    return { total, active, provavel }
  }, [assets])

  const riskData = useMemo(() => {
    const counts = { Provável: 0, Possível: 0, Remoto: 0 }
    assets.forEach((a) => counts[a.risk]++)
    return [
      { name: 'Provável', value: counts['Provável'], color: 'hsl(var(--chart-1))' },
      { name: 'Possível', value: counts['Possível'], color: 'hsl(var(--chart-2))' },
      { name: 'Remoto', value: counts['Remoto'], color: 'hsl(var(--chart-3))' },
    ]
  }, [assets])

  const recentUpdates = useMemo(() => {
    const allUpdates = assets
      .flatMap((a) =>
        a.history.map((h) => ({ ...h, processNumber: a.processNumber, assetId: a.id })),
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return allUpdates.slice(0, 4)
  }, [assets])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-slate-500 font-medium">Sincronizando com Skip Cloud...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 space-y-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard Executivo</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral do contencioso ativo e contingências.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/processos">Ver Processos</Link>
          </Button>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/relatorio">Gerar Relatório</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-subtle hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total em Litígio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.total)}</div>
            <p className="text-xs text-muted-foreground mt-1">Referência mês atual</p>
          </CardContent>
        </Card>

        <Card className="shadow-subtle hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risco Provável (Contingenciado)</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(stats.provavel)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Impacto direto projetado</p>
          </CardContent>
        </Card>

        <Card className="shadow-subtle hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processos Ativos</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground mt-1">Em acompanhamento</p>
          </CardContent>
        </Card>

        <Card className="shadow-subtle hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atualizações Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">Revisão jurídica necessária</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-3 shadow-subtle">
          <CardHeader>
            <CardTitle>Distribuição de Risco</CardTitle>
            <CardDescription>Quantidade de processos por prognóstico de perda</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                Provável: { label: 'Provável', color: 'hsl(var(--chart-1))' },
                Possível: { label: 'Possível', color: 'hsl(var(--chart-2))' },
                Remoto: { label: 'Remoto', color: 'hsl(var(--chart-3))' },
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              {riskData.map((r) => (
                <div key={r.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
                  <span>
                    {r.name} ({r.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 shadow-subtle flex flex-col">
          <CardHeader>
            <CardTitle>Atualizações Recentes</CardTitle>
            <CardDescription>Últimos andamentos cadastrados no sistema</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-6">
              {recentUpdates.map((update, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-0.5 relative">
                    <div className="absolute top-5 left-1/2 -ml-[1px] h-full w-[2px] bg-border last:hidden" />
                    <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-background">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <p className="font-medium text-sm leading-none">{update.processNumber}</p>
                      <time className="text-xs text-muted-foreground">
                        {formatDate(update.date)}
                      </time>
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug">
                      {update.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-full">
                        {update.author}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full mt-2 text-muted-foreground hover:text-primary">
              Ver histórico completo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

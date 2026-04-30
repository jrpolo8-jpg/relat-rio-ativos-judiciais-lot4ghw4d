import { useAssets } from '@/hooks/use-assets'
import { formatCurrency } from '@/lib/formatters'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Loader2, Scale, Landmark, CircleDollarSign } from 'lucide-react'

export default function Index() {
  const { assets, loading } = useAssets()

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const totalProcessos = assets.length
  const valorIncontroverso = assets.reduce((acc, asset) => acc + (asset.incontroversoValue || 0), 0)
  const valorControverso = assets.reduce((acc, asset) => acc + (asset.controversoValue || 0), 0)

  const countProvavel = assets.filter((a) => a.risk === 'Provável').length
  const countPossivel = assets.filter((a) => a.risk === 'Possível').length
  const countRemoto = assets.filter((a) => a.risk === 'Remoto').length

  const prognosticoData = [
    { name: 'Provável', count: countProvavel, fill: 'hsl(var(--chart-1))' },
    { name: 'Possível', count: countPossivel, fill: 'hsl(var(--chart-2))' },
    { name: 'Remoto', count: countRemoto, fill: 'hsl(var(--chart-3))' },
  ]

  const prognosticoConfig = {
    count: { label: 'Quantidade' },
  }

  const valoresData = [
    { name: 'Incontroverso', value: valorIncontroverso, fill: 'hsl(var(--chart-4))' },
    { name: 'Controverso', value: valorControverso, fill: 'hsl(var(--chart-5))' },
  ]

  const valoresConfig = {
    value: { label: 'Valor' },
  }

  return (
    <div className="container mx-auto p-4 py-8 space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
          Visão geral do contencioso ativos e contingência
        </h1>
        <p className="text-slate-500">
          Acompanhamento estratégico e financeiro dos ativos judiciais.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Total de processos</CardTitle>
            <Scale className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalProcessos}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-emerald-100 bg-emerald-50/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800">
              Valor Incontroverso
            </CardTitle>
            <Landmark className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-700">
              {formatCurrency(valorIncontroverso)}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-amber-100 bg-amber-50/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Valor Controverso</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-700">
              {formatCurrency(valorControverso)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Prognóstico de Ganho</CardTitle>
            <CardDescription>Quantidade de processos por prognóstico de ganho</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={prognosticoConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={prognosticoData}
                  margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {prognosticoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Valores Controversos e Incontroversos</CardTitle>
            <CardDescription>Distribuição financeira dos valores em discussão</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={valoresConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={valoresData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    paddingAngle={3}
                    isAnimationActive={true}
                  >
                    {valoresData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

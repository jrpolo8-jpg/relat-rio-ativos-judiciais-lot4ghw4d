import { LayoutDashboard } from 'lucide-react'
import { JudicialAsset } from '@/lib/types'
import { formatCurrency } from '@/lib/formatters'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function RelatorioDashboard({ assets }: { assets: JudicialAsset[] }) {
  const totalValue = assets.reduce((acc, a) => acc + (a.value || 0), 0)
  const incontroversoValue = assets.reduce((acc, a) => acc + (a.incontroversoValue || 0), 0)
  const controversoValue = assets.reduce((acc, a) => acc + (a.controversoValue || 0), 0)

  const countProvavel = assets.filter((a) => a.risk === 'Provável').length
  const countPossivel = assets.filter((a) => a.risk === 'Possível').length
  const countRemoto = assets.filter((a) => a.risk === 'Remoto').length

  const financialData = [
    { name: 'incontroverso', value: incontroversoValue, fill: 'hsl(var(--chart-3))' },
    { name: 'controverso', value: controversoValue, fill: 'hsl(var(--chart-2))' },
  ]
  const financialConfig = {
    incontroverso: { label: 'Incontroversos', color: 'hsl(var(--chart-3))' },
    controverso: { label: 'Controversos', color: 'hsl(var(--chart-2))' },
  }

  const riskData = [
    { name: 'Provável', count: countProvavel, fill: '#b91c1c' },
    { name: 'Possível', count: countPossivel, fill: '#b45309' },
    { name: 'Remoto', count: countRemoto, fill: '#1d4ed8' },
  ]
  const riskConfig = {
    count: { label: 'Quantidade', color: 'hsl(var(--chart-1))' },
  }

  return (
    <section className="mb-12 print-break-inside-avoid">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6">
        <LayoutDashboard className="h-5 w-5 text-slate-800" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
          Painel Estratégico Integrado
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 print:grid-cols-5 gap-4 mb-8">
        <Card className="bg-slate-50 border-slate-200 shadow-sm print:shadow-none print:border flex flex-col justify-center">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-600 text-center">
              Total de Processos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center p-2 sm:p-4">
            <p className="text-slate-900 text-xl sm:text-2xl font-bold print:text-xl">
              {assets.length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 border-slate-200 shadow-sm print:shadow-none print:border flex flex-col justify-center">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-600 text-center">
              Valor Total Pertencente à Cetenco
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center p-2 sm:p-3 flex items-center justify-center">
            <p className="text-slate-900 text-sm sm:text-base font-bold print:text-xs break-words leading-tight">
              {formatCurrency(incontroversoValue + controversoValue)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50/50 border-emerald-100 shadow-sm print:shadow-none print:border flex flex-col justify-center">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-600 text-center">
              Incontroversos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center p-2 sm:p-3 flex items-center justify-center">
            <p className="text-emerald-700 text-sm sm:text-base font-bold print:text-xs break-words leading-tight">
              {formatCurrency(incontroversoValue)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50/50 border-amber-100 shadow-sm print:shadow-none print:border flex flex-col justify-center">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-600 text-center">
              Controversos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center p-2 sm:p-3 flex items-center justify-center">
            <p className="text-amber-700 text-sm sm:text-base font-bold print:text-xs break-words leading-tight">
              {formatCurrency(controversoValue)}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 border-slate-200 shadow-sm print:shadow-none print:border flex flex-col justify-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-wider text-slate-600 text-center">
              Prognóstico de Ganho
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 pt-0 sm:pt-0">
            <div className="flex justify-between items-center text-sm font-semibold mt-1">
              <div className="flex flex-col items-center">
                <span className="text-[8px] uppercase text-red-700 mb-1">Prov.</span>
                <span className="text-sm text-slate-800">{countProvavel}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[8px] uppercase text-amber-700 mb-1">Poss.</span>
                <span className="text-sm text-slate-800">{countPossivel}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[8px] uppercase text-blue-700 mb-1">Rem.</span>
                <span className="text-sm text-slate-800">{countRemoto}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 print:grid-cols-1 gap-8 print:gap-12 print-break-inside-avoid">
        <Card className="shadow-sm print:shadow-none print:border print:border-slate-300 print:mb-8">
          <CardHeader className="print:pb-2">
            <CardTitle className="text-xs font-bold uppercase text-slate-500 text-center">
              Valores Incontroversos vs. Controversos
            </CardTitle>
          </CardHeader>
          <CardContent className="print:pt-2">
            <ChartContainer
              id="word-export-chart-financial"
              config={financialConfig}
              className="h-[280px] print:h-[280px] w-full print:overflow-visible"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, bottom: 20, left: 0 }}>
                  <Pie
                    data={financialData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    isAnimationActive={false}
                  >
                    {financialData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm print:shadow-none print:border print:border-slate-300 print:mb-8">
          <CardHeader className="print:pb-2">
            <CardTitle className="text-xs font-bold uppercase text-slate-500 text-center">
              Prognóstico de Ganho
            </CardTitle>
          </CardHeader>
          <CardContent className="print:pt-2">
            <ChartContainer
              id="word-export-chart-risk"
              config={riskConfig}
              className="h-[280px] print:h-[280px] w-full print:overflow-visible"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
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
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm print:shadow-none print:border print:border-slate-300 lg:col-span-2 print:col-span-1 print:mt-4">
          <CardHeader>
            <CardTitle className="text-xs font-bold uppercase text-slate-500 text-center">
              Atualizações Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[280px] overflow-y-auto pr-2 print:max-h-none print:overflow-visible">
              {assets.map((a) => (
                <div key={a.id} className="border-l-2 border-slate-800 pl-3 py-1">
                  <p className="text-xs font-bold text-slate-900">{a.processNumber}</p>
                  <p className="text-[10px] text-slate-500 mb-1">{a.party}</p>
                  <p className="text-xs font-serif text-slate-700 leading-snug whitespace-pre-wrap break-words">
                    {a.lastDevelopments}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

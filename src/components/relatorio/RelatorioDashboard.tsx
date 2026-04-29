import { LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { JudicialAsset } from '@/lib/types'
import { formatCurrency } from '@/lib/formatters'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

export function RelatorioDashboard({ assets }: { assets: JudicialAsset[] }) {
  const totalValue = assets.reduce((acc, a) => acc + (a.value || 0), 0)
  const incontroversoValue = assets.reduce((acc, a) => acc + (a.incontroversoValue || 0), 0)
  const controversoValue = assets.reduce((acc, a) => acc + (a.controversoValue || 0), 0)

  const dashboardCards = [
    {
      title: 'Processos Ativos',
      val: assets.length.toString(),
      textCls: 'text-primary text-3xl print:text-xl',
      bgCls: 'bg-slate-50 border-slate-200',
    },
    {
      title: 'Valores Incontroversos',
      val: formatCurrency(incontroversoValue),
      textCls: 'text-emerald-700 text-xl print:text-base',
      bgCls: 'bg-emerald-50/50 border-emerald-100',
    },
    {
      title: 'Valores Controversos',
      val: formatCurrency(controversoValue),
      textCls: 'text-amber-700 text-xl print:text-base',
      bgCls: 'bg-amber-50/50 border-amber-100',
    },
    {
      title: 'Total Global (Disputa)',
      val: formatCurrency(totalValue),
      textCls: 'text-primary text-xl print:text-base',
      bgCls: 'bg-slate-50 border-slate-200',
    },
  ]

  const chartData = [
    { name: 'incontroverso', value: incontroversoValue, fill: 'hsl(var(--chart-3))' },
    { name: 'controverso', value: controversoValue, fill: 'hsl(var(--chart-2))' },
  ]
  const chartConfig = {
    incontroverso: { label: 'Incontroversos', color: 'hsl(var(--chart-3))' },
    controverso: { label: 'Controversos', color: 'hsl(var(--chart-2))' },
  }

  return (
    <section className="mt-12 mb-12 print-page-break-before">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6">
        <LayoutDashboard className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
          IV. Painel Gerencial Integrado (Dashboard)
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 print:grid-cols-4 gap-6 mb-8">
        {dashboardCards.map((c, i) => (
          <div
            key={i}
            className={cn(
              'border rounded p-4 flex flex-col justify-center items-center text-center h-[120px]',
              c.bgCls,
            )}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider mb-2 text-slate-500">
              {c.title}
            </p>
            <p className={cn('font-bold', c.textCls)}>{c.val}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 print:grid-cols-2 gap-8 print-break-inside-avoid">
        <div className="border border-slate-200 rounded p-4 bg-slate-50/50">
          <h4 className="text-xs font-bold uppercase text-slate-500 mb-4 text-center">
            Distribuição de Valores
          </h4>
          <ChartContainer config={chartConfig} className="h-[280px] print:h-[220px] w-full">
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
                  isAnimationActive={false}
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
            Atualizações Recentes
          </h4>
          <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2 print:max-h-none print:overflow-visible">
            {assets.map((a) => (
              <div key={a.id} className="border-l-2 border-primary pl-3 py-1">
                <p className="text-xs font-bold text-primary">{a.processNumber}</p>
                <p className="text-[10px] text-slate-500 mb-1">{a.party}</p>
                <p className="text-xs font-serif text-slate-700 leading-snug">
                  {a.lastDevelopments}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

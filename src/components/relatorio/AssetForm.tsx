import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { JudicialAsset } from '@/lib/types'

export function AssetForm({
  formData,
  setFormData,
}: {
  formData: Partial<JudicialAsset>
  setFormData: (data: Partial<JudicialAsset>) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
      <div className="space-y-2">
        <Label>Número do Processo</Label>
        <Input
          value={formData.processNumber || ''}
          onChange={(e) => setFormData({ ...formData, processNumber: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Parte</Label>
        <Input
          value={formData.party || ''}
          onChange={(e) => setFormData({ ...formData, party: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Vara / Tribunal</Label>
        <Input
          value={formData.court || ''}
          onChange={(e) => setFormData({ ...formData, court: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Advogado</Label>
        <Input
          value={formData.lawyer || ''}
          onChange={(e) => setFormData({ ...formData, lawyer: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Valor Total</Label>
        <Input
          type="number"
          value={formData.value || 0}
          onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label>Valor Incontroverso</Label>
        <Input
          type="number"
          value={formData.incontroversoValue || 0}
          onChange={(e) => setFormData({ ...formData, incontroversoValue: Number(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label>Valor Controverso</Label>
        <Input
          type="number"
          value={formData.controversoValue || 0}
          onChange={(e) => setFormData({ ...formData, controversoValue: Number(e.target.value) })}
        />
      </div>
      <div className="space-y-2">
        <Label>Data Base</Label>
        <Input
          type="date"
          value={formData.referenceDate?.substring(0, 10) || ''}
          onChange={(e) => setFormData({ ...formData, referenceDate: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Prognóstico de Ganho</Label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={formData.risk || 'Possível'}
          onChange={(e) => setFormData({ ...formData, risk: e.target.value as any })}
        >
          <option value="Provável">Provável</option>
          <option value="Possível">Possível</option>
          <option value="Remoto">Remoto</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={formData.status || 'Ativo'}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
        >
          <option value="Ativo">Ativo</option>
          <option value="Encerrado">Encerrado</option>
          <option value="Suspenso">Suspenso</option>
        </select>
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label>Estimativa de Recebimento</Label>
        <Input
          value={formData.estimatedRecoveryTime || ''}
          onChange={(e) => setFormData({ ...formData, estimatedRecoveryTime: e.target.value })}
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label>Resumo da Demanda</Label>
        <Textarea
          value={formData.summary || ''}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          rows={3}
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label>Detalhes de Valores</Label>
        <Textarea
          value={formData.valueDetails || ''}
          onChange={(e) => setFormData({ ...formData, valueDetails: e.target.value })}
          rows={2}
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label>Últimos Andamentos</Label>
        <Textarea
          value={formData.lastDevelopments || ''}
          onChange={(e) => setFormData({ ...formData, lastDevelopments: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  )
}

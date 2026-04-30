import { Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { JudicialAsset, RiskLevel } from '@/lib/types'

export function ProcessForm({
  formData,
  setFormData,
}: {
  formData: Partial<JudicialAsset>
  setFormData: (data: any) => void
}) {
  const handleHistoryChange = (id: string, field: string, value: string) => {
    const newHistory =
      formData.history?.map((h) => (h.id === id ? { ...h, [field]: value } : h)) || []
    setFormData({ ...formData, history: newHistory })
  }

  const handleAddHistory = () => {
    const newHistory = [
      ...(formData.history || []),
      {
        id: Math.random().toString(36).substring(7),
        date: new Date().toISOString().substring(0, 10),
        description: '',
        author: 'Sayão & Polo',
      },
    ]
    setFormData({ ...formData, history: newHistory })
  }

  const handleRemoveHistory = (id: string) => {
    const newHistory = formData.history?.filter((h) => h.id !== id) || []
    setFormData({ ...formData, history: newHistory })
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Número do Processo</Label>
          <Input
            required
            value={formData.processNumber || ''}
            onChange={(e) => setFormData({ ...formData, processNumber: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Parte</Label>
          <Input
            required
            value={formData.party || ''}
            onChange={(e) => setFormData({ ...formData, party: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Tribunal</Label>
          <Input
            required
            value={formData.court || ''}
            onChange={(e) => setFormData({ ...formData, court: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Advogado(a)</Label>
          <Input
            required
            value={formData.lawyer || ''}
            onChange={(e) => setFormData({ ...formData, lawyer: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Valor da Causa (R$)</Label>
          <Input
            required
            type="number"
            value={formData.value || ''}
            onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div className="space-y-2">
          <Label>Valor Incontroverso (R$)</Label>
          <Input
            type="number"
            value={formData.incontroversoValue || 0}
            onChange={(e) =>
              setFormData({ ...formData, incontroversoValue: parseFloat(e.target.value) || 0 })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Valor Controverso (R$)</Label>
          <Input
            type="number"
            value={formData.controversoValue || 0}
            onChange={(e) =>
              setFormData({ ...formData, controversoValue: parseFloat(e.target.value) || 0 })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Data de Referência</Label>
          <Input
            required
            type="date"
            value={formData.referenceDate?.substring(0, 10) || ''}
            onChange={(e) => setFormData({ ...formData, referenceDate: e.target.value })}
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label>Prognóstico de Ganho</Label>
          <Select
            value={formData.risk || 'Possível'}
            onValueChange={(val: RiskLevel) => setFormData({ ...formData, risk: val })}
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
        <div className="md:col-span-2 space-y-2">
          <Label>Detalhes do Valor (Ex: Incontroverso / Controverso)</Label>
          <Input
            value={formData.valueDetails || ''}
            onChange={(e) => setFormData({ ...formData, valueDetails: e.target.value })}
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label>Estimativa de Recebimento</Label>
          <Input
            required
            value={formData.estimatedRecoveryTime || ''}
            onChange={(e) => setFormData({ ...formData, estimatedRecoveryTime: e.target.value })}
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label>Resumo do Processo</Label>
          <Textarea
            required
            className="min-h-[120px] resize-y"
            value={formData.summary || ''}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label>Último Andamento</Label>
          <Textarea
            className="min-h-[120px] resize-y"
            value={formData.lastDevelopments || ''}
            onChange={(e) => setFormData({ ...formData, lastDevelopments: e.target.value })}
          />
        </div>

        <div className="md:col-span-2 space-y-4 border-t pt-4 mt-2">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">Histórico Processual Detalhado</Label>
            <Button type="button" variant="outline" size="sm" onClick={handleAddHistory}>
              <Plus className="h-4 w-4 mr-2" /> Adicionar Evento
            </Button>
          </div>
          <div className="space-y-4">
            {formData.history?.map((h) => (
              <div
                key={h.id}
                className="grid grid-cols-12 gap-2 border p-3 rounded-md relative bg-muted/20"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:text-white"
                  onClick={() => handleRemoveHistory(h.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
                <div className="col-span-12 md:col-span-4 space-y-1">
                  <Label className="text-xs">Data</Label>
                  <Input
                    required
                    type="date"
                    value={h.date.substring(0, 10)}
                    onChange={(e) => handleHistoryChange(h.id, 'date', e.target.value)}
                  />
                </div>
                <div className="col-span-12 md:col-span-8 space-y-1">
                  <Label className="text-xs">Autor/Responsável</Label>
                  <Input
                    required
                    value={h.author}
                    onChange={(e) => handleHistoryChange(h.id, 'author', e.target.value)}
                  />
                </div>
                <div className="col-span-12 space-y-1">
                  <Label className="text-xs">Descrição do Andamento</Label>
                  <Textarea
                    required
                    className="min-h-[80px] text-sm resize-y"
                    value={h.description}
                    onChange={(e) => handleHistoryChange(h.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
            {(!formData.history || formData.history.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum evento histórico cadastrado.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useReportSettings } from '@/hooks/use-report-settings'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Save } from 'lucide-react'
import { getErrorMessage } from '@/lib/pocketbase/errors'

export default function Configuracoes() {
  const { settings, loading, updateSettings } = useReportSettings()
  const { toast } = useToast()

  const [formData, setFormData] = useState<any>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (settings) {
      setFormData(settings)
    }
  }, [settings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateSettings(formData)
      toast({ title: 'Sucesso', description: 'Configurações salvas com sucesso.' })
    } catch (err) {
      toast({ title: 'Erro', description: getErrorMessage(err), variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 py-8 max-w-4xl animate-fade-in-up">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
        Configurações do Relatório
      </h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Gerais e Assinaturas</CardTitle>
            <CardDescription>
              Defina as informações padrão que aparecerão no relatório gerencial exportado.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Preâmbulo (Use {'{valor_total}'} para inserir o valor total dos ativos)</Label>
              <Textarea
                rows={6}
                value={formData.preamble_text || ''}
                onChange={(e) => setFormData({ ...formData, preamble_text: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Data-Base do Relatório</Label>
              <Input
                value={formData.base_date || ''}
                placeholder="Ex: 01/05/2026"
                onChange={(e) => setFormData({ ...formData, base_date: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <div className="space-y-2">
                <Label>Assinatura 1 - Nome</Label>
                <Input
                  value={formData.signature1_name || ''}
                  onChange={(e) => setFormData({ ...formData, signature1_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Assinatura 1 - Título</Label>
                <Input
                  value={formData.signature1_title || ''}
                  onChange={(e) => setFormData({ ...formData, signature1_title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Assinatura 2 - Nome</Label>
                <Input
                  value={formData.signature2_name || ''}
                  onChange={(e) => setFormData({ ...formData, signature2_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Assinatura 2 - Título</Label>
                <Input
                  value={formData.signature2_title || ''}
                  onChange={(e) => setFormData({ ...formData, signature2_title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Assinatura 3 - Nome</Label>
                <Input
                  value={formData.signature3_name || ''}
                  onChange={(e) => setFormData({ ...formData, signature3_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Assinatura 3 - Título</Label>
                <Input
                  value={formData.signature3_title || ''}
                  onChange={(e) => setFormData({ ...formData, signature3_title: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 px-6 py-4">
            <Button type="submit" disabled={saving} className="w-full sm:w-auto ml-auto">
              {saving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Salvar Configurações
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

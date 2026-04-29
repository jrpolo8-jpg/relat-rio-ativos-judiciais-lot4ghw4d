import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { extractFieldErrors } from '@/lib/pocketbase/errors'
import { useToast } from '@/hooks/use-toast'

export default function Login() {
  const { user, signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  if (user) return <Navigate to="/" replace />

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = isSignUp ? await signUp(email, password) : await signIn(email, password)

    setLoading(false)
    if (error) {
      const fieldErrs = extractFieldErrors(error)
      toast({
        variant: 'destructive',
        title: 'Erro na autenticação',
        description:
          Object.values(fieldErrs).join(' ') || 'Credenciais inválidas. Tente novamente.',
      })
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary text-white flex items-center justify-center font-bold text-3xl font-serif rounded mx-auto mb-4">
            C
          </div>
          <h1 className="text-2xl font-bold text-primary font-serif">Cetenco</h1>
          <p className="text-sm text-slate-500 uppercase tracking-wider mt-1">Gestão de Ativos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Aguarde...' : isSignUp ? 'Criar Conta' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-slate-500"
          >
            {isSignUp ? 'Já tenho uma conta' : 'Criar nova conta'}
          </Button>
        </div>
      </div>
    </div>
  )
}

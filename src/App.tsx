import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider, useAuth } from '@/hooks/use-auth'
import { AssetProvider } from '@/hooks/use-assets'
import Index from './pages/Index'
import Processos from './pages/Processos'
import Relatorio from './pages/Relatorio'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import Login from './pages/Login'

function ProtectedRoute() {
  const { user, loading } = useAuth()
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-medium">
        Carregando perfil...
      </div>
    )
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}

const App = () => (
  <AuthProvider>
    <AssetProvider>
      <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/processos" element={<Processos />} />
                <Route path="/relatorio" element={<Relatorio />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </AssetProvider>
  </AuthProvider>
)

export default App

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AssetProvider } from '@/hooks/use-assets'
import Index from './pages/Index'
import Processos from './pages/Processos'
import Relatorio from './pages/Relatorio'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

const App = () => (
  <AssetProvider>
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/relatorio" replace />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/processos" element={<Processos />} />
            <Route path="/relatorio" element={<Relatorio />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </AssetProvider>
)

export default App

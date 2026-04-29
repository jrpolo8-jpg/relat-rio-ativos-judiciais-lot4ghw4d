import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './AppSidebar'
import { Header } from './Header'
import { AssetProvider } from '@/hooks/use-assets'

export default function Layout() {
  return (
    <AssetProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background print:bg-white text-foreground selection:bg-accent/30">
          <AppSidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="bg-amber-100 text-amber-800 text-[11px] sm:text-xs px-4 py-1.5 text-center font-medium border-b border-amber-200 print-hide flex items-center justify-center">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
              Aviso: Os dados atuais são temporários e serão perdidos ao recarregar a página até que
              um banco de dados (Supabase/Skip Cloud) seja conectado.
            </div>
            <Header />
            <main className="flex-1 overflow-auto print:overflow-visible">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AssetProvider>
  )
}

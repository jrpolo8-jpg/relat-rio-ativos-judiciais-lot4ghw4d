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

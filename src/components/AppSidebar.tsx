import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Scale, FileText, Settings, Building2 } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const navItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Ativos Judiciais',
    url: '/processos',
    icon: Scale,
  },
  {
    title: 'Relatório Gerencial',
    url: '/relatorio',
    icon: FileText,
  },
  {
    title: 'Configurações',
    url: '/configuracoes',
    icon: Settings,
  },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="print-hide border-r-border/20">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground shadow-sm">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-sidebar-foreground uppercase tracking-wider text-sm leading-tight">
              Cetenco
            </span>
            <span className="text-[10px] text-sidebar-foreground/70 uppercase tracking-widest leading-tight">
              Legal Dept.
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 text-xs text-sidebar-foreground/50">
        <p>Sistema de Gestão v1.0.0</p>
        <p>Última sync: Hoje, 08:30</p>
      </SidebarFooter>
    </Sidebar>
  )
}

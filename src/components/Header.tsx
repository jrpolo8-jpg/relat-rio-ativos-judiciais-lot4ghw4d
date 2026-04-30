import { Bell, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 print-hide">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="hidden md:flex relative w-64 lg:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar processos, tribunais..."
            className="w-full bg-background pl-9 shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive"></span>
        </Button>

        <Button variant="ghost" className="relative h-8 w-8 rounded-full pointer-events-none">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1"
              alt="Diretor Jurídico"
            />
            <AvatarFallback>DJ</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  )
}

import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Scale } from 'lucide-react'

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center animate-fade-in">
      <div className="bg-primary/5 p-6 rounded-full mb-6 text-primary">
        <Scale className="w-16 h-16" />
      </div>
      <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        A página que você procura não foi encontrada ou foi movida.
      </p>
      <Button asChild size="lg" className="font-medium tracking-wide">
        <Link to="/">Voltar ao Dashboard</Link>
      </Button>
    </div>
  )
}

export default NotFound

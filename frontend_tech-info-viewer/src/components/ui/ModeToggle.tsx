import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  // Estado inicial: asumimos falso hasta que se monte el componente
  const [isDark, setIsDark] = React.useState(false)

  // 1. Al cargar la página (Mount), leemos la realidad del HTML
  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  // 2. Función para cambiar el tema
  const toggleTheme = () => {
    const newThemeIsDark = !isDark

    // Actualizamos el estado visual
    setIsDark(newThemeIsDark)

    // Actualizamos el DOM (La verdad absoluta)
    if (newThemeIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="cursor-pointer rounded-full w-10 h-10 hover:bg-accent hover:text-accent-foreground"
    >
      {/* Renderizado condicional simple */}
      {isDark ? (
        // Si es oscuro, mostramos la Luna (y al hacer clic pasará a sol)
        <Moon className="h-5 w-5 transition-all text-indigo-400" />
      ) : (
        // Si es claro, mostramos el Sol
        <Sun className="h-5 w-5 transition-all text-yellow-500" />
      )}
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )
}

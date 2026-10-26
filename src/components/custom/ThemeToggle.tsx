import { Moon, Sun } from 'lucide-react'
import type { Theme } from '@/hooks/useTheme'
import { IconButton } from './IconButton'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <IconButton tone="glass" label={`Switch to ${nextTheme} theme`} onClick={onToggle} className="size-10 rounded-xl">
      {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </IconButton>
  )
}
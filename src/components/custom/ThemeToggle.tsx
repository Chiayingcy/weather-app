import { AnimatePresence, motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import type { Point } from '@/lib/viewTransition'
import type { Theme } from '@/hooks/useTheme'
import { IconButton } from './IconButton'

interface ThemeToggleProps {
  theme: Theme
  onToggle: (origin: Point) => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <IconButton
      tone="glass"
      label={`Switch to ${nextTheme} theme`}
      onClick={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        onToggle({ x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 })
      }}
      className="relative size-10 overflow-hidden rounded-xl"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0, y: 12, rotate: -90 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -12, rotate: 90 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </motion.span>
      </AnimatePresence>
    </IconButton>
  )
}
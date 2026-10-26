import { motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import type { Theme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

interface ThemeSwitchProps {
  theme: Theme
  onToggle: () => void
  className?: string
}

export function ThemeSwitch({ theme, onToggle, className }: ThemeSwitchProps) {
  const isDark = theme === 'dark'
  const spring = { type: 'spring' as const, stiffness: 500, damping: 32 }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={onToggle}
      className={cn(
        'relative flex h-9 w-18 items-center rounded-full p-1 ring-1 ring-white/50 backdrop-blur-md transition-colors duration-300 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
        isDark
          ? 'justify-end bg-indigo-950/90 shadow-inner shadow-indigo-950/50 hover:bg-indigo-900'
          : 'justify-start bg-amber-100/90 shadow-inner shadow-amber-200/70 hover:bg-amber-200',
        className,
      )}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-1 z-20 grid grid-cols-2 place-items-center">
        <motion.span
          animate={{ opacity: isDark ? 0.55 : 1, scale: isDark ? 0.72 : 1, rotate: isDark ? -45 : 0 }}
          transition={spring}
          className={isDark ? 'text-white/60' : 'text-amber-600 drop-shadow-sm'}
        >
          <Sun className="size-5" />
        </motion.span>
        <motion.span
          animate={{ opacity: isDark ? 1 : 0.55, scale: isDark ? 1 : 0.72, rotate: isDark ? 0 : 30 }}
          transition={spring}
          className={isDark ? 'text-indigo-800 drop-shadow-sm' : 'text-slate-600/70'}
        >
          <Moon className="size-5" />
        </motion.span>
      </span>
      <motion.span
        layout
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        transition={spring}
        aria-hidden="true"
        className="relative z-10 size-7 rounded-full bg-white shadow-[0_2px_8px_rgba(31,20,56,0.3)] ring-1 ring-black/10"
      />
    </button>
  )
}
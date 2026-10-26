import type { ComponentProps } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const TONES = {
  primary: 'size-14 rounded-2xl bg-primary text-primary-foreground shadow-md hover:bg-primary/90',
  glass: 'size-12 rounded-2xl bg-secondary text-secondary-foreground backdrop-blur-md hover:bg-glass-item',
  round: cn(
    'size-8 rounded-full bg-white text-neutral-500 shadow-sm hover:bg-white hover:text-primary',
    'dark:border-2 dark:border-white/40 dark:bg-transparent dark:text-white/60',
    'dark:hover:border-white dark:hover:bg-transparent dark:hover:text-white',
  ),
} as const

interface IconButtonProps extends Omit<ComponentProps<typeof Button>, 'variant' | 'size'> {
  label: string
  tone?: keyof typeof TONES
}

export function IconButton({ label, tone = 'round', type = 'button', className, ...rest }: IconButtonProps) {
  return (
    <Button
      type={type}
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      className={cn('shrink-0 active:scale-90', TONES[tone], className)}
      {...rest}
    />
  )
}
import type { ComponentProps } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const VARIANTS = {
  card: 'overflow-visible rounded-[2rem] bg-card backdrop-blur-xl sm:rounded-[2.5rem]',
  inset: 'rounded-3xl border-0 bg-glass-inset backdrop-blur-md',
} as const

interface GlassPanelProps extends ComponentProps<typeof Card> {
  variant?: keyof typeof VARIANTS
}

export function GlassPanel({ variant = 'card', className, ...rest }: GlassPanelProps) {
  return <Card className={cn('gap-0 py-0 shadow-none', VARIANTS[variant], className)} {...rest} />
}
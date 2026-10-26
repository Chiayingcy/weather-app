import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import cloudImage from '@/assets/cloud.png'
import sunImage from '@/assets/sun.png'
import { cn } from '@/lib/utils'
import { WeatherEffects } from './WeatherEffects'

/** Weather artwork with restrained motion and a pointer tilt on capable devices. */
const ILLUSTRATIONS: Partial<Record<string, string>> = {
  Clear: sunImage,
  Clouds: cloudImage,
  Rain: cloudImage,
  Drizzle: cloudImage,
  Thunderstorm: cloudImage,
}

const GLOW_COLORS: Partial<Record<string, string>> = {
  Clear: 'rgba(251, 191, 36, 0.5)',
  Clouds: 'rgba(251, 191, 36, 0.35)',
  Rain: 'rgba(56, 189, 248, 0.45)',
  Drizzle: 'rgba(56, 189, 248, 0.4)',
  Thunderstorm: 'rgba(99, 102, 241, 0.5)',
  Snow: 'rgba(255, 255, 255, 0.5)',
}

interface WeatherIllustrationProps {
  condition: string
  iconCode: string
  className?: string
}

export function WeatherIllustration({ condition, iconCode, className }: WeatherIllustrationProps) {
  const reducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 120, damping: 18, mass: 0.5 })
  const springY = useSpring(pointerY, { stiffness: 120, damping: 18, mass: 0.5 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12])
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12])
  const src = ILLUSTRATIONS[condition] ?? `https://openweathermap.org/img/wn/${iconCode}@4x.png`
  const glow = GLOW_COLORS[condition] ?? 'rgba(255, 255, 255, 0.35)'

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(Math.max(-0.5, Math.min(0.5, event.clientX / window.innerWidth - 0.5)))
      pointerY.set(Math.max(-0.5, Math.min(0.5, event.clientY / window.innerHeight - 0.5)))
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [pointerX, pointerY, reducedMotion])

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: -34, scale: 0.82, rotate: 8 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 180, damping: 18 }}
      style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 800 }}
      className={cn('relative', className)}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-[14%] rounded-full blur-2xl"
        style={{ backgroundColor: glow }}
        animate={reducedMotion ? { opacity: 0.25 } : { opacity: [0.16, 0.42, 0.16], scale: [0.94, 1.04, 0.94] }}
        transition={reducedMotion ? { duration: 0 } : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.img
        src={src}
        alt=""
        draggable={false}
        animate={reducedMotion ? undefined : { y: [0, -9, 0] }}
        transition={reducedMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 block h-auto w-full select-none"
      />
      <WeatherEffects condition={condition} />
    </motion.div>
  )
}

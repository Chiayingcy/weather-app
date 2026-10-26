import { useEffect } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { formatTemp } from '@/lib/format'

interface AnimatedTemperatureProps {
  value: number
}

/** Counts the displayed temperature up while exposing only the final value to assistive technology. */
export function AnimatedTemperature({ value }: AnimatedTemperatureProps) {
  const reducedMotion = useReducedMotion()
  const shouldReduceMotion = reducedMotion === true
  const temperature = useMotionValue(shouldReduceMotion ? value : 0)
  const formattedTemperature = useTransform(temperature, formatTemp)

  useEffect(() => {
    if (shouldReduceMotion) {
      temperature.set(value)
      return
    }

    const controls = animate(temperature, value, { duration: 0.9, ease: 'easeOut' })
    return () => controls.stop()
  }, [shouldReduceMotion, temperature, value])

  return (
    <>
      <motion.span aria-hidden="true" className="tabular-nums">
        {formattedTemperature}
      </motion.span>
      <span className="sr-only">{formatTemp(value)}</span>
    </>
  )
}

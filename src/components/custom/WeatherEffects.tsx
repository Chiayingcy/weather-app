import { motion, useReducedMotion } from 'motion/react'

interface WeatherEffectsProps {
  condition: string
}

interface Particle {
  left: number
  delay: number
  duration: number
  sway: number
  size: number
}

function createParticles(seed: number, count: number): Particle[] {
  let state = seed
  const next = () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }

  return Array.from({ length: count }, () => ({
    left: 12 + next() * 76,
    delay: next() * 2.4,
    duration: 1.1 + next() * 1.1,
    sway: -8 + next() * 16,
    size: 3 + next() * 3,
  }))
}

const RAIN_PARTICLES = createParticles(4812, 10)
const SNOW_PARTICLES = createParticles(9537, 12)

/** Small deterministic particles that reinforce the current weather condition. */
export function WeatherEffects({ condition }: WeatherEffectsProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return null

  const isRain = condition === 'Rain' || condition === 'Drizzle' || condition === 'Thunderstorm'
  const isSnow = condition === 'Snow'
  const isThunderstorm = condition === 'Thunderstorm'

  if (!isRain && !isSnow) return null

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-visible">
      {isRain && RAIN_PARTICLES.map((particle, index) => (
        <motion.span
          key={`rain-${index}`}
          className="absolute rounded-full bg-sky-100 shadow-[0_0_5px_rgba(224,242,254,0.8)]"
          style={{ left: `${particle.left}%`, top: '60%', width: 2, height: 12 }}
          animate={{ opacity: [0, 0.9, 0], y: [0, 42], x: [0, particle.sway / 2] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      {isSnow && SNOW_PARTICLES.map((particle, index) => (
        <motion.span
          key={`snow-${index}`}
          className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.85)]"
          style={{ left: `${particle.left}%`, top: `${35 + particle.delay * 12}%`, width: particle.size, height: particle.size }}
          animate={{ opacity: [0.25, 0.95, 0.25], y: [0, 42], x: [0, particle.sway, 0] }}
          transition={{ duration: particle.duration + 1.2, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {isThunderstorm && (
        <motion.span
          className="absolute inset-0 rounded-full bg-white blur-2xl"
          animate={{ opacity: [0, 0, 0.65, 0, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'linear', times: [0, 0.68, 0.72, 0.78, 1] }}
        />
      )}
    </div>
  )
}

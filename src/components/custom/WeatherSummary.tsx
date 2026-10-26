import { motion, useReducedMotion } from 'motion/react'
import { formatDateTime, formatTemp, toIsoString } from '@/lib/format'
import { AnimatedTemperature } from '@/components/custom/AnimatedTemperature'
import { WeatherIllustration } from '@/components/custom/WeatherIllustration'
import type { weatherResult } from '@/types/weather'

/**
 * Current weather block.
 * Mobile: two columns (temperature left, details right).
 * sm and up: large temperature, then one row of four details.
 */
export function WeatherSummary({ result }: { result: weatherResult }) {
  const reducedMotion = useReducedMotion()
  const detailVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: reducedMotion ? 0 : 0.06 } },
  }
  const detailItemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 8 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="relative z-10"
    >
      <WeatherIllustration
        condition={result.condition}
        iconCode={result.iconCode}
         className="absolute -top-22 -right-5 z-30 w-48 drop-shadow-lg sm:-top-24 sm:w-72"
      />

      <p aria-hidden="true" className="text-base">
        Today's Weather
      </p>

      <div>
        <p className="text-7xl font-bold leading-none text-heading sm:text-8xl">
          <AnimatedTemperature value={result.temp} />
        </p>

        <p className="mt-1 text-base">
          H: {formatTemp(result.tempMax)} L: {formatTemp(result.tempMin)}
        </p>

        <motion.div
          variants={detailVariants}
          initial="hidden"
          animate="visible"
          className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-base text-muted-foreground sm:grid-cols-[1.1fr_1.2fr_1fr_auto] sm:gap-x-4"
        >
          <motion.p variants={detailItemVariants} className="min-w-0 truncate font-semibold text-muted-foreground dark:text-foreground">
            {result.city}, {result.country}
          </motion.p>
          <motion.time variants={detailItemVariants} dateTime={toIsoString(result.searchTime)} className="text-right sm:text-left">
            {formatDateTime(result.searchTime)}
          </motion.time>
          <motion.p variants={detailItemVariants} className="sm:text-center">Humidity: {result.humidity}%</motion.p>
          <motion.p variants={detailItemVariants} className="text-right sm:text-left">{result.condition}</motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}
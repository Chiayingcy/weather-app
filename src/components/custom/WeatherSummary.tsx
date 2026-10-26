import { motion } from 'motion/react'
import { formatDateTime, formatTemp, toIsoString } from '@/lib/format'
import { WeatherIcon } from './WeatherIcon'
import type { weatherResult } from '@/types/weather'

/**
 * Current weather block.
 * Mobile: two columns (temperature left, details right).
 * sm and up: large temperature, then one row of four details.
 */
export function WeatherSummary({ result }: { result: weatherResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="relative z-10"
    >
      <WeatherIcon
        condition={result.condition}
        iconCode={result.iconCode}
         className="absolute -top-22 -right-5 z-30 w-48 drop-shadow-lg sm:-top-32 sm:w-72"
      />

      <p aria-hidden="true" className="text-base">
        Today's Weather
      </p>

      <div>
        <p className="text-7xl font-bold leading-none text-heading sm:text-8xl">
          {formatTemp(result.temp)}
        </p>

        <p className="mt-1 text-base">
          H: {formatTemp(result.tempMax)} L: {formatTemp(result.tempMin)}
        </p>

        <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-base text-muted-foreground sm:grid-cols-[1.1fr_1.2fr_1fr_auto] sm:gap-x-4">
          <p className="min-w-0 truncate font-semibold text-muted-foreground dark:text-foreground">
            {result.city}, {result.country}
          </p>
          <time dateTime={toIsoString(result.searchTime)} className="text-right sm:text-left">
            {formatDateTime(result.searchTime)}
          </time>
          <p className="sm:text-center">Humidity: {result.humidity}%</p>
          <p className="text-right sm:text-left">{result.condition}</p>
        </div>
      </div>
    </motion.div>
  )
}
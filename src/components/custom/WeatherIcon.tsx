import cloudImage from '@/assets/cloud.png'
import sunImage from '@/assets/sun.png'
import { cn } from '@/lib/utils'

/** Design illustrations by weather group; other groups fall back to OpenWeather's icon set. */
const ILLUSTRATIONS: Partial<Record<string, string>> = {
  Clear: sunImage,
  Clouds: cloudImage,
  Rain: cloudImage,
  Drizzle: cloudImage,
  Thunderstorm: cloudImage,
}

interface WeatherIconProps {
  condition: string
  iconCode: string
  className?: string
}

export function WeatherIcon({ condition, iconCode, className }: WeatherIconProps) {
  const src = ILLUSTRATIONS[condition] ?? `https://openweathermap.org/img/wn/${iconCode}@4x.png`

  return (
    <img
      src={src}
      alt=""
      draggable={false}
      className={cn('pointer-events-none select-none animate-float', className)}
    />
  )
}
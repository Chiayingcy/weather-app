import { AnimatePresence, MotionConfig } from 'motion/react'
import { useSearchHistory } from '@/hooks/useSearchHistory'
import { useTheme } from '@/hooks/useTheme'
import { useWeatherSearch } from '@/hooks/useWeatherSearch'
import { cn } from '@/lib/utils'
import type { searchWeather } from '@/types/weather'
import { WeatherSummary } from './components/custom/WeatherSummary'
import { WeatherSkeleton } from './components/custom/WeatherSkeleton'
import { ErrorBanner } from './components/custom/ErrorBanner'
import { ThemeSwitch } from './components/custom/ThemeSwitch'
import { SearchBar } from './components/custom/SearchBar'
import { GlassPanel } from './components/custom/GlassPanel'
import { SearchHistory } from './components/custom/SearchHistory'

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const weather = useWeatherSearch()
  const history = useSearchHistory()
  const isLoading = weather.status === 'loading'

  const runSearch = async (query: searchWeather) => {
    const report = await weather.searchWeather(query)
    if (report) history.addEntry(report)
  }

  const renderWeather = () => {
    if (weather.data) return <WeatherSummary key={weather.data.searchTime} result={weather.data} />
    if (isLoading) return <WeatherSkeleton key="skeleton" />
    return (
      <p key="empty" className="py-6 text-center text-muted-foreground">
        Search for a city to see today's weather.
      </p>
    )
  }

  return (
    <MotionConfig reducedMotion="user">
      <ThemeSwitch
        theme={theme}
        onToggle={toggleTheme}
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 shadow-lg lg:top-6 lg:right-6 lg:bottom-auto"
      />

      <main className="mx-auto flex min-h-dvh w-full max-w-2xl xl:max-w-4xl flex-col gap-3 px-4 pt-6 pb-24 sm:px-6 sm:pt-10 lg:pb-10">
        <h1 className="sr-only">Today's Weather</h1>

        <SearchBar onSearch={runSearch} isLoading={isLoading} />

        <AnimatePresence>
          {weather.error && <ErrorBanner key="error" message={weather.error} />}
        </AnimatePresence>

        <section aria-label="Current weather" className="relative z-0 mt-10 sm:mt-14">
          <GlassPanel className="px-5 pb-5 pt-6 sm:px-8 sm:pb-8 sm:pt-7">
            <div
              aria-live="polite"
              aria-busy={isLoading}
              className={cn('transition-opacity', isLoading && weather.data && 'opacity-60')}
            >
              <AnimatePresence mode="wait">{renderWeather()}</AnimatePresence>
            </div>

            <SearchHistory
              className="mt-6"
              entries={history.history}
              onSearch={runSearch}
              onDelete={history.removeHistoryEntry}
            />
          </GlassPanel>
        </section>
      </main>
    </MotionConfig>
  )
}
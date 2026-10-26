import { AnimatePresence } from 'motion/react'
import type { weatherHistory } from '@/types/weather'
import { HistoryItem } from './HistoryItem'

interface SearchHistoryProps {
  entries: weatherHistory[]
  onSearch: (entry: weatherHistory) => void
  onDelete: (id: string) => void
  className?: string
}

export function SearchHistory({ entries, onSearch, onDelete, className }: SearchHistoryProps) {
  return (
    <section aria-labelledby="history-heading" className={className}>
      <div className="rounded-2xl bg-glass-inset p-3 backdrop-blur-md sm:p-4">
        <h2 id="history-heading" className="text-xs font-medium sm:text-sm">
          Search History
        </h2>

        {entries.length === 0 ? (
          <p className="py-8 text-center text-xs text-muted-foreground">No Record</p>
        ) : (
          <ol className="mt-3 space-y-2">
            <AnimatePresence initial={false}>
              {entries.map((entry) => (
                <HistoryItem key={entry.id} entry={entry} onSearch={onSearch} onDelete={onDelete} />
              ))}
            </AnimatePresence>
          </ol>
        )}
      </div>
    </section>
  )
}
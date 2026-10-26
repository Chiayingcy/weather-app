import { motion } from 'motion/react'
import { Search, Trash2 } from 'lucide-react'
import { formatDateTime, toIsoString } from '@/lib/format'
import type { weatherHistory } from '@/types/weather'
import { IconButton } from './IconButton'

interface HistoryItemProps {
  entry: weatherHistory
  onSearch: (entry: weatherHistory) => void
  onDelete: (id: string) => void
}

export function HistoryItem({ entry, onSearch, onDelete }: HistoryItemProps) {
  const location = `${entry.city}, ${entry.country}`

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
      className="flex items-center gap-3 rounded-2xl bg-glass-item px-4 py-3 sm:px-5"
    >
      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between sm:gap-4">
        <p className="truncate text-sm sm:text-base">{location}</p>
        <time dateTime={toIsoString(entry.searchTime)} className="text-[11px] text-muted-foreground sm:text-sm">
          {formatDateTime(entry.searchTime)}
        </time>
      </div>

      <div className="flex gap-2">
        <IconButton label={`Search ${location} again`} onClick={() => onSearch(entry)}>
          <Search className="size-4" />
        </IconButton>
        <IconButton label={`Delete ${location} from history`} onClick={() => onDelete(entry.id)}>
          <Trash2 className="size-4" />
        </IconButton>
      </div>
    </motion.li>
  )
}
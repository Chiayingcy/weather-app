import { Skeleton } from '@/components/ui/skeleton'

export function WeatherSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-3">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-20 w-40 sm:h-24" />
      <Skeleton className="h-4 w-32" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-4" />
        ))}
      </div>
    </div>
  )
}
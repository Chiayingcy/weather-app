import { useId, type ComponentProps } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FloatingLabelInputProps extends ComponentProps<typeof Input> {
  label: string
  className?: string
}

export function FloatingLabelInput({ label, id, className, ...rest }: FloatingLabelInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div
      className={cn(
        'relative h-15 min-w-0 flex-1 rounded-[20px] border border-foreground/10 bg-secondary px-5 pt-5 backdrop-blur-md',
        'ring-ring/50 transition focus-within:ring-2',
        className,
      )}
    >
      <Label htmlFor={inputId} className="absolute left-5 top-2 text-[10px] font-normal text-muted-foreground">
        {label}
      </Label>
      <Input
        id={inputId}
        className="h-auto rounded-none border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0 sm:text-base dark:bg-transparent"
        {...rest}
      />
    </div>
  )
}
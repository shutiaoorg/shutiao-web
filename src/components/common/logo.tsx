import { fontLogo } from '@/fonts'
import { cn } from '@/lib/utils'

export function Logo() {
  return (
    <div className={cn('flex items-center gap-3', 'font-bold text-3xl')}>
      <span>🍟</span>
      <div className={cn(fontLogo.className, 'shrink-0 tracking-wide')}>
        Fries Bar
      </div>
    </div>
  )
}

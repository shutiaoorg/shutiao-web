import Link from 'next/link'
import { Logo } from '@/components/common/logo'
import { SocialMedia } from '@/components/common/social-media'
import { ThemeToggle } from '@/components/theme/toggle'
import { cn } from '@/lib/utils'

export function Header() {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 mx-auto flex h-20 w-full max-w-7xl items-center',
        'bg-white/80 backdrop-blur-md dark:bg-transparent dark:backdrop-blur-xs',
      )}
    >
      <Link
        href='/'
        className='flex-1'
      >
        <Logo />
      </Link>

      <div className='flex items-center justify-end gap-5'>
        <SocialMedia />

        <ThemeToggle />
      </div>
    </header>
  )
}

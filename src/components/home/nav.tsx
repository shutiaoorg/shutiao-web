'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

type NavItem = {
  href: string
  label: string
  icon?: React.ComponentType<{ className?: string }> | string
}

type NavEntry = {
  title: string
  items: NavItem[]
}

const NAV_ENTRIES: NavEntry[] = [
  {
    title: 'products',
    items: [{ href: '/products', label: 'products', icon: '📦' }],
  },
  {
    title: 'events',
    items: [{ href: '/events', label: 'events', icon: '🎉' }],
  },
  {
    title: 'work',
    items: [
      { href: '/work/recruit', label: 'recruit', icon: '💼' },
      { href: '/work/seek', label: 'seek', icon: '🔍' },
    ],
  },
  {
    title: 'living',
    items: [
      { href: '/books', label: 'books', icon: '📚' },
      { href: '/movies', label: 'movies', icon: '🎬' },
      { href: '/music', label: 'music', icon: '🎵' },
      { href: '/podcasts', label: 'podcasts', icon: '🎙️' },
      { href: 'https://cyc.earth', label: 'cycling', icon: '🚴' },
      { href: 'https://camlife.app', label: 'photography', icon: '📷' },
    ],
  },
  {
    title: 'communities',
    items: [
      { href: 'https://dalifornia.org', label: 'dali', icon: '☁️' },
      { href: 'https://chiangmai.cool', label: 'chiangmai', icon: '🐘' },
    ],
  },
  {
    title: 'more',
    items: [
      { href: '/blogs', label: 'blogs', icon: '📝' },
      { href: '/updates', label: 'updates', icon: '✨' },
      { href: '/about', label: 'about', icon: 'ℹ️' },
    ],
  },
]

function NavEntry({
  entry,
  t,
}: {
  entry: NavEntry
  t: (key: string) => string
}) {
  if (entry.items.length === 1) {
    const item = entry.items[0]!
    return (
      <NavigationMenuItem>
        <Link
          href={item.href}
          data-umami-event={`nav:${item.label}`}
          className={cn(
            navigationMenuTriggerStyle(),
            'group bg-transparent! opacity-70 transition-all duration-150 hover:bg-transparent! hover:opacity-100',
          )}
        >
          {t(item.label)}
        </Link>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className='bg-transparent! opacity-70 transition-all duration-150 hover:bg-transparent! hover:opacity-100'>
        {t(entry.title)}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul
          className={cn(
            'grid gap-2 p-2',
            entry.items.length >= 2 ? 'w-[300px] grid-cols-2' : 'w-[150px]',
          )}
        >
          {entry.items.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    data-umami-event={`nav:${item.label}`}
                    className='block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                  >
                    <div className='flex items-center gap-2 font-medium text-sm leading-none'>
                      {Icon && (
                        <span className='text-base leading-none'>
                          {typeof Icon === 'string' ? (
                            Icon
                          ) : (
                            <Icon className='size-4' />
                          )}
                        </span>
                      )}
                      {t(item.label)}
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            )
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

export function Nav() {
  const t = useTranslations('nav')
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className='max-w-full flex-wrap justify-start gap-1'>
        {NAV_ENTRIES.map((entry) => (
          <NavEntry
            key={entry.title}
            entry={entry}
            t={t}
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export function NavMobile() {
  const t = useTranslations('nav')
  const allItems = NAV_ENTRIES.flatMap((entry) => entry.items)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className='size-6' />
      </SheetTrigger>

      <SheetContent side='right'>
        <SheetHeader className='border-b px-6 py-4 text-left'>
          <SheetTitle className='text-lg'>{t('menu')}</SheetTitle>
        </SheetHeader>

        <div className='flex flex-1 flex-col overflow-y-auto'>
          <nav className='flex flex-col divide-y divide-border'>
            {allItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-umami-event={`nav-mobile:${item.label}`}
                  className='flex items-center gap-3 px-6 py-4 text-lg transition-colors hover:bg-muted/50'
                >
                  {Icon && (
                    <span className='text-xl leading-none'>
                      {typeof Icon === 'string' ? (
                        Icon
                      ) : (
                        <Icon className='size-5' />
                      )}
                    </span>
                  )}
                  {t(item.label)}
                </Link>
              )
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

'use client'

import { useTranslations } from 'next-intl'
import { AnimatedTabs, type Tab } from '@/components/ui/animated-tabs'
import { Timeline } from '@/components/ui/timeline'

interface TimelineData {
  title: string
  content: React.ReactNode
}

interface EventsTabsProps {
  upcomingData: TimelineData[]
  pastData: TimelineData[]
  locale: string
}

export function EventsTabs({
  upcomingData,
  pastData,
  locale,
}: EventsTabsProps) {
  const t = useTranslations('events')

  const defaultTab = upcomingData.length > 0 ? 'upcoming' : 'past'

  const tabs: Tab[] = [
    {
      label: `${t('upcoming')}${upcomingData.length > 0 ? ` (${upcomingData.length})` : ''}`,
      value: 'upcoming',
    },
    {
      label: `${t('past')}${pastData.length > 0 ? ` (${pastData.length})` : ''}`,
      value: 'past',
    },
  ]

  return (
    <AnimatedTabs
      tabs={tabs}
      defaultTab={defaultTab}
    >
      {(tab) => {
        if (tab.value === 'upcoming') {
          return upcomingData.length > 0 ? (
            <Timeline data={upcomingData} />
          ) : (
            <div className='py-12 text-center text-neutral-500'>
              {locale === 'zh' ? '暂无即将到来的活动' : 'No upcoming events'}
            </div>
          )
        }

        if (tab.value === 'past') {
          return pastData.length > 0 ? (
            <Timeline data={pastData} />
          ) : (
            <div className='py-12 text-center text-neutral-500'>
              {locale === 'zh' ? '暂无过去的活动' : 'No past events'}
            </div>
          )
        }

        return null
      }}
    </AnimatedTabs>
  )
}

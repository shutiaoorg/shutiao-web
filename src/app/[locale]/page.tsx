import { getTranslations } from 'next-intl/server'
import { CalendarComponent } from '@/components/calendar'
import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggle } from '@/components/theme/toggle'

export default async function Home() {
  const t = await getTranslations('common')

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-10'>
      <LanguageToggle />
      <p>{t('title')}</p>
      <ThemeToggle />
      <CalendarComponent />
    </div>
  )
}

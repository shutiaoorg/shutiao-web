import { getTranslations } from 'next-intl/server'
import { ModeToggle } from '@/components/button'
import { CalendarComponent } from '@/components/calendar'
import { LanguageToggle } from '@/components/language-toggle'

export default async function Home() {
  const t = await getTranslations('common')

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-10'>
      <LanguageToggle />
      <p>{t('title')}</p>
      <ModeToggle />
      <CalendarComponent />
    </div>
  )
}

import { getTranslations } from 'next-intl/server'
import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggle } from '@/components/theme/toggle'

export default async function Home() {
  const t = await getTranslations('common')

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-10'>
      <ThemeToggle />
      <LanguageToggle />
      <p>{t('title')}</p>
    </div>
  )
}

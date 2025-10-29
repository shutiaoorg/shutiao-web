'use client'

import { theme as antdTheme, ConfigProvider } from 'antd'
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'
import { useLocale } from 'next-intl'
import { useTheme } from 'next-themes'
import { useIsClient } from '@/hooks/use-is-client'

// Suppress antd React 19 compatibility warning since we use @ant-design/v5-patch-for-react-19
if (typeof window !== 'undefined') {
  const shouldSuppress = (message: unknown) => {
    if (typeof message !== 'string') return false
    return (
      message.includes('[antd: compatible]') ||
      (message.includes('antd v5 support React is 16 ~ 18') &&
        message.includes('see https://u.ant.design/v5-for-19'))
    )
  }

  const originalWarn = console.warn
  const originalError = console.error

  console.warn = (...args: unknown[]) => {
    if (shouldSuppress(args[0])) return
    originalWarn.apply(console, args)
  }

  console.error = (...args: unknown[]) => {
    if (shouldSuppress(args[0])) return
    originalError.apply(console, args)
  }
}

export function AntdWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const mounted = useIsClient()
  const locale = useLocale()

  if (!mounted) return null

  return (
    <ConfigProvider
      locale={locale === 'zh' ? zhCN : enUS}
      theme={{
        algorithm:
          resolvedTheme === 'dark'
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  )
}

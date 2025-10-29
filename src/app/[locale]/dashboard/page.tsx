'use client'

import { AppSidebar } from '@/components/sidebar'
import { ThemeToggle } from '@/components/theme/toggle'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex h-screen w-full flex-col'>
        <div className='flex items-center justify-between px-4 py-2'>
          <SidebarTrigger />
          <ThemeToggle />
        </div>
      </main>
    </SidebarProvider>
  )
}

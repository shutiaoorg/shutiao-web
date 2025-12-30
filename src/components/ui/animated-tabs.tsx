'use client'

import React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface Tab {
  label: string
  value: string
  subRoutes?: string[]
}

interface AnimatedTabsProps {
  tabs: Tab[]
  children?: (tab: Tab) => React.ReactNode
  defaultTab?: string
}

const transition = {
  type: 'tween' as const,
  ease: 'easeOut' as const,
  duration: 0.15,
}

const getHoverAnimationProps = (
  hoveredRect: DOMRect,
  navRect: DOMRect
) => ({
  x: hoveredRect.left - navRect.left - 10,
  y: hoveredRect.top - navRect.top - 4,
  width: hoveredRect.width + 20,
  height: hoveredRect.height + 10,
})

const Tabs = ({
  tabs,
  selectedTabIndex,
  setSelectedTab,
}: {
  tabs: Tab[]
  selectedTabIndex: number
  setSelectedTab: (input: [number, number]) => void
}) => {
  const [buttonRefs, setButtonRefs] = React.useState<
    Array<HTMLButtonElement | null>
  >([])

  React.useEffect(() => {
    setButtonRefs((prev) => prev.slice(0, tabs.length))
  }, [tabs.length])

  const navRef = React.useRef<HTMLDivElement>(null)
  const navRect = navRef.current?.getBoundingClientRect()

  const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect()

  const [hoveredTabIndex, setHoveredTabIndex] = React.useState<number | null>(
    null
  )
  const hoveredRect = buttonRefs[hoveredTabIndex ?? -1]?.getBoundingClientRect()

  return (
    <nav
      ref={navRef}
      className='relative z-0 flex shrink-0 items-center justify-center py-2'
      onPointerLeave={() => setHoveredTabIndex(null)}
    >
      {tabs.map((item, i) => {
        const isActive = selectedTabIndex === i

        return (
          <button
            key={item.value}
            className='relative z-20 flex h-8 cursor-pointer select-none items-center rounded-md bg-transparent px-4 text-base transition-colors'
            onPointerEnter={() => setHoveredTabIndex(i)}
            onFocus={() => setHoveredTabIndex(i)}
            onClick={() => setSelectedTab([i, i > selectedTabIndex ? 1 : -1])}
          >
            <motion.span
              ref={(el) => {
                buttonRefs[i] = el as HTMLButtonElement
              }}
              className={cn('block', {
                'text-neutral-500': !isActive,
                'font-semibold text-black dark:text-white': isActive,
              })}
            >
              <span
                className={item.value === 'danger-zone' ? 'text-red-500' : ''}
              >
                {item.label}
              </span>
            </motion.span>
          </button>
        )
      })}

      <AnimatePresence>
        {hoveredRect && navRect && (
          <motion.div
            key='hover'
            className={cn(
              'absolute left-0 top-0 z-10 rounded-md',
              hoveredTabIndex ===
                tabs.findIndex(({ value }) => value === 'danger-zone')
                ? 'bg-red-100 dark:bg-red-500/30'
                : 'bg-neutral-100 dark:bg-neutral-800'
            )}
            initial={{
              ...getHoverAnimationProps(hoveredRect, navRect),
              opacity: 0,
            }}
            animate={{
              ...getHoverAnimationProps(hoveredRect, navRect),
              opacity: 1,
            }}
            exit={{
              ...getHoverAnimationProps(hoveredRect, navRect),
              opacity: 0,
            }}
            transition={transition}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedRect && navRect && (
          <motion.div
            className={cn(
              'absolute bottom-0 left-0 z-10 h-[2px]',
              selectedTabIndex ===
                tabs.findIndex(({ value }) => value === 'danger-zone')
                ? 'bg-red-500'
                : 'bg-black dark:bg-white'
            )}
            initial={false}
            animate={{
              width: selectedRect.width,
              x: selectedRect.left - navRect.left,
              opacity: 1,
            }}
            transition={transition}
          />
        )}
      </AnimatePresence>
    </nav>
  )
}

export function AnimatedTabs({
  tabs,
  children,
  defaultTab,
}: AnimatedTabsProps) {
  const initialTabId =
    defaultTab ||
    tabs.find((tab) => tab.value === 'home')?.value ||
    tabs[0]?.value ||
    ''

  const [selectedTabIndex, setSelectedTabIndex] = React.useState(() => {
    const index = tabs.findIndex((tab) => tab.value === initialTabId)
    return index >= 0 ? index : 0
  })

  const setSelectedTab = React.useCallback((input: [number, number]) => {
    setSelectedTabIndex(input[0])
  }, [])

  const selectedTab = tabs[selectedTabIndex] || tabs[0]

  if (!selectedTab) {
    return null
  }

  const tabProps = {
    tabs,
    selectedTabIndex,
    setSelectedTab,
  }

  return (
    <div className='w-full'>
      <div className='relative flex w-full items-center justify-center overflow-x-auto overflow-y-hidden'>
        <Tabs {...tabProps} />
      </div>
      {children && (
        <AnimatePresence mode='wait'>
          <motion.div
            key={selectedTab.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={transition}
          >
            {children(selectedTab)}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}


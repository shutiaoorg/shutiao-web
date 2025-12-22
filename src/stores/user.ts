'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserInfo } from '@/types'

interface UserStore {
  userInfo: UserInfo | null
  setUserInfo: (userInfo: UserInfo | null) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => set({ userInfo }),
    }),
    {
      name: 'user-storage',
    },
  ),
)

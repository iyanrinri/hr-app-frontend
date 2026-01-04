import { defineStore } from 'pinia'
import type { User } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  // synced with cookies 'auth-token' and 'auth-user'
  const token = useCookie<string | null>('auth-token', {
    maxAge: 60 * 60 * 24 * 7, // 7 Days
    path: '/'
  })
  
  // Storing complex objects in cookies needs serialization, useCookie handles JSON automatically
  const user = useCookie<User | null>('auth-user', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/' 
  })

  function setAuth(newToken: string, newUser: User) {
    token.value = newToken
    user.value = newUser
  }

  function clearAuth() {
    token.value = null
    user.value = null
  }

  // Getters are just computed properties or direct access in setup store
  const isAuthenticated = computed(() => !!token.value)

  return {
    token,
    user,
    setAuth,
    clearAuth,
    isAuthenticated
  }
})

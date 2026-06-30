// ─────────────────────────────────────────────
// useAuth — persists login state in localStorage
// ─────────────────────────────────────────────
import { useState, useEffect } from 'react'

export interface AuthUser {
  name: string
  email: string
  plan: 'essential' | 'premium' | 'black'
}

const KEY = 'tramigo_user'

export function useAuth() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? (JSON.parse(raw) as AuthUser) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (authUser) {
      localStorage.setItem(KEY, JSON.stringify(authUser))
    } else {
      localStorage.removeItem(KEY)
    }
  }, [authUser])

  const login = (u: AuthUser) => setAuthUser(u)

  const logout = () => setAuthUser(null)

  const isLoggedIn = authUser !== null

  return { authUser, isLoggedIn, login, logout }
}

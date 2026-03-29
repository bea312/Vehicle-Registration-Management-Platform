import { createContext } from 'react'

export interface AuthContextValue {
  isAuthenticated: boolean
  userEmail: string | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

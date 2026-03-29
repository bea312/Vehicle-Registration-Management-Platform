import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

export interface AuthContextValue {
  isAuthenticated: boolean
  userEmail: string | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const AUTH_FLAG_KEY = 'vrmp.isAuthenticated'
const AUTH_EMAIL = 'test@gmail.com'
const AUTH_PASSWORD = 'Password!234'
const AUTH_EMAIL_KEY = 'vrmp.userEmail'

const readStorage = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

const writeStorage = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Ignore storage failures so app can still render.
  }
}

const removeStorage = (key: string) => {
  try {
    window.localStorage.removeItem(key)
  } catch {
    // Ignore storage failures so logout still works in-memory.
  }
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => readStorage(AUTH_FLAG_KEY) === 'true',
  )
  const [userEmail, setUserEmail] = useState<string | null>(
    () => readStorage(AUTH_EMAIL_KEY),
  )

  const login = useCallback((email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPassword = password.trim()
    const valid =
      normalizedEmail === AUTH_EMAIL && normalizedPassword === AUTH_PASSWORD

    if (valid) {
      setIsAuthenticated(true)
      writeStorage(AUTH_FLAG_KEY, 'true')
      setUserEmail(normalizedEmail)
      writeStorage(AUTH_EMAIL_KEY, normalizedEmail)
    }

    return valid
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setUserEmail(null)
    removeStorage(AUTH_FLAG_KEY)
    removeStorage(AUTH_EMAIL_KEY)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated,
      userEmail,
      login,
      logout,
    }),
    [isAuthenticated, userEmail, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
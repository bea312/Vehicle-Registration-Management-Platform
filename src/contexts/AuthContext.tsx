import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

const AUTH_FLAG_KEY = 'vrmp.isAuthenticated'
const AUTH_EMAIL = 'test@gmail.com'
const AUTH_PASSWORD = 'Password!234'

interface AuthContextValue {
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(AUTH_FLAG_KEY)
    setIsAuthenticated(saved === 'true')
  }, [])

  const login = useCallback((email: string, password: string) => {
    const valid = email === AUTH_EMAIL && password === AUTH_PASSWORD

    if (valid) {
      setIsAuthenticated(true)
      window.localStorage.setItem(AUTH_FLAG_KEY, 'true')
    }

    return valid
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    window.localStorage.removeItem(AUTH_FLAG_KEY)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}

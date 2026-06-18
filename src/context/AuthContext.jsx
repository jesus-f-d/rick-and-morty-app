import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

const TOKEN_KEY = 'auth-token'
const USER_KEY = 'auth-user'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null)
  const [user, setUser] = useState(() => localStorage.getItem(USER_KEY) || '')

  // Login simulado: valida que no esten vacios y genera un token falso que se
  // persiste en localStorage (no hay backend real de autenticacion).
  function login(username, password) {
    if (!username.trim() || !password.trim()) {
      throw new Error('Ingresa usuario y contraseña')
    }
    const fakeToken = 'demo.' + btoa(`${username}:${Date.now()}`)
    localStorage.setItem(TOKEN_KEY, fakeToken)
    localStorage.setItem(USER_KEY, username)
    setToken(fakeToken)
    setUser(username)
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser('')
  }

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: Boolean(token), login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

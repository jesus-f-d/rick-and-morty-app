import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Envuelve rutas privadas: si no hay sesion, redirige al login.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

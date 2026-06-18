import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function Navbar() {
  const { favorites } = useFavorites()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <img src="/portal.svg" alt="" width="32" height="32" />
        <span>Rick and Morty</span>
      </Link>

      {isAuthenticated && (
        <nav>
          <NavLink to="/" end>
            Personajes
          </NavLink>
          <NavLink to="/favoritos">
            Favoritos {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
          </NavLink>
          <span className="user">Hola, {user}</span>
          <button className="logout" onClick={handleLogout}>
            Salir
          </button>
        </nav>
      )}
    </header>
  )
}

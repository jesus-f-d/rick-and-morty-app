import { Link, NavLink } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function Navbar() {
  const { favorites } = useFavorites()

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <img src="/portal.svg" alt="" width="32" height="32" />
        <span>Rick and Morty</span>
      </Link>
      <nav>
        <NavLink to="/" end>
          Personajes
        </NavLink>
        <NavLink to="/favoritos">
          Favoritos {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
        </NavLink>
      </nav>
    </header>
  )
}

import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'

const statusColor = {
  Alive: '#55cc44',
  Dead: '#d63d2e',
  unknown: '#9e9e9e',
}

export default function CharacterCard({ character }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(character.id)

  return (
    <article className="card">
      <button
        className={`fav-btn ${fav ? 'active' : ''}`}
        onClick={() => toggleFavorite(character)}
        title={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        aria-label="Favorito"
      >
        {fav ? '★' : '☆'}
      </button>

      <Link to={`/personaje/${character.id}`}>
        <img src={character.image} alt={character.name} loading="lazy" />
        <div className="card-body">
          <h3>{character.name}</h3>
          <p className="status">
            <span className="dot" style={{ background: statusColor[character.status] }} />
            {character.status} - {character.species}
          </p>
        </div>
      </Link>
    </article>
  )
}

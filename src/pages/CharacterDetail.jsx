import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCharacterById } from '../services/api.js'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function CharacterDetail() {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')

    getCharacterById(id)
      .then((res) => {
        if (active) setCharacter(res)
      })
      .catch((err) => {
        if (active) setError(err.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [id])

  if (loading) return <p className="message">Cargando...</p>
  if (error) return <p className="message error">{error}</p>
  if (!character) return null

  const fav = isFavorite(character.id)

  return (
    <section className="detail">
      <Link to="/" className="back">
        ← Volver
      </Link>

      <div className="detail-card">
        <img src={character.image} alt={character.name} />
        <div className="detail-info">
          <div className="detail-title">
            <h1>{character.name}</h1>
            <button
              className={`fav-btn ${fav ? 'active' : ''}`}
              onClick={() => toggleFavorite(character)}
            >
              {fav ? '★' : '☆'}
            </button>
          </div>
          <ul>
            <li>
              <strong>Estado:</strong> {character.status}
            </li>
            <li>
              <strong>Especie:</strong> {character.species}
            </li>
            {character.type && (
              <li>
                <strong>Tipo:</strong> {character.type}
              </li>
            )}
            <li>
              <strong>Genero:</strong> {character.gender}
            </li>
            <li>
              <strong>Origen:</strong> {character.origin?.name}
            </li>
            <li>
              <strong>Ubicacion:</strong> {character.location?.name}
            </li>
            <li>
              <strong>Apariciones:</strong> {character.episode?.length} episodios
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

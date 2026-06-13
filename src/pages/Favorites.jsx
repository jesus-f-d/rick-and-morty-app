import { useFavorites } from '../context/FavoritesContext.jsx'
import CharacterCard from '../components/CharacterCard.jsx'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <section>
      <h1>Mis Favoritos</h1>

      {favorites.length === 0 ? (
        <p className="message">
          Todavia no tienes favoritos. Marca personajes con la estrella para verlos aqui.
        </p>
      ) : (
        <div className="grid">
          {favorites.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </section>
  )
}

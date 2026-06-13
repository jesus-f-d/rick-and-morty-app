import { useEffect, useState } from 'react'
import { getCharacters } from '../services/api.js'
import CharacterCard from '../components/CharacterCard.jsx'
import Filters from '../components/Filters.jsx'
import Pagination from '../components/Pagination.jsx'

export default function Home() {
  const [filters, setFilters] = useState({ name: '', status: '', gender: '', page: 1 })
  const [data, setData] = useState({ results: [], info: { pages: 0 } })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')

    getCharacters(filters)
      .then((res) => {
        if (active) setData(res)
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
  }, [filters])

  function changePage(page) {
    setFilters((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section>
      <h1>Personajes</h1>
      <Filters filters={filters} onChange={setFilters} />

      {loading && <p className="message">Cargando personajes...</p>}
      {error && <p className="message error">{error}</p>}
      {!loading && !error && data.results.length === 0 && (
        <p className="message">No se encontraron personajes con esos filtros.</p>
      )}

      <div className="grid">
        {data.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <Pagination
        page={filters.page}
        totalPages={data.info.pages}
        onPageChange={changePage}
      />
    </section>
  )
}

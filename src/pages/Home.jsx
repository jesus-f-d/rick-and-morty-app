import { useCallback, useMemo, useState } from 'react'
import CharacterCard from '../components/CharacterCard.jsx'
import Filters from '../components/Filters.jsx'
import Pagination from '../components/Pagination.jsx'
import useCharacters from '../hooks/useCharacters.js'
import useDebounce from '../hooks/useDebounce.js'

export default function Home() {
  const [filters, setFilters] = useState({ name: '', status: '', gender: '', page: 1 })

  // El nombre se "debouncea" para no pedir a la API en cada tecla.
  const debouncedName = useDebounce(filters.name, 400)

  // La query solo cambia cuando cambian los valores efectivos de busqueda.
  const query = useMemo(
    () => ({
      name: debouncedName,
      status: filters.status,
      gender: filters.gender,
      page: filters.page,
    }),
    [debouncedName, filters.status, filters.gender, filters.page],
  )

  const { data, loading, error } = useCharacters(query)

  const changePage = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

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

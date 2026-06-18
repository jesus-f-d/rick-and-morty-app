import { useCallback, useEffect, useState } from 'react'
import { getCharacters } from '../services/api.js'

// Custom hook: encapsula la carga de personajes (loading, error y datos) a
// partir de un objeto de filtros. Cancela peticiones obsoletas con AbortController.
export default function useCharacters(filters) {
  const [data, setData] = useState({ results: [], info: { pages: 0 } })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(
    async (signal) => {
      setLoading(true)
      setError('')
      try {
        const res = await getCharacters(filters)
        if (!signal?.aborted) setData(res)
      } catch (err) {
        if (!signal?.aborted) setError(err.message)
      } finally {
        if (!signal?.aborted) setLoading(false)
      }
    },
    [filters],
  )

  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal)
    return () => controller.abort()
  }, [load])

  return { data, loading, error, reload: load }
}

// Las peticiones van al mismo origen (/api) y un proxy del servidor las reenvia
// a la API real. Asi el navegador nunca hace una llamada cross-origin, que algunas
// redes, antivirus o proxies bloquean.
const BASE_URL = '/api'

export async function getCharacters({ page = 1, name = '', status = '', gender = '' } = {}) {
  const params = new URLSearchParams()
  params.set('page', page)
  if (name) params.set('name', name)
  if (status) params.set('status', status)
  if (gender) params.set('gender', gender)

  const res = await fetch(`${BASE_URL}/character?${params.toString()}`)

  if (res.status === 404) {
    // La API devuelve 404 cuando ningun personaje coincide con el filtro
    return { info: { pages: 0, count: 0 }, results: [] }
  }
  if (!res.ok) {
    throw new Error('No se pudieron cargar los personajes')
  }

  return res.json()
}

export async function getCharacterById(id) {
  const res = await fetch(`${BASE_URL}/character/${id}`)
  if (!res.ok) {
    throw new Error('No se encontro el personaje')
  }
  return res.json()
}

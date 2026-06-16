// Funcion serverless de Vercel: reenvia las peticiones /api/* a la API de Rick
// and Morty desde el servidor. El navegador solo habla con nuestro dominio, lo
// que evita bloqueos de CORS/red en el cliente.
//
// El rewrite de vercel.json convierte /api/<ruta> en /api/proxy?path=<ruta>,
// conservando los demas query params (page, status, gender...).
export default async function handler(req, res) {
  const { path, ...rest } = req.query
  const segments = Array.isArray(path) ? path.join('/') : path || ''
  const search = new URLSearchParams(rest).toString()
  const url =
    `https://rickandmortyapi.com/api/${segments}` + (search ? `?${search}` : '')

  try {
    const upstream = await fetch(url)
    const body = await upstream.text()
    res.setHeader('Content-Type', 'application/json')
    // Cache en el edge de Vercel para aliviar la API y acelerar respuestas
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    res.status(upstream.status).send(body)
  } catch (err) {
    res.status(502).json({ error: 'No se pudo contactar la API de origen' })
  }
}

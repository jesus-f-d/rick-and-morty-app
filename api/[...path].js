// Funcion serverless de Vercel: reenvia cualquier peticion /api/* a la API de
// Rick and Morty desde el servidor. El navegador habla solo con nuestro dominio,
// evitando bloqueos de CORS/red en el cliente.
//
// En Vercel, req.url llega relativo al directorio /api (ej: "/character?page=1").
// Quitamos un posible prefijo /api por seguridad y lo reenviamos tal cual.
export default async function handler(req, res) {
  const path = req.url.replace(/^\/api(?=\/|\?|$)/, '')
  const url = `https://rickandmortyapi.com/api${path}`

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

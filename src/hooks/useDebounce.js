import { useEffect, useRef, useState } from 'react'

// Custom hook: retrasa la actualizacion de un valor hasta que deja de cambiar
// durante `delay` ms. Util para no disparar una peticion en cada tecla.
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  const timer = useRef(null)

  useEffect(() => {
    timer.current = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer.current)
  }, [value, delay])

  return debounced
}

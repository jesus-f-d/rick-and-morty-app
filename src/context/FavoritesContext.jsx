import { createContext, useContext, useEffect, useState } from 'react'

const FavoritesContext = createContext()

const STORAGE_KEY = 'rm-favorites'

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  function toggleFavorite(character) {
    setFavorites((prev) => {
      const exists = prev.some((c) => c.id === character.id)
      if (exists) {
        return prev.filter((c) => c.id !== character.id)
      }
      return [...prev, character]
    })
  }

  function isFavorite(id) {
    return favorites.some((c) => c.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}

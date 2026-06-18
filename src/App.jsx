import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import CharacterDetail from './pages/CharacterDetail.jsx'
import Favorites from './pages/Favorites.jsx'
import Login from './pages/Login.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/personaje/:id"
            element={
              <ProtectedRoute>
                <CharacterDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favoritos"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p className="message">Pagina no encontrada.</p>} />
        </Routes>
      </main>
      <footer className="footer">Datos provistos por la Rick and Morty API</footer>
    </>
  )
}

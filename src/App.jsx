import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import CharacterDetail from './pages/CharacterDetail.jsx'
import Favorites from './pages/Favorites.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personaje/:id" element={<CharacterDetail />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="*" element={<p className="message">Pagina no encontrada.</p>} />
        </Routes>
      </main>
      <footer className="footer">
        Datos provistos por la Rick and Morty API
      </footer>
    </>
  )
}

# Rick and Morty App

Plataforma web para explorar los personajes de la serie Rick and Morty, construida con React y consumiendo la [Rick and Morty API](https://rickandmortyapi.com/documentation).

## Funcionalidades

- Login simulado: guarda un token en `localStorage` y protege las rutas privadas
- Listado de todos los personajes
- Vista de detalle de un personaje específico
- Paginación de resultados
- Filtrado por nombre (con *debounce*), estado y género
- Marcar personajes como favoritos y verlos en una página aparte (se guardan en el navegador con localStorage)
- Diseño responsive (móvil, tablet y desktop)

## Tecnologías

- React 18
- React Router DOM (rutas, rutas dinámicas, `useNavigate`, rutas protegidas)
- Context API (favoritos y autenticación)
- Custom hooks (`useCharacters`, `useDebounce`) y hooks avanzados (`useRef`, `useCallback`, `useMemo`)
- Vite
- Fetch API + función serverless de proxy
- Variables de entorno (`.env`)
- CSS con media queries

## Variables de entorno

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_URL` | Base de las peticiones a la API | `/api` (proxy interno) |

## Instalación y uso

Necesitas tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

```bash
# Clonar el repositorio
git clone https://github.com/usuario/rick-and-morty-app.git
cd rick-and-morty-app

# Instalar dependencias
npm install

# Levantar el servidor de desarrollo
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
src/
├── components/      Componentes reutilizables (Navbar, CharacterCard, Filters, Pagination, ProtectedRoute)
├── context/         Estado global: AuthContext y FavoritesContext
├── hooks/           Custom hooks: useCharacters, useDebounce
├── pages/           Vistas: Login, Home, CharacterDetail, Favorites
├── services/        Llamadas a la API
├── App.jsx          Rutas de la aplicación
└── main.jsx         Punto de entrada
api/
└── proxy.js         Función serverless (Vercel) que reenvía a la API real
```

## API

Se utiliza el endpoint público de personajes:

- `GET /character` — listado con paginación y filtros
- `GET /character/:id` — detalle de un personaje

## Deploy

El proyecto está hosteado en Vercel.

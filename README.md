# Rick and Morty App

Plataforma web para explorar los personajes de la serie Rick and Morty, construida con React y consumiendo la [Rick and Morty API](https://rickandmortyapi.com/documentation).

## Funcionalidades

- Listado de todos los personajes
- Vista de detalle de un personaje específico
- Paginación de resultados
- Filtrado por nombre, estado y género
- Marcar personajes como favoritos y verlos en una página aparte (se guardan en el navegador con localStorage)

## Tecnologías

- React 18
- React Router DOM
- Vite
- Fetch API
- CSS

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
├── components/      Componentes reutilizables (Navbar, CharacterCard, Filters, Pagination)
├── context/         Contexto de favoritos (estado global)
├── pages/           Vistas: Home, CharacterDetail, Favorites
├── services/        Llamadas a la API
├── App.jsx          Rutas de la aplicación
└── main.jsx         Punto de entrada
```

## API

Se utiliza el endpoint público de personajes:

- `GET /character` — listado con paginación y filtros
- `GET /character/:id` — detalle de un personaje

## Deploy

El proyecto está hosteado en Vercel.

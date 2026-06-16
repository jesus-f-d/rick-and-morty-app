import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // En desarrollo, el dev server reenvia /api a la API real (proxy del lado servidor).
    proxy: {
      '/api': {
        target: 'https://rickandmortyapi.com',
        changeOrigin: true,
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Plugins: React para los componentes, Tailwind para los estilos
  plugins: [react(), tailwindcss()],
  server: {
    // Para más adelante: redirige las llamadas /api a la API local
    proxy: { '/api': 'http://localhost:7071' },
  },
})
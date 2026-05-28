import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  root: './', // Le clava la raíz del proyecto a Vite de forma obligatoria
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Le da la ruta absoluta real a Rollup
      },
    },
  },
})
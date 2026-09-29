import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'distributor-micro-penn-excited.trycloudflare.com',
      '.trycloudflare.com',
    ],
  },
})

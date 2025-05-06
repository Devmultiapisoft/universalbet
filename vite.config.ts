import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 7050, // Different port from the admin app
    open: true
  },
  build: {
    outDir: 'dist' // Output directory for the build
  }
})

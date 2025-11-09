import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: true, // Enable hot module replacement
    watch: {
      usePolling: false // Better performance for most systems
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@heroicons/react', 'framer-motion']
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})

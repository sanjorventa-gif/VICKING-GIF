import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: '..',
  appType: 'spa',
  server: {
    host: true,
    port: 5173,
    strictPort: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
          ui: ['@chakra-ui/react', '@chakra-ui/icons', '@emotion/react', '@emotion/styled'],
        },
      },
    },
  },
})

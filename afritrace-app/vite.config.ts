import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['graphql']
    }
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled'],
  },
})

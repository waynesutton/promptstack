import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
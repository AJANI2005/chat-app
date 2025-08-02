import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Express server
        changeOrigin: true,              // Needed for some CORS configs
        secure: false,                   // If using self-signed HTTPS
      },
    },
  },
})

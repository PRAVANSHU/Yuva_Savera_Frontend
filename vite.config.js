import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      // Anything starting with /api will be proxied to your backend
      '/api': {
        target: 'http://localhost:5000', // your backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

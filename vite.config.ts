import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://username.github.io/repository-name/', // Change this to your desired base URL
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

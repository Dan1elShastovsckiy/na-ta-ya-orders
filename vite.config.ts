import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Change base to '/' for proper subdomain hosting on Nginx
  base: '/', 
  build: {
    outDir: 'dist',
  }
});
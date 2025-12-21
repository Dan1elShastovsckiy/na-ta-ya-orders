
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', 
  build: {
    outDir: 'dist',
    // We allow Vite to bundle Firebase if it's in node_modules
    // or we can externalize it if we want to rely strictly on the importmap in index.html
    rollupOptions: {
      // If you still have issues, you can uncomment the line below:
      // external: ['firebase/app', 'firebase/database'],
    }
  }
});

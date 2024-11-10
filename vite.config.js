import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',  // Helps with relative paths for assets in Netlify
  build: {
    outDir: 'dist',  // Netlify expects the output folder to be named "dist"
  },
});

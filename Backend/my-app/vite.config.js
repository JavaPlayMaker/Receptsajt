import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import netlifyPlugin from '@netlify/vite-plugin-react-router';
import tsconfigPaths from 'vite-tsconfig-paths';  

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    netlifyPlugin()
  ],
});

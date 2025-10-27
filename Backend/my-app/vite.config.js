import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  test: {
    globals: true,
    environment: 'jsdom', // simulate a browser
    css: false,
    setupFiles: './src/setupTests.js', // path to your setup file
    include: ['src/tests/**/*.{test,spec}.{js,jsx,ts,tsx}'], // 👈 only run unit tests
    exclude: ['e2e/**', 'node_modules/**'],                  // 👈 skip Playwright folder
  },
    
})

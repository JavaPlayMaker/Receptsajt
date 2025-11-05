import { defineConfig,devices} from '@playwright/test';

export default defineConfig({
  testDir: './e2e',   // 👈 only run tests in e2e folder
  timeout: 30 * 1000,
  use: {
    
    headless: true,
    css: false,
  },
   projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'chromium', 
      use: { ...devices['Desktop Chrome'] } 
    },
    { 
      name: 'webkit', 
      use: { ...devices['Desktop Safari'] } 
    },
  ],
  
});

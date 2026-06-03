import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:5173',
  },
  testMatch: '**/*.e2e.{ts,js}',
});

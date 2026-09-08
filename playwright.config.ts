import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: "",
    trace: 'on-first-retry',
    headless: process.env.CI ? true : false,
  },

  projects: [

    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
        // In headed mode, set viewport to null and launch maximized so it runs in full screen
        viewport: process.env.CI ? { width: 1920, height: 1080 } : null,
        deviceScaleFactor: process.env.CI ? 1 : undefined,
        launchOptions: {
          args: process.env.CI ? [] : ['--start-maximized'],
        },
      },
    },
/*
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1800, height: 1000 },
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1800, height: 1000 },
      },
    },
*/

/* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

  ],
});

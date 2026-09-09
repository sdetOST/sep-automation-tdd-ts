import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();
//import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,   
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: 1,  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: process.env.CI ? true : false,
    baseURL: "",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // screenshot: "on-first-failure",
    // video: {mode: "on-first-retry", size: {width: 1900, height: 1080}},
  },

  projects: [

    {
      name: 'chromium',
      use: {
        // channel: process.env.CI ? undefined : 'chrome',
        // In headed mode, set viewport to null and launch maximized so it runs in full screen
        browserName: 'chromium',
        viewport: process.env.CI ? { width: 1920, height: 1080 } : null,
        deviceScaleFactor: process.env.CI ? 1 : undefined,
        launchOptions: {
          args: process.env.CI
            ? ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
            : ['--start-maximized'],
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
    {
      name: 'Microsoft Edge',
      use: { 
        ...devices['Desktop Edge'],
        channel: 'msedge',
        viewport: {width: 1900, height: 1080} 
      },
    },

//=====================================
//----Test against mobile viewports----   
//-------------------------------------   
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, 
*/

  ],
});

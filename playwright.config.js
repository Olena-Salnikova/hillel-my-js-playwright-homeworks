// @ts-check
import { defineConfig, devices } from '@playwright/test';
import config from './config/config';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config();
//import path from 'path';
//dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  //testMatch: /\/tests\/HW.*\/.*\.spec\.js/,
  //testMatch: /\/tests\/HW29\.1\/.*\.spec\.js/,
  globalSetup: './global-setup',
  globalTeardown: './globalTeardown',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 3, //process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    [process.env.CI ? 'list': 'dot'],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: config.baseURL,
    httpCredentials: config.httpCredentials,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: true, // false - Open browser window, if true - runs in background- not opening browser window
    viewport: { width: 1280, height: 720 },
    trace: 'on',
    video: 'on',
    screenshot: 'on',
    navigationTimeout: 30000,
    actionTimeout: 10000,
  },
  timeout: 60000, // Increase global test timeout to 60 seconds


  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /\/tests\/setup\/.*\.setup\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup']
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


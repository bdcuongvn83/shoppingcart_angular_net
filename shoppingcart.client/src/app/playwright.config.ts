import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // thư mục chứa test files
  timeout: 50000,
  use: {
    baseURL: 'https://localhost:61818', // link web Angular app
    browserName: 'chromium',

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false, // 👉 để mặc định mở browser
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
});

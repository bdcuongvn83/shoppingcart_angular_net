import { test, expect } from '@playwright/test';
test('Login success with correct credentials', async ({ page }) => {
  await page.goto('https://localhost:61818/login');

  await page.fill('input[formControlName="UserName"]', 'cuongbd');
  await page.fill('input[formControlName="Password"]', 'ait123456');

  await page.click('button[type="submit"]');

  // ✋ Pause lại browser ở đây
  //await page.pause();

  // Giả sử sau khi login thành công chuyển đến trang /home
  await expect(page).toHaveURL(/.*\/home/);
  //await expect(page.url()).toContain('/home');

  // Có thể kiểm tra hiển thị tên user, token,... tuỳ logic app bạn
  // await expect(page.locator('.userName')).toContainText('admin');
});

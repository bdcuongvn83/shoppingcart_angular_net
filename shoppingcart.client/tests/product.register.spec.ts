import { test, expect } from '@playwright/test';
test('register product success with correct credentials', async ({ page }) => {
  await page.goto('https://localhost:61818/login');

  await page.fill('input[formControlName="UserName"]', 'cuongbd');
  await page.fill('input[formControlName="Password"]', 'ait123456');

  await page.click('button[type="submit"]');

  // ✋ Pause lại browser ở đây
  //await page.pause();

  // Giả sử sau khi login thành công chuyển đến trang /home
  await expect(page).toHaveURL(/.*\/home/);

  // Navigate đến trang tạo product
  await page.goto('https://localhost:61818/add-product');

  // Điền thông tin product
  await page.fill(
    'input[formControlName="productName"]',
    'Playwright Test Product'
  );
  await page.fill('input[formControlName="productPrice"]', '199.99');
  await page.fill(
    'input[formControlName="description"]',
    'This is a product created by Playwright test.'
  );

  // Upload file ảnh (giả sử có input[type="file"])
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.click('input[type="file"]'); // click để mở file picker
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('tests/assets/sample-product.jpeg'); // đường dẫn tới ảnh mẫu

  // Submit form
  await page.click('button[type="submit"]');

  // Đợi thành công (giả sử redirect hoặc hiện message)
  await expect(page).toHaveURL(/.*\/productlist/);

  // // Kiểm tra message thành công (nếu có)
  // await expect(page.locator('.alert-success')).toContainText(
  //   'Product created successfully'
  // );

  // // Hoặc kiểm tra product mới xuất hiện trong danh sách
  // await expect(page.locator('table')).toContainText('Playwright Test Product');
});

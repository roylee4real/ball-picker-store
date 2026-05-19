import { test, expect } from '@playwright/test'

test('homepage loads and shows CTA', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /专业.*捡球.*器/ })).toBeVisible()
  await expect(page.locator('text=了解产品')).toBeVisible()
  await expect(page.locator('text=立即购买')).toBeVisible()
})

test('product page shows product name', async ({ page }) => {
  await page.goto('/product')
  await expect(page.getByRole('heading', { name: '网球捡球器' })).toBeVisible()
})

test('navigate to order without auth redirects to login', async ({ page }) => {
  await page.goto('/order')
  await expect(page).toHaveURL(/\/login/)
})

test('login page renders', async ({ page }) => {
  await page.goto('/login')
  await expect(page.getByRole('heading', { name: '登录' })).toBeVisible()
})

test('register page renders', async ({ page }) => {
  await page.goto('/register')
  await expect(page.locator('text=创建账户')).toBeVisible()
})

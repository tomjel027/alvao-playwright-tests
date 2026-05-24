import { test, expect } from '@playwright/test';

// Otevření aplikace a ověření title
test('Otevření aplikace', async ({ page }) => {

  await page.goto('https://tj.alvaodev-qa-dev.onalvao.com/Alvao');
  await expect(page).toHaveTitle(/Sign in - ALVAO/);

});

// Přihlášení do aplikace
test('Login do ALVAO', async ({ page }) => {

  await page.goto('https://tj.alvaodev-qa-dev.onalvao.com/Alvao');
  await page.getByLabel('User name').fill('entitas.n@gmail.com');
  await page.getByLabel('Password').fill('2nd.Round');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('https://tj.alvaodev-qa-dev.onalvao.com/Alvao/Portal');

});
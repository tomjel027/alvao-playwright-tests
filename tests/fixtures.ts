import { test as base, expect as baseExpect, Page } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables: prefer .env, fallback to .env.example if present
const envPath = path.resolve(process.cwd(), '.env');
const examplePath = path.resolve(process.cwd(), '.env.example');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else if (fs.existsSync(examplePath)) {
  dotenv.config({ path: examplePath });
}

type MyFixtures = {
  loggedPage: Page;
};

export const test = base.extend<MyFixtures>({
  loggedPage: async ({ page }, use) => {
    const user = process.env.ALVAO_USER;
    const pass = process.env.ALVAO_PASS;
    if (!user || !pass) {
      throw new Error('Set ALVAO_USER and ALVAO_PASS in environment (.env or CI variables)');
    }

    await page.goto('https://tj.alvaodev-qa-dev.onalvao.com/Alvao');
    await page.getByLabel('User name').fill(user);
    await page.getByLabel('Password').fill(pass);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await baseExpect(page).toHaveURL(/Alvao\/Portal/);

    // Provide the already-logged-in page to tests
    await use(page);
  },
});

export const expect = baseExpect;

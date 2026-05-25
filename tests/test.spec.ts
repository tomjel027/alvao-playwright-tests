import { test, expect } from '@playwright/test';

//Vytvořte prosím test, který na stránce Objects ověří, že v objektu Contoso (Sample) lze příkazem New object - From template vytvořit nový objekt typu Department.
test('2nd Round', async ({ page }) => {

  await page.goto('https://tj.alvaodev-qa-dev.onalvao.com/Alvao');
  await expect(page).toHaveTitle(/Sign in - ALVAO/);
  await page.getByLabel('User name').fill('entitas.n@gmail.com');
  await page.getByLabel('Password').fill('2nd.Round');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('https://tj.alvaodev-qa-dev.onalvao.com/Alvao/Portal');
  await expect(page.getByTitle('Show navigation pane')).toBeVisible();
  await page.getByTitle('Show navigation pane').click();
  const objectsMenu = page.locator('[siteid="objects"]:visible');
  await objectsMenu.click();
  await expect(page).toHaveTitle(/Objects - ALVAO/);
  await page.getByText('Contoso (Sample)').click();
  await page.getByRole('link', { name: 'New object' }).click();
  await page.locator('[data-command-type="FromTemplate"]').click();
  await page.locator('button[onclick*="selectFromTree(\'TemplateId\'"]').click();
  await page.locator('#SearchDevice').fill('department');
  await page.locator('div[onclick*="searchInNodeTree"]').click();
  await page.getByText('<Department> (default)').click();
  await page.locator('#tree-submit').click();
  await page.locator('fluent-button[form="CreateObjectForm"]').click();
  //await expect(page.locator('span.wb-title')).toHaveText('<Department>');
  //await expect(page.locator('.object__detail__header')).toBeVisible();

});
import { test, expect } from './fixtures';

// Vytvořte prosím test, který na stránce Objects ověří, že v objektu Contoso (Sample) lze příkazem New object - From template vytvořit nový objekt typu Department.
test('2nd Round', async ({ loggedPage }) => {

  const page = loggedPage;

  await expect(page).toHaveURL('https://tj.alvaodev-qa-dev.onalvao.com/Alvao/Portal');
  await expect(page.getByTitle('Show navigation pane')).toBeVisible();
  await page.getByTitle('Show navigation pane').click();
  const objectsMenu = page.locator('[siteid="objects"]:visible');
  await objectsMenu.click();
  await expect(page).toHaveTitle(/Objects - ALVAO/);
  await page.getByRole('link', { name: 'New object' }).click();
  await page.locator('[data-command-type="FromTemplate"]').click();
  await page.locator('button[onclick*="selectFromTree(\'TemplateId\'"]').click();
  await page.locator('#SearchDevice').fill('department');
  await page.locator('#SearchDevice').press('Enter');
  //await page.locator('div[onclick*="searchInNodeTree"]').click();
  await page.getByText('<Department> (default)').click();
  await page.locator('button[onclick*="selectFromTree(\'ParentId\'"]').click();
  await page.locator('#SearchDevice').fill('contoso');
  await page.locator('#SearchDevice').press('Enter');
  //await page.locator('div[onclick*="searchInNodeTree"]').click();
  await page.locator('#nodeTree').getByText('Contoso (Sample)').first().click();
  await page.locator('#tree-submit').click();
  await page.locator('fluent-button[form="CreateObjectForm"]').click();
 
});
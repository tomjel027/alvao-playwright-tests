import { test, expect } from './fixtures';

// Vytvořte prosím test, který na stránce Objects ověří, že v objektu Contoso (Sample) lze příkazem New object - From template vytvořit nový objekt typu Department.
test('2nd Round', async ({ loggedPage }, testInfo) => {
  const page = loggedPage;

  try {
    await test.step('Otevřít Objects a připravit dialog New object from template', async () => {
      await expect(page).toHaveURL('https://tj.alvaodev-qa-dev.onalvao.com/Alvao/Portal');
      await expect(page.getByTitle('Show navigation pane')).toBeVisible();
      await page.getByTitle('Show navigation pane').click();

      const objectsMenu = page.locator('[siteid="objects"]:visible');
      await objectsMenu.click();
      await expect(page).toHaveTitle(/Objects - ALVAO/);

      await page.getByRole('link', { name: 'New object' }).click();
      await page.locator('[data-command-type="FromTemplate"]').click();
      await page.locator("button[onclick*=\"selectFromTree('TemplateId'\"]").click();
      await page.locator('#SearchDevice').fill('department');
      await page.locator('#SearchDevice').press('Enter');
      await page.getByText('<Department> (default)').click();
      await page.locator('#tree-submit').click();
    });

    await test.step('Vytvořit objekt typu Department', async () => {
      const createButton = page.getByText('Create', { exact: true }).first();
      await expect(createButton).toBeVisible();
      await createButton.click();
      await expect(page).toHaveURL(/Alvao\/Objects$/);
      await expect(page.getByRole('link', { name: 'New object' })).toBeVisible();
      //await expect(page.locator('fluent-text.object__detail__header-info-name')).toContainText('<Department>');
    });

  } catch (error) {
    const screenshotPath = `test-results/${testInfo.title.replace(/\s+/g, '-')}-error.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach('page-html', {
      body: await page.content(),
      contentType: 'text/html',
    });

    throw error;
  }
});
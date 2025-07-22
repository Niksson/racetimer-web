import { test, expect } from '@playwright/test';
import { locateElement } from './helpers/element';
import { startAndStopTimer } from './helpers/timer';
import { locateMenu } from './helpers/menu';

test.describe('Menu functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(100);
    await page.evaluate(() => localStorage.setItem('doNotShowPwaPromptAgain', 'true'));
    await page.reload();
    await page.waitForTimeout(500);
  });

  test('menu opens and closes correctly', async ({ page }) => {
    const menuButton = page.locator('label#menu')
    await menuButton.click();
    await page.waitForTimeout(100)
    
    const menu = page.locator('.drawer-side');
    expect(menu).toBeVisible();

    const backdrop = page.locator('.drawer-overlay')
    await backdrop.click();
    await page.waitForTimeout(200)
    
    expect(menu).not.toBeVisible();
  });

  test('opening menu is not possible before both players complete the round', async ({ page }) => {
    const player1Timer = await locateElement(page, 'player1', '.timer');
    await startAndStopTimer(player1Timer, 100);

    const menuButton = await locateMenu(page);
    expect(menuButton).not.toBeVisible();
  })
})
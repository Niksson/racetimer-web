import { test, expect } from '@playwright/test';
import { locateElement } from './helpers/element';
import { statsSchema } from '../../src/lib/appStatsSchema';
import { simulateRound } from './helpers/timer';
import { assignPenalty } from './helpers/penalty';

test.describe("Stats collapse functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(100)
    await page.evaluate(() => localStorage.setItem('doNotShowPwaPromptAgain', 'true'))
    await page.reload()
    await page.waitForTimeout(500)
  });

  test('both players can expand their stats', async ({ page }) => {
    const stats = page.locator('.stats-collapse');
    const statsPlayer2 = stats.nth(0);
    const statsPlayer1 = stats.nth(1);

    await statsPlayer2.tap();
    expect(await statsPlayer2.getAttribute('aria-expanded')).toBe('true');

    await statsPlayer1.tap();
    expect(await statsPlayer1.getAttribute('aria-expanded')).toBe('true');
  });

  test('both players can collapse their stats', async ({ page }) => {
    const stats = page.locator('.stats-collapse');
    const statsPlayer2 = stats.nth(0);
    const statsPlayer1 = stats.nth(1);

    await statsPlayer2.tap();
    await page.locator('#player2').tap();
    expect(await statsPlayer2.getAttribute('aria-expanded')).toBe('false');

    await statsPlayer1.tap();
    await page.locator('#player1').tap();
    expect(await statsPlayer1.getAttribute('aria-expanded')).toBe('false');
  });

  test('each stats schema item has an entry in the collapse', async ({ page }) => {
    const stats = await locateElement(page, 'player1', '.stats-collapse');
    await stats.tap();

    for(const key of Object.keys(statsSchema)) {
      expect(await stats.textContent()).toContain(key);
    }
  })
  test('stats collapse contains field for attempts number', async ({ page }) => {
    const stats = await locateElement(page, 'player1', '.stats-collapse');
    await stats.tap();

    expect(await stats.textContent()).toMatch(/total:\s*0\/0/);
  })

  test('number of attempts increases with each round', async ({ page }) => {  
    await simulateRound(page, 100, 100);

    const stats = await locateElement(page, 'player1', '.stats-collapse');
    await stats.tap();

    expect(await stats.textContent()).toMatch(/total:\s*1\/1/);
  })

  test('unsuccessful attempt does not increment the count', async ({ page }) => {  
    await simulateRound(page, 100, 100);

    await assignPenalty(page, 'player1', 'DNF');

    const stats = await locateElement(page, 'player1', '.stats-collapse');
    await stats.tap();

    expect(await stats.textContent()).toMatch(/total:\s*0\/1/);
  })
});
import { test, expect } from '@playwright/test';
import { simulateRound } from './helpers/timer';
import { eventsMap } from '../../src/lib/eventsMap';
import { locateElement } from './helpers/element';
import { openMenu } from './helpers/menu';

test.describe('Quick start modal functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(100)
    await page.evaluate(() => localStorage.setItem('doNotShowPwaPromptAgain', 'true'))
    await page.reload()
    await page.waitForTimeout(500)
  });
  
  test('starting a new race resets the score', async ({ page }) => {
    await simulateRound(page, 100, 200);
    const score = await locateElement(page, 'player1', '.score');
    expect(await score.textContent()).toMatch(/1\s*:\s*0/);

    await openMenu(page);
    const newRaceButton = page.locator('button#quick-start');
    await newRaceButton.click();

    const eventName = Object.values(eventsMap)[1].displayName;
    const eventSelectionButton = page.getByRole('button', { name: eventName });
    await eventSelectionButton.click();
    expect(await score.textContent()).toMatch(/0\s*:\s*0/);
  })
})
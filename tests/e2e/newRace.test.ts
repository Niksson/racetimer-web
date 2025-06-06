import { test, expect } from '@playwright/test';
import { simulateRound, startAndStopTimer } from './helpers/timer';
import { puzzlesMap } from '../../src/lib/puzzlesMap';
import { locateElement } from './helpers/element';

test.describe('New race modal functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
  });
  
  test('starting a new race resets the score', async ({ page }) => {
    await simulateRound(page, 100, 200);
    const score = await locateElement(page, 'player1', '.score');
    expect(await score.textContent()).toMatch(/1\s*:\s*0/);

    const newRaceButton = page.getByRole('button', { name: 'New race' });
    await newRaceButton.click();

    const eventName = Object.values(puzzlesMap)[1].displayName;
    const eventSelectionButton = page.getByRole('button', { name: eventName });
    await eventSelectionButton.click();
    expect(await score.textContent()).toMatch(/0\s*:\s*0/);
  })

  test('starting a new race is not possible before both players complete the round', async ({ page }) => {
    const player1Timer = await locateElement(page, 'player1', '.timer');
    await startAndStopTimer(player1Timer, 100);

    const newRaceButton = page.getByRole('button', { name: 'New race' });
    expect(newRaceButton).not.toBeVisible();
  })
})
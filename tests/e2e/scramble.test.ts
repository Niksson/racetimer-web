import {test, expect} from '@playwright/test';
import { locateElement } from './helpers/element';
import { puzzlesMap } from '../../src/lib/puzzlesMap';

test.describe('Scramble display', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/scramble');
    await page.waitForTimeout(1000);
  });

  test('a scramble element is present for each player', async ({ page }) => {
    const scramble = page.locator('.scramble');
    expect(await scramble.count()).toBe(2);
  });

  test('clicking on scramble opens a scramble display', async ({ page }) => {
    const scramble = await locateElement(page, 'player1', '.scramble');

    await scramble.tap();

    const scrambleDisplay = page.getByRole('dialog');
    expect (scrambleDisplay).toBeVisible();
  });

  test('changing to puzzle without generating a scramble shows corresponding message', async ({ page }) => {
    const scramble = await locateElement(page, 'player1', '.scramble');

    const newRaceButton = page.getByRole('button', { name: 'New race' });
    await newRaceButton.click();

    const noScramblePuzzle = Object.values(puzzlesMap).find(puzzle => !puzzle.generateScramble);
    expect(noScramblePuzzle).toBeDefined();
    const puzzleSelectionButton = page.getByRole('button', { name: noScramblePuzzle!.displayName });
    await puzzleSelectionButton.click();

    expect(await scramble.textContent()).toContain('Hand scramble');
  })
})
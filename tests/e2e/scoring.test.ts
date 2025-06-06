import { test, expect } from '@playwright/test';
import { simulateRound } from './helpers/timer';
import { locateElement } from './helpers/element';
import { assignPenalty } from './helpers/penalty';

test.describe('Scoring', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(100)
    await page.evaluate(() => localStorage.setItem('doNotShowPwaPromptAgain', 'true'))
    await page.reload()
    await page.waitForTimeout(500)
  });

  test('initial score must be 0:0 for both players', async ({ page }) => {
    const scoreElements = await page.locator('.score').all();

    for (const scoreElement of scoreElements) {
      const scoreText = await scoreElement.textContent();
      expect(scoreText).toMatch(/0\s*:\s*0/);
    }
  })

  test('score is awarded to p1 if p1 is faster', async ({ page }) => {
    await simulateRound(page, 1000, 2000);

    const player1Score = await locateElement(page, 'player1', '.score');
    expect(await player1Score.textContent()).toMatch(/1\s*:\s*0/);
    const player2Score = await locateElement(page, 'player2', '.score');
    expect(await player2Score.textContent()).toMatch(/0\s*:\s*1/);
  })

  test('score is awarded to p2 if p2 is faster', async ({ page }) => {
    await simulateRound(page, 2000, 1000);

    const player1Score = await locateElement(page, 'player1', '.score');
    expect(await player1Score.textContent()).toMatch(/0\s*:\s*1/);
    const player2Score = await locateElement(page, 'player2', '.score');
    expect(await player2Score.textContent()).toMatch(/1\s*:\s*0/);
  })

  test('score is recalculated if a player sets +2 penalty', async ({page}) => {
    await simulateRound(page, 1000, 2000);

    const player1Score = await locateElement(page, 'player1', '.score');
    expect(await player1Score.textContent()).toMatch(/1\s*:\s*0/);

    await assignPenalty(page, 'player1', '+2');
    expect(await player1Score.textContent()).toMatch(/0\s*:\s*1/);
  })

  test('score is recalculated if a player sets DNF penalty', async ({page}) => {
    await simulateRound(page, 1000, 2000);

    const player1Score = await locateElement(page, 'player1', '.score');
    expect(await player1Score.textContent()).toMatch(/1\s*:\s*0/);

    await assignPenalty(page, 'player1', 'DNF');
    expect(await player1Score.textContent()).toMatch(/0\s*:\s*1/);
  })

  test('no one gets a score if both players set the result to DNF', async ({page}) => {
    await simulateRound(page, 100, 200);

    const player1Score = await locateElement(page, 'player1', '.score');
    expect(await player1Score.textContent()).toMatch(/1\s*:\s*0/);

    await assignPenalty(page, 'player1', 'DNF');
    await assignPenalty(page, 'player2', 'DNF');
    expect(await player1Score.textContent()).toMatch(/0\s*:\s*0/);
  })

})
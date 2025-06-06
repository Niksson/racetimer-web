import {test, expect} from '@playwright/test';
import { locateTimer, simulateRound } from './helpers/timer';
import { locateElement } from './helpers/element';
import { assignPenalty } from './helpers/penalty';

test.describe('Solves page functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
  })

  test('solves list is shown for both players', async ({ page }) => {
    await simulateRound(page, 100, 100);

    await page.goto('/#/solves')
    await page.waitForSelector('.solves-list');

    const solvesLists = page.locator('.solves-list');
    expect(await solvesLists.count()).toBe(2);
  })

  test('solve result is recorded correctly', async ({ page }) => {
    await simulateRound(page, 100, 100);
    const timer = await locateTimer(page, 'player1');
    const timerValue = await timer.textContent();

    await page.goto('/#/solves')
    await page.waitForSelector('.solves-list');

    const solveItem = await locateElement(page, 'player1', '.solves-list .solves-list-item');
    expect(await solveItem.textContent()).toContain(timerValue);
  })

  test('solve scramble is recorded correctly', async ({ page }) => {
    const scramble = await locateElement(page, 'player1', '.scramble');
    const scrambleValue = await scramble.textContent();
    await simulateRound(page, 100, 100);

    await page.goto('/#/solves')
    await page.waitForSelector('.solves-list');

    const solveItem = await locateElement(page, 'player1', '.solves-list .solves-list-item');
    expect(await solveItem.textContent()).toContain(scrambleValue);
  })

  test('solve result matches +2 penalty', async ({ page }) => {
    await simulateRound(page, 100, 100);
    await assignPenalty(page, 'player1', '+2');
    const timer = await locateTimer(page, 'player1');
    const timerValue = await timer.textContent();

    await page.goto('/#/solves')
    await page.waitForSelector('.solves-list');

    const solveItem = await locateElement(page, 'player1', '.solves-list .solves-list-item');
    expect(await solveItem.textContent()).toContain(timerValue);
  })

  test('solve result matches DNF penalty', async ({ page }) => {
    await simulateRound(page, 100, 100);
    await assignPenalty(page, 'player1', 'DNF');
    const timer = await locateTimer(page, 'player1');
    const timerValue = await timer.textContent();

    await page.goto('/#/solves')
    await page.waitForSelector('.solves-list');

    const solveItem = await locateElement(page, 'player1', '.solves-list .solves-list-item');
    expect(await solveItem.textContent()).toContain(timerValue);
  })
});
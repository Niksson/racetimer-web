import { test, expect } from '@playwright/test';
import { locateTimer, startAndStopTimer } from './helpers/timer';
import { locatePenaltyAssignButton, locatePenaltyButton } from './helpers/penalty';

test.describe('Penalties', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(100)
    await page.evaluate(() => localStorage.setItem('doNotShowPwaPromptAgain', 'true'))
    await page.reload()
    await page.waitForTimeout(500)
  })

  test('player can assign a +2 penalty', async({page}) => {
    const player1Timer = await locateTimer(page, 'player1')
    const player2Timer = await locateTimer(page, 'player2')
    const penaltyButton = await locatePenaltyButton(page)

    await Promise.all([
      startAndStopTimer(player1Timer, 1000),
      startAndStopTimer(player2Timer, 1100)
    ])
    await page.waitForTimeout(30)
    await penaltyButton.click()
    const plusTwoButton = await locatePenaltyAssignButton(page, 'player1', '+2')
    await plusTwoButton.click()

    expect(await player1Timer.textContent()).toMatch(/3\.\d{3}\+/)
  })

  test('player can assign a DNF penalty', async({page}) => {
    const player1Timer = await locateTimer(page, 'player1')
    const player2Timer = await locateTimer(page, 'player2')
    const penaltyButton = await locatePenaltyButton(page)

    await Promise.all([
      startAndStopTimer(player1Timer, 1000),
      startAndStopTimer(player2Timer, 1100)
    ])
    await page.waitForTimeout(30)
    await penaltyButton.click()
    const dnfButton = await locatePenaltyAssignButton(page, 'player1', 'DNF')
    await dnfButton.click()

    expect(await player1Timer.textContent()).toBe('DNF')
  })

  test('player can remove a penalty', async({page}) => {
    const player1Timer = await locateTimer(page, 'player1')
    const player2Timer = await locateTimer(page, 'player2')
    const penaltyButton = await locatePenaltyButton(page)

    await Promise.all([
      startAndStopTimer(player1Timer, 1000),
      startAndStopTimer(player2Timer, 1100)
    ])
    await page.waitForTimeout(30)
    await penaltyButton.click()
    const dnfButton = await locatePenaltyAssignButton(page, 'player1', 'DNF')
    await dnfButton.click()
    await penaltyButton.click()
    const okButton = await locatePenaltyAssignButton(page, 'player1', 'OK')
    await okButton.click()

    expect(await player1Timer.textContent()).toMatch(/1\.\d{3}/) 
  })
})
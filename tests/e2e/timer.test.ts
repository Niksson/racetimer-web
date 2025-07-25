import { test, expect } from '@playwright/test'
import { startTouchingElement, stopTouchingElement, tapElement } from './helpers/touch'
import { locateStats } from './helpers/statsCollapse'
import { locateTimer, startTimer, stopTimer } from './helpers/timer'
import { locateMenu } from './helpers/menu'

test.describe("Timer logic", () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.waitForTimeout(100)
    await page.evaluate(() => localStorage.setItem('doNotShowPwaPromptAgain', 'true'))
    await page.reload()
    await page.waitForTimeout(500)
  })

  test('both players can start and stop their timers', async ({ page }) => {
    const player1Timer = await locateTimer(page, 'player1')
    const player2Timer = await locateTimer(page, 'player2')

    await startTimer(player1Timer, 1)
    await startTimer(player2Timer, 2)

    await page.waitForTimeout(1000) // wait for 1 second

    await stopTimer(player1Timer, 1)
    await stopTimer(player2Timer, 2)

    expect(await player1Timer.textContent()).not.toBe('0.000')
    expect(await player2Timer.textContent()).not.toBe('0.000')
  })

  test('timer does not start until 0.3 secounds after touch', async ({ page }) => {
    const player1Timer = await locateTimer(page, 'player1')

    await startTouchingElement(player1Timer)
    await page.waitForTimeout(200)
    await stopTouchingElement(player1Timer)
    expect(await player1Timer.textContent()).toBe('0.000')

    await startTouchingElement(player1Timer)
    await page.waitForTimeout(400)
    await stopTouchingElement(player1Timer)
    await tapElement(player1Timer)
    expect(await player1Timer.textContent()).not.toBe('0.000')

  })

  test('middle buttons must not be visible until round is completed', async ({page}) => {
    const player1Timer = await locateTimer(page, 'player1')
    const player2Timer = await locateTimer(page, 'player2')
    const menuButton  = await locateMenu(page)
    const penaltyButton = page.getByRole('button', {name: 'Penalty'})

    await startTimer(player1Timer, 1)
    await page.waitForTimeout(1000) // wait for 1 second
    await stopTimer(player1Timer, 1)
    expect(menuButton).not.toBeVisible()
    expect(penaltyButton).not.toBeVisible()

    await startTimer(player2Timer, 2)
    await page.waitForTimeout(1000) // wait for 1 second
    await stopTimer(player2Timer, 2)
    await page.waitForTimeout(100) // wait for a short time to ensure UI updates
    expect(menuButton).toBeVisible()
    expect(penaltyButton).toBeVisible()
  })

  test('stats collapse must not be expanded when a timer is running', async ({ page }) => {
    const player1Timer = await locateTimer(page, 'player1')
    const player1Stats = await locateStats(page, 'player1')

    await startTimer(player1Timer)
    await page.waitForTimeout(1000) // wait for 1 second
    await tapElement(player1Stats)
    expect(await player1Stats.getAttribute('aria-expanded')).toBe('false')
  })
})


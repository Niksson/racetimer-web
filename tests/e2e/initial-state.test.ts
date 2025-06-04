import { test, expect } from '@playwright/test'

test.describe("Initial app state", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./')
    await page.waitForTimeout(500)
  })

  test('both players have a timer', async ({ page }) => {
    const timersLocator = page.locator('.timer')
    const timers = await timersLocator.all()

    expect(timers).toHaveLength(2)
    for (const timer of timers) {
      expect(await timer.textContent()).toBe('0.000')
    }
  })

  test('both stats collapse are collapsed', async ({ page }) => {
    const statsCollapse = page.locator('.stats-collapse')
    const stats = await statsCollapse.all()

    expect(stats).toHaveLength(2)
    for (const stat of stats) {
      expect(await stat.getAttribute('aria-expanded')).toBe('false')
    }
  })

  test('both players have a scramble', async ({ page }) => {
    const scrambles = page.locator('.scramble')

    expect(await scrambles.all()).toHaveLength(2)
  })

  test('both players have stats', async ({ page }) => {
    const statsCollapse = page.locator('.stats-collapse')

    expect(await statsCollapse.all()).toHaveLength(2)
  })

  test('both players can expand their stats', async ({ page }) => {
    const stats = page.locator('.stats-collapse')
    const statsPlayer2 = stats.nth(0)
    const statsPlayer1 = stats.nth(1)

    await statsPlayer2.tap()
    expect(await statsPlayer2.getAttribute('aria-expanded')).toBe('true')

    await statsPlayer1.tap()
    expect(await statsPlayer1.getAttribute('aria-expanded')).toBe('true')
  })

  test('both players can collapse their stats', async ({ page }) => {
    const stats = page.locator('.stats-collapse')
    const statsPlayer2 = stats.nth(0)
    const statsPlayer1 = stats.nth(1)

    await statsPlayer2.tap()
    await page.locator('#player2').tap()
    expect(await statsPlayer2.getAttribute('aria-expanded')).toBe('false')

    await statsPlayer1.tap()
    await page.locator('#player1').tap()
    expect(await statsPlayer2.getAttribute('aria-expanded')).toBe('false')
  })
})

import { test, expect } from '@playwright/test'

test.describe("Initial app state", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(100)
    await page.evaluate(() => localStorage.setItem('doNotShowPwaPromptAgain', 'true'))
    await page.reload()
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
})

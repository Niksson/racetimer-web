import { test, expect } from '@playwright/test'

test.describe("Players' view", () => {
  test.beforeEach(async ({ page, browser }) => {
    await page.goto('./')
    await page.waitForTimeout(5000)
  })

  test('both players have a timer', async ({ page }) => {
    const timers = page.locator('.timer')

    expect(await timers.all()).toHaveLength(2)
  })

  test('both players have a scramble', async ({ page }) => {
    const scrambles = page.locator('.scramble')

    expect(await scrambles.all()).toHaveLength(2)
  })

  test('both players have stats', async ({ page }) => {
    const scrambles = page.locator('.stats-collapse')

    expect(await scrambles.all()).toHaveLength(2)
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

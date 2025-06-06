import type { Locator, Page } from "@playwright/test"
import type { Side } from "../../../src/models/Side"
import { locateElement } from "./element"
import { startTouchingElement, stopTouchingElement, tapElement } from "./touch"

export async function locateTimer(page: Page, side: Side) {
  const timer = await locateElement(page, side, '.timer')
  return timer
}

export async function startTimer(locator: Locator, identifier: number = 0) {
  await startTouchingElement(locator, identifier)
  await locator.page().waitForTimeout(350)
  await stopTouchingElement(locator)
}

export async function stopTimer(locator: Locator, identifier: number = 0) {
  await tapElement(locator, identifier)
}

export async function startAndStopTimer(locator: Locator, duration: number, identifier: number = 0) {
  await startTimer(locator, identifier)
  await locator.page().waitForTimeout(duration)
  await stopTimer(locator, identifier)
}

export async function simulateRound(page: Page, p1Time: number, p2Time: number) {
  const player1Timer = await locateTimer(page, 'player1')
  const player2Timer = await locateTimer(page, 'player2')

  await Promise.all([
    startAndStopTimer(player1Timer, p1Time, 0),
    startAndStopTimer(player2Timer, p2Time, 1)
  ])

  // Wait for the timers to update
  await page.waitForTimeout(100)
}
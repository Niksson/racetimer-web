import type { Locator, Page } from "@playwright/test"
import type { Side } from "../../../src/models/Side"
import { locateElement } from "./element"
import { startTouchingElement, stopTouchingElement, touchAndReleaseElement } from "./touch"

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
  await touchAndReleaseElement(locator, identifier)
}
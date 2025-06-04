import type { Page } from "@playwright/test"
import type { Side } from "../../../src/models/Side"

export async function locateElement(page: Page, side: Side, selector: string) {
  const elementLocator = page.locator(`${selector}`)
  const element = elementLocator.nth(side === 'player1' ? 0 : 1)
    
  return element
}
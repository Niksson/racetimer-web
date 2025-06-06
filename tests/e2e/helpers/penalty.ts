import type { Page } from "@playwright/test"
import { getByText } from "./element"
import type { Side } from "../../../src/models/Side"

export async function locatePenaltyButton(page: Page) {
  const penaltyButton = page.locator('button#penalty')
  return penaltyButton
}

export async function locatePenaltyAssignButton(page: Page, side: Side, penaltyButtonText: string) {
  const penaltyAssignButton = await getByText(page, side, penaltyButtonText)
  return penaltyAssignButton
}

export async function assignPenalty(page: Page, side: Side, penaltyButtonText: string) {
  const penaltyButton = await locatePenaltyButton(page)
  await penaltyButton.click()
  await page.waitForTimeout(50) // Wait for the button to be ready

  const penaltyAssignButton = await locatePenaltyAssignButton(page, side, penaltyButtonText)
  await penaltyAssignButton.click()
}
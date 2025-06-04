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
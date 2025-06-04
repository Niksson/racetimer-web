import type { Page } from "@playwright/test"
import type { Side } from "../../../src/models/Side"
import { locateElement } from "./element"

export async function locateStats(page: Page, side: Side) {
  const statsLocator = await locateElement(page, side, '.stats-collapse')
  return statsLocator
}
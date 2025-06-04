import type { Locator, Page } from "@playwright/test"
import type { Side } from "../../../src/models/Side"

export async function locateElement(page: Page, side: Side, selector: string) {
  const elementLocator = page.locator(selector)
  const firstSide = await determineFirstElementSide(elementLocator)

  return firstSide === side ? elementLocator.first() : elementLocator.nth(1)
}

export async function getByText(page: Page, side: Side, text: string) {
  const elementLocator = page.getByText(text)
  const firstSide = await determineFirstElementSide(elementLocator)

  return firstSide === side ? elementLocator.first() : elementLocator.nth(1)
}

async function determineFirstElementSide(locator: Locator): Promise<Side> {
  const first = locator.first()
  const center = await getCenterPointLocation(first)
  const pageCenter = await getPageCenterPointLocation(first.page())
  return center.y > pageCenter.y ? 'player1' : 'player2'
}

export async function getCenterPointLocation(locator: Locator) {
  const box = await locator.boundingBox()
  if (!box) {
    throw new Error("Element bounding box not found")
  }
  
  const centerX = box.x + box.width / 2
  const centerY = box.y + box.height / 2
  
  return { x: centerX, y: centerY }
}

export async function getPageCenterPointLocation(page: Page) {
  const viewportSize = page.viewportSize()
  if (!viewportSize) {
    throw new Error("Viewport size not found")
  }
  
  const centerX = viewportSize.width / 2
  const centerY = viewportSize.height / 2
  
  return { x: centerX, y: centerY }
}

export async function getSide(locator: Locator): Promise<Side> {
  const elementCenter = await getCenterPointLocation(locator)
  const pageCenter = await getPageCenterPointLocation(locator.page())

  return elementCenter.y < pageCenter.y ? 'player2' : 'player1'
}
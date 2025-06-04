import type { Locator } from '@playwright/test'

export async function startTouchingElement(locator: Locator, identifier: number = 0) {
  

  const boundingBox = await locator.boundingBox()

  if (!boundingBox) {
    throw new Error('Element bounding box is not available')
  }

  const x = boundingBox.x + boundingBox.width / 2
  const y = boundingBox.y + boundingBox.height / 2

  const touches = [{
    identifier,
    clientX: x,
    clientY: y,
  }]

  await locator.dispatchEvent('touchstart', {
    touches,
    changedTouches: touches,
    targetTouches: touches,
  })
}

export async function stopTouchingElement(locator: Locator) {
  await locator.dispatchEvent('touchend')
}

export async function tapElement(locator: Locator, identifier: number = 0) {
  await startTouchingElement(locator, identifier)
  await locator.page().waitForTimeout(10) // wait for a short duration
  await stopTouchingElement(locator)
}
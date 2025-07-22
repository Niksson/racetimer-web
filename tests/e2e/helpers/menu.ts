import type { Page } from "@playwright/test"

export async function locateMenu(page: Page) {
  const menuLocator = page.locator('label#menu')
  return menuLocator
}

export async function openMenu(page: Page)
{
  const menuButton = await locateMenu(page)
  await menuButton.click();
  await page.waitForTimeout(100) // Wait for the menu to open
}

export async function closeMenu(page: Page)
{
  const menuLocator = await locateMenu(page)
  await menuLocator.uncheck()
  await page.waitForTimeout(100) // Wait for the menu to close
}
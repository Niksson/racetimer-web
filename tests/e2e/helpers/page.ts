import type { Page } from "@playwright/test";

export function catchConsole(page: Page) {
  page.on('console', (msg) => {
    console.log('PAGE LOG:', msg.text());
  })
}
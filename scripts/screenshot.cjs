const { chromium } = require('@playwright/test')

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await context.newPage()
  await page.goto('http://localhost:4173/ai-new-quality-productivity/')
  await page.waitForTimeout(4000)
  await page.screenshot({ path: 'scripts/screenshot.png', fullPage: false })
  await browser.close()
})()

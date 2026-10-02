const { chromium } = require('@playwright/test')

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const page = await context.newPage()
  await page.goto('http://localhost:4173/ai-new-quality-productivity/')
  await page.waitForTimeout(3000)

  for (let i = 0; i < 10; i++) {
    await page.screenshot({ path: `scripts/section-${i}.png`, fullPage: false })
    await page.evaluate(() => window.scrollBy({ top: 850, behavior: 'instant' }))
    await page.waitForTimeout(1200)
  }

  await browser.close()
})()

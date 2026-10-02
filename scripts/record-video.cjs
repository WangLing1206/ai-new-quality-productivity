const { chromium } = require('@playwright/test')
const { execFileSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path

;(async () => {
  const videoDir = path.join(__dirname, '..', 'videos')
  fs.mkdirSync(videoDir, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: videoDir,
      size: { width: 1280, height: 720 },
    },
  })
  const page = await context.newPage()

  await page.goto('http://localhost:4173/ai-new-quality-productivity/')
  await page.waitForTimeout(2500)

  // Scroll through the page slowly
  const totalScroll = async () => {
    const height = await page.evaluate(() => document.body.scrollHeight - window.innerHeight)
    const steps = 50
    const step = height / steps
    for (let i = 0; i <= steps; i++) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(i * step))
      await page.waitForTimeout(900)
    }
  }

  await totalScroll()

  // Hover a couple of industry cards
  const cards = await page.locator('#industry .glass-card').all()
  if (cards.length >= 3) {
    for (const card of cards.slice(0, 3)) {
      await card.scrollIntoViewIfNeeded()
      await card.hover()
      await page.waitForTimeout(1000)
    }
  }

  // Scroll to radar chart and pause
  const radar = page.locator('#innovation')
  await radar.scrollIntoViewIfNeeded()
  await page.waitForTimeout(2000)

  // Scroll to timeline and pause
  const future = page.locator('#future')
  await future.scrollIntoViewIfNeeded()
  await page.waitForTimeout(2000)

  // Scroll to bottom and back to top
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }))
  await page.waitForTimeout(2000)
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  await page.waitForTimeout(3000)

  await context.close()
  await browser.close()

  const files = fs.readdirSync(videoDir)
  const webm = files.find((f) => f.endsWith('.webm'))
  if (!webm) {
    console.error('No video recorded')
    process.exit(1)
  }

  const input = path.join(videoDir, webm)
  const output = path.join(videoDir, 'site-walkthrough.mp4')

  execFileSync(ffmpegPath, [
    '-y',
    '-i', input,
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '23',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    output,
  ], { stdio: 'inherit' })

  fs.unlinkSync(input)
  console.log('Video saved to', output)
})()

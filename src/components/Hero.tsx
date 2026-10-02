import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { heroContent } from '../data/content'
import { useEffect, useRef } from 'react'

function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = canvas.offsetWidth
    let height = canvas.offsetHeight
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const particleCount = Math.min(70, Math.floor(width / 18))
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 224, 255, 0.6)'
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(0, 224, 255, ${0.15 * (1 - dist / 130)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
      animationId = requestAnimationFrame(render)
    }

    const handleResize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    render()
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <ParticleNetwork />

      <div className="relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-6 inline-block rounded-full border border-tech/30 bg-tech/10 px-5 py-2 text-sm font-medium tracking-widest text-tech backdrop-blur-sm">
            数字展厅 · 数据可视化
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl text-shadow"
        >
          {heroContent.title}
          <span className="block bg-gradient-to-r from-tech via-cyan-200 to-gold bg-clip-text text-transparent">
            {heroContent.subtitle}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl"
        >
          {heroContent.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            type="button"
            onClick={() => scrollTo('stats')}
            className="rounded-full bg-gradient-to-r from-tech to-tech-dark px-8 py-3.5 font-semibold text-deep-900 shadow-[0_0_30px_rgba(0,224,255,0.35)] transition-transform hover:scale-105"
          >
            {heroContent.ctaPrimary}
          </button>
          <button
            type="button"
            onClick={() => scrollTo('flow')}
            className="rounded-full border border-surfaceBorder bg-surface px-8 py-3.5 font-semibold text-white backdrop-blur-md transition-colors hover:border-tech/50 hover:bg-tech/10"
          >
            {heroContent.ctaSecondary}
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <button
          type="button"
          onClick={() => scrollTo('concept')}
          className="flex flex-col items-center gap-2 text-slate-400 transition-colors hover:text-tech"
          aria-label="向下滚动"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </motion.div>
    </section>
  )
}

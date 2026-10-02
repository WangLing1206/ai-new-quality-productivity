import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import type { StatItem } from '../data/content'

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4)
}

export function StatCounter({ stat }: { stat: StatItem }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setDisplay(easeOutQuart(progress) * stat.value)
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, stat.value])

  const formatted = stat.decimals
    ? display.toFixed(stat.decimals)
    : Math.floor(display).toLocaleString()

  return (
    <div
      ref={ref}
      className="glass-card glow-border flex flex-col items-center p-8 text-center transition-transform hover:-translate-y-1"
    >
      <div className="text-4xl font-black text-white md:text-5xl">
        {stat.prefix || ''}
        {formatted}
        <span className="text-tech">{stat.suffix || ''}</span>
      </div>
      <div className="mt-3 text-base font-medium text-slate-200">{stat.label}</div>
      <div className="mt-2 text-sm text-slate-400">{stat.description}</div>
    </div>
  )
}

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  gradient?: boolean
}

export function Section({ id, children, className = '', gradient = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {gradient && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-tech/5 to-transparent opacity-40" />
      )}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="section-container relative z-10"
      >
        {children}
      </motion.div>
    </section>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
}

export function SectionHeader({ eyebrow, title, description, centered = true }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full border border-tech/30 bg-tech/10 px-4 py-1 text-sm font-medium tracking-wide text-tech">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
          {description}
        </p>
      )}
    </div>
  )
}

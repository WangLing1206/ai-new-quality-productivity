import { motion } from 'framer-motion'
import { milestones } from '../data/content'

export function Timeline() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-tech via-gold to-transparent md:left-1/2 md:-translate-x-1/2" />

      <div className="space-y-10">
        {milestones.map((m, index) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="flex-1 md:px-12">
              <div className="glass-card glow-border p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-tech">{m.year}</span>
                  <h3 className="text-lg font-bold text-white">{m.title}</h3>
                </div>
                <p className="mt-2 text-slate-300">{m.description}</p>
              </div>
            </div>

            <div className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-deep-900 bg-gold shadow-[0_0_15px_rgba(245,197,66,0.6)] md:left-1/2 md:top-1/2 md:-translate-y-1/2" />

            <div className="hidden flex-1 md:block md:px-12" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

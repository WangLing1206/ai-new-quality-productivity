import { motion } from 'framer-motion'
import { policyTimeline } from '../data/content'

export function PolicyTimeline() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-tech via-gold to-transparent md:left-1/2 md:-translate-x-1/2" />

      <div className="space-y-8">
        {policyTimeline.map((item, index) => (
          <motion.div
            key={item.year + item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="flex-1 md:px-12">
              <div className="glass-card glow-border p-5 transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black text-gold">{item.year}</span>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                </div>
                <p className="mt-1 text-sm text-slate-400">{item.source}</p>
              </div>
            </div>

            <div className="absolute left-0 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-deep-900 bg-tech shadow-[0_0_15px_rgba(0,224,255,0.6)] md:left-1/2 md:top-1/2 md:-translate-y-1/2" />

            <div className="hidden flex-1 md:block md:px-12" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import { flowSteps } from '../data/content'

export function FlowDiagram() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-tech via-gold to-tech/30 md:block" />

      <div className="space-y-12 md:space-y-20">
        {flowSteps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className={`relative flex items-center gap-8 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div
              className={`hidden md:block md:w-1/2 ${
                index % 2 === 0 ? 'md:text-right' : 'md:text-left'
              }`}
            >
              <div className="glass-card inline-block max-w-md p-6">
                <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-slate-300">{step.description}</p>
              </div>
            </div>

            <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-tech bg-deep-800 text-lg font-black text-tech shadow-[0_0_25px_rgba(0,224,255,0.35)]">
              {index + 1}
            </div>

            <div className="md:hidden">
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.description}</p>
              </div>
            </div>

            <div
              className={`hidden md:block md:w-1/2 ${
                index % 2 === 0 ? 'md:text-left' : 'md:text-right'
              }`}
            >
              <span className="text-5xl font-black text-white/5">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

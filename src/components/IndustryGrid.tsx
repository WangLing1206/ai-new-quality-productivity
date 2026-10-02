import { motion } from 'framer-motion'
import {
  Bus,
  Factory,
  GraduationCap,
  Landmark,
  Stethoscope,
  Wheat,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { industryCases } from '../data/content'
import type { IndustryCase } from '../data/content'

const iconMap: Record<string, LucideIcon> = {
  Factory,
  Wheat,
  Stethoscope,
  GraduationCap,
  Bus,
  Landmark,
}

function IndustryCard({ item, index }: { item: IndustryCase; index: number }) {
  const Icon = iconMap[item.icon] || Factory

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="glass-card group relative overflow-hidden p-7 transition-all hover:border-tech/40 hover:shadow-[0_0_40px_rgba(0,224,255,0.12)]"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-tech/10 blur-2xl transition-all group-hover:bg-tech/20" />
      <div className="relative z-10">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-tech/20 to-tech/5 text-tech ring-1 ring-tech/30">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-bold text-white">{item.title}</h3>
        <div className="my-4 flex items-baseline gap-2">
          <span className="text-3xl font-black text-gold">{item.stat}</span>
          <span className="text-sm text-slate-400">{item.statLabel}</span>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-slate-300">{item.description}</p>
        <div className="inline-block rounded-full border border-tech/20 bg-tech/5 px-3 py-1 text-xs font-medium text-tech">
          {item.highlight}
        </div>
      </div>
    </motion.div>
  )
}

export function IndustryGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {industryCases.map((item, index) => (
        <IndustryCard key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}

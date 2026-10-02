import { motion } from 'framer-motion'
import {
  Bot,
  BrainCircuit,
  Eye,
  GitBranch,
  MessageSquareText,
  Network,
} from 'lucide-react'
import { techStack } from '../data/content'

const iconMap: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit className="h-8 w-8 text-tech" />,
  Eye: <Eye className="h-8 w-8 text-tech" />,
  MessageSquareText: <MessageSquareText className="h-8 w-8 text-tech" />,
  GitBranch: <GitBranch className="h-8 w-8 text-tech" />,
  Bot: <Bot className="h-8 w-8 text-tech" />,
  Network: <Network className="h-8 w-8 text-tech" />,
}

export function TechStack() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {techStack.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          whileHover={{ y: -5, borderColor: 'rgba(0,224,255,0.4)' }}
          className="glass-card flex items-start gap-4 p-5 transition-colors"
        >
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-tech/10 ring-1 ring-tech/20">
            {iconMap[item.icon]}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

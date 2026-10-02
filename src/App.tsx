import { BrainCircuit, Network, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
import { conceptCards, radarData, stats } from './data/content'
import { FlowDiagram } from './components/FlowDiagram'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { IndustryGrid } from './components/IndustryGrid'
import { LineChart } from './components/LineChart'
import { Navigation } from './components/Navigation'
import { RadarChart } from './components/RadarChart'
import { Section, SectionHeader } from './components/Section'
import { StatCounter } from './components/StatCounter'
import { Timeline } from './components/Timeline'

const conceptIcons: Record<string, React.ReactNode> = {
  Rocket: <Rocket className="h-8 w-8 text-tech" />,
  BrainCircuit: <BrainCircuit className="h-8 w-8 text-tech" />,
  Network: <Network className="h-8 w-8 text-tech" />,
}

function ConceptCard({ card, index }: { card: typeof conceptCards[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="glass-card p-8 transition-all hover:-translate-y-1 hover:border-tech/30"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-tech/10 ring-1 ring-tech/20">
        {conceptIcons[card.icon]}
      </div>
      <h3 className="mb-3 text-2xl font-bold text-white">{card.title}</h3>
      <p className="leading-relaxed text-slate-300">{card.body}</p>
    </motion.div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-deep-900">
      <Navigation />
      <Hero />

      <Section id="concept" gradient>
        <SectionHeader
          eyebrow="概念阐释"
          title="什么是新质生产力？"
          description="新质生产力以科技创新为核心驱动力，而人工智能正是其最具代表性的技术引擎。"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {conceptCards.map((card, i) => (
            <ConceptCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </Section>

      <Section id="stats">
        <SectionHeader
          eyebrow="核心数据"
          title="人工智能发展的关键指标"
          description="一组核心数据，呈现人工智能从产业规模到经济影响的快速增长。"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} />
          ))}
        </div>
      </Section>

      <Section id="trend" gradient>
        <SectionHeader
          eyebrow="增长趋势"
          title="全球与中国 AI 市场规模趋势"
          description="2018–2030 年，全球与中国人工智能市场持续高速增长，中国占比不断提升。"
        />
        <LineChart />
      </Section>

      <Section id="industry">
        <SectionHeader
          eyebrow="赋能百业"
          title="人工智能重塑千行百业"
          description="从智能制造到智慧金融，AI 正在以不同方式提升效率、降低成本、创造新价值。"
        />
        <IndustryGrid />
      </Section>

      <Section id="flow" gradient>
        <SectionHeader
          eyebrow="跃迁路径"
          title="从数据要素到新质生产力"
          description="人工智能驱动的生产力跃升，是一个由数据、算力、算法到产业应用的系统工程。"
        />
        <FlowDiagram />
      </Section>

      <Section id="innovation">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-3 inline-block rounded-full border border-gold/30 bg-gold-soft px-4 py-1 text-sm font-medium text-gold">
              创新驱动指数
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              AI 驱动的<br className="hidden md:block" />
              <span className="text-gold">多维创新价值</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              人工智能不仅在技术创新上表现突出，更在效率提升、产业融合、绿色低碳等方面展现出全方位价值，成为推动新质生产力形成的关键变量。
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {radarData.indicators.map((ind, i) => (
                <div key={ind.name} className="glass-card p-4">
                  <div className="text-2xl font-black text-tech">{radarData.values[i]}</div>
                  <div className="text-sm text-slate-400">{ind.name}</div>
                </div>
              ))}
            </div>
          </div>
          <RadarChart />
        </div>
      </Section>

      <Section id="future" gradient>
        <SectionHeader
          eyebrow="未来展望"
          title="迈向 2035 的发展蓝图"
          description="从当前的大模型应用到新质生产力全面形成，人工智能将引领一场深刻的社会生产力变革。"
        />
        <Timeline />
      </Section>

      <Footer />
    </div>
  )
}

export default App

import { motion } from 'framer-motion'

export function HeroVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute h-[600px] w-[600px] rounded-full bg-tech/10 blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute h-[500px] w-[500px] translate-x-32 translate-y-20 rounded-full bg-gold/10 blur-[100px]"
      />

      {/* Central AI core SVG */}
      <svg
        viewBox="0 0 400 400"
        className="absolute h-[480px] w-[480px] opacity-20 md:h-[560px] md:w-[560px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E0FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00E0FF" stopOpacity="0" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Orbit rings */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '200px 200px' }}
        >
          <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(0,224,255,0.12)" strokeWidth="1" />
          <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(245,197,66,0.1)" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(0,224,255,0.15)" strokeWidth="1" />
        </motion.g>

        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '200px 200px' }}
        >
          <circle cx="200" cy="200" r="70" fill="none" stroke="rgba(0,224,255,0.25)" strokeWidth="2" strokeDasharray="8 8" />
        </motion.g>

        {/* Central core */}
        <circle cx="200" cy="200" r="40" fill="url(#coreGlow)" />
        <circle cx="200" cy="200" r="16" fill="#00E0FF" filter="url(#glow)" />

        {/* Orbital nodes */}
        {[
          { cx: 200, cy: 40 }, { cx: 360, cy: 200 }, { cx: 200, cy: 360 }, { cx: 40, cy: 200 },
          { cx: 315, cy: 85 }, { cx: 315, cy: 315 }, { cx: 85, cy: 315 }, { cx: 85, cy: 85 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx} cy={p.cy} r="5"
            fill={i % 2 === 0 ? '#00E0FF' : '#F5C542'}
            filter="url(#glow)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Connection lines */}
        <g stroke="rgba(0,224,255,0.12)" strokeWidth="1">
          <line x1="200" y1="40" x2="360" y2="200" />
          <line x1="360" y1="200" x2="200" y2="360" />
          <line x1="200" y1="360" x2="40" y2="200" />
          <line x1="40" y1="200" x2="200" y2="40" />
          <line x1="315" y1="85" x2="315" y2="315" />
          <line x1="315" y1="315" x2="85" y2="315" />
          <line x1="85" y1="315" x2="85" y2="85" />
          <line x1="85" y1="85" x2="315" y2="85" />
        </g>
      </svg>
    </div>
  )
}

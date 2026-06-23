import { motion } from 'framer-motion'

const STORY = [
  {
    label: 'The Question',
    text: 'Every complex system begins with a single question: "How does this actually work?" That curiosity drove me to tear things apart long before I knew how to put them back together.',
  },
  {
    label: 'The Pull',
    text: 'Electronics wasn\'t chosen — it chose me. The moment I saw logic gates produce predictable behavior from chaos, I was hooked on the idea of engineering determinism.',
  },
  {
    label: 'The Stack',
    text: 'From signal theory to neural networks, I\'m building a mental stack that goes all the way from silicon physics to intelligent systems — each layer reinforcing the next.',
  },
]

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
}
const itemV = {
  hidden: { opacity: 0, x: -30 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.7, ease: [0.16,1,0.3,1] } },
}

export default function Layer01Curiosity() {
  return (
    <section id="layer01" className="min-h-screen flex items-center py-32 px-8 md:px-16 lg:px-24 bg-[#050810] relative overflow-hidden">

      {/* Background blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#E8A020 1px,transparent 1px),linear-gradient(90deg,#E8A020 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Diagonal accent line */}
      <div
        className="absolute top-0 right-[20%] w-px h-full opacity-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #E8A020 40%, transparent)' }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Layer badge */}
        <div className="flex items-center gap-4 mb-14">
          <span
            className="font-mono text-[10px] tracking-[0.4em] uppercase px-3 py-1 rounded-full border"
            style={{ borderColor: 'rgba(232,160,32,0.3)', color: '#E8A020', background: 'rgba(232,160,32,0.06)' }}
          >
            Layer 01
          </span>
          <div className="h-px flex-1 max-w-[60px]" style={{ background: '#E8A020', opacity: 0.3 }} />
          <span className="font-mono text-xs text-[#6B7280] uppercase tracking-widest">Curiosity</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">

          {/* LEFT: headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          >
            <h2
              className="font-bold leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(2.8rem,6vw,5rem)', color: '#F0F4F8' }}
            >
              Born from<br />
              <span style={{ WebkitTextStroke: '1px #E8A020', color: 'transparent' }}>
                Questions.
              </span>
            </h2>
            <p className="text-[#6B7280] text-base leading-7 max-w-sm">
              ECE student at NSUT. Building at the intersection of physics, logic, and intelligence.
            </p>

            {/* Stat blocks */}
            <div className="flex gap-8 mt-10">
              {[['ECE', 'NSUT Delhi'], ['ML + DSA', 'Primary Focus'], ['VLSI', 'Next Horizon']].map(([v, l]) => (
                <div key={v}>
                  <p className="font-mono text-lg font-semibold" style={{ color: '#E8A020' }}>{v}</p>
                  <p className="text-[#6B7280] text-xs mt-1">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: story nodes */}
          <motion.ul
            variants={containerV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-8"
          >
            {STORY.map(({ label, text }) => (
              <motion.li
                key={label}
                variants={itemV}
                className="flex gap-5"
              >
                {/* Connector */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: '#E8A020', boxShadow: '0 0 8px #E8A020' }}
                  />
                  <div className="w-px flex-1" style={{ background: 'rgba(232,160,32,0.2)' }} />
                </div>
                {/* Text */}
                <div className="pb-2">
                  <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: '#E8A020' }}>
                    {label}
                  </p>
                  <p className="text-[#94A3B8] text-sm leading-6">{text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

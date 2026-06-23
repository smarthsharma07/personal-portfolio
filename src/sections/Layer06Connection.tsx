import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Mail, BookOpen, UserRound } from 'lucide-react'

const LINKS = [
  {
    id:    'github',
    label: 'GitHub',
    sub:   'smarthsharma07',
    icon:  Code2,
    url:   'https://github.com/smarthsharma07',
    color: '#E8A020',
    pulse: 'rgba(232,160,32,0.25)',
  },
  {
    id:    'linkedin',
    label: 'LinkedIn',
    sub:   'Connect',
    icon:  UserRound,
    url:   'https://linkedin.com/',
    color: '#00FFD4',
    pulse: 'rgba(0,255,212,0.25)',
  },
  {
    id:    'kaggle',
    label: 'Kaggle',
    sub:   'Competitions',
    icon:  BookOpen,
    url:   'https://kaggle.com/',
    color: '#E8A020',
    pulse: 'rgba(232,160,32,0.25)',
  },
  {
    id:    'email',
    label: 'Email',
    sub:   'smarthsharmasharma\n@gmail.com',
    icon:  Mail,
    url:   'mailto:smarthsharmasharma@gmail.com',
    color: '#00FFD4',
    pulse: 'rgba(0,255,212,0.25)',
  },
]

// Tiny "chip IO port" visual that pulses when a connection is active
function IOPort({ active, color }: { active: boolean; color: string }) {
  return (
    <div className="relative w-3 h-3">
      <div
        className="w-full h-full rounded-full transition-all duration-300"
        style={{
          background: active ? color : 'rgba(255,255,255,0.08)',
          boxShadow:  active ? `0 0 12px ${color}` : 'none',
        }}
      />
      {active && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${color}` }}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </div>
  )
}

export default function Layer06Connection() {
  const [active, setActive] = useState<string | null>(null)
  const activeLink = LINKS.find(l => l.id === active)

  return (
    <section
      id="layer06"
      className="min-h-screen flex flex-col items-center justify-center py-32 px-8 bg-[#050810] relative overflow-hidden"
    >
      {/* Divider top */}
      <div
        className="absolute top-0 left-8 right-8 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(232,160,32,0.2), transparent)' }}
      />

      {/* Subtle radial bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,160,32,0.03) 0%, transparent 70%)' }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <span
            className="font-mono text-[10px] tracking-[0.4em] uppercase px-3 py-1 rounded-full border"
            style={{ borderColor: 'rgba(232,160,32,0.3)', color: '#E8A020', background: 'rgba(232,160,32,0.06)' }}
          >
            Layer 06
          </span>
          <div className="h-px w-12" style={{ background: '#E8A020', opacity: 0.3 }} />
          <span className="font-mono text-xs text-[#6B7280] uppercase tracking-widest">Connection</span>
        </div>

        <h2
          className="font-bold leading-[0.92] mb-4"
          style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)', color: '#F0F4F8' }}
        >
          I/O&nbsp;
          <span style={{ WebkitTextStroke: '1.5px #E8A020', color: 'transparent' }}>Panel.</span>
        </h2>
        <p className="text-[#6B7280] text-sm max-w-xs mx-auto">
          All signal lines open. Route a connection below.
        </p>
      </motion.div>

      {/* Chip IO panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full max-w-3xl"
      >
        {/* Trace lines top */}
        <div className="flex justify-around mb-0 px-16 pointer-events-none">
          {LINKS.map(l => (
            <div
              key={l.id}
              className="w-px transition-all duration-500"
              style={{
                height: 40,
                background: active === l.id
                  ? `linear-gradient(to bottom, transparent, ${l.color})`
                  : 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08))',
              }}
            />
          ))}
        </div>

        {/* Main card */}
        <div
          className="rounded-2xl p-8 relative"
          style={{ background: 'rgba(10,15,26,0.8)', border: '1px solid rgba(232,160,32,0.12)' }}
        >
          {/* Blueprint grid inside */}
          <div
            className="absolute inset-0 rounded-2xl opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(#E8A020 1px,transparent 1px),linear-gradient(90deg,#E8A020 1px,transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* IO Ports row */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {LINKS.map(l => {
              const Icon    = l.icon
              const isActive = active === l.id
              return (
                <a
                  key={l.id}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActive(l.id)}
                  onMouseLeave={() => setActive(null)}
                  className="group flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-300"
                  style={{
                    background:  isActive ? `${l.color}0d` : 'rgba(255,255,255,0.02)',
                    border:      `1px solid ${isActive ? l.color + '40' : 'rgba(255,255,255,0.06)'}`,
                    boxShadow:   isActive ? `0 0 30px ${l.pulse}` : 'none',
                  }}
                >
                  <IOPort active={isActive} color={l.color} />
                  <Icon
                    size={24}
                    style={{ color: isActive ? l.color : '#6B7280', transition: 'color 0.3s' }}
                  />
                  <div className="text-center">
                    <p className="font-mono text-xs font-semibold" style={{ color: isActive ? l.color : '#F0F4F8' }}>
                      {l.label}
                    </p>
                    <p className="font-mono text-[9px] text-[#6B7280] mt-0.5 break-all leading-3">{l.sub}</p>
                  </div>
                </a>
              )
            })}
          </div>

          {/* Status display */}
          <div
            className="relative z-10 mt-6 px-5 py-3 rounded-lg flex items-center justify-center gap-3 h-12"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2 font-mono text-xs"
                  style={{ color: activeLink?.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: activeLink?.color }} />
                  Connection Established — {activeLink?.label}
                </motion.div>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-xs text-[#6B7280]/40"
                >
                  Awaiting input signal...
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Trace lines bottom */}
        <div className="flex justify-around px-16 pointer-events-none">
          {LINKS.map(l => (
            <div
              key={l.id}
              className="w-px transition-all duration-500"
              style={{
                height: 40,
                background: active === l.id
                  ? `linear-gradient(to top, transparent, ${l.color})`
                  : 'linear-gradient(to top, transparent, rgba(255,255,255,0.08))',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Hidden transistor easter egg — tiny dot in corner */}
      <div
        className="absolute bottom-8 right-8 w-3 h-3 cursor-crosshair group z-20"
        title=""
      >
        <div className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-[#00FFD4] group-hover:shadow-[0_0_8px_#00FFD4] transition-all mx-auto mt-1" />
        <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap font-mono text-[10px] text-[#00FFD4] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none px-2 py-1 rounded"
          style={{ background:'rgba(0,255,212,0.08)', border:'1px solid rgba(0,255,212,0.2)' }}>
          Silicon Explorer Unlocked
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-16 text-center">
        <p className="font-mono text-[10px] text-[#6B7280]/40 tracking-widest uppercase">
          Silicon Odyssey · Smarth Sharma · NSUT ECE · 2026
        </p>
      </div>
    </section>
  )
}

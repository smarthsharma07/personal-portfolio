import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const GOALS = [
  { id: 'rtl',   label: 'RTL Design',             status: 'learning',       desc: 'Verilog / SystemVerilog, combinational and sequential logic design.' },
  { id: 'dd',    label: 'Digital Design',          status: 'learning',       desc: 'Finite state machines, arithmetic circuits, timing analysis.' },
  { id: 'vlsi',  label: 'VLSI',                    status: 'queued',         desc: 'CMOS layout, standard cells, place & route fundamentals.' },
  { id: 'semi',  label: 'Semiconductor Eng.',      status: 'queued',         desc: 'Device physics, fabrication processes, process technology nodes.' },
  { id: 'sys',   label: 'SoC Architecture',        status: 'fabricating',    desc: 'System-on-chip design, bus protocols, IP integration.' },
]

const STATUS_STYLES: Record<string, { border: string; text: string; label: string }> = {
  learning:    { border: 'rgba(232,160,32,0.4)',  text: '#E8A020', label: 'IN PROGRESS' },
  queued:      { border: 'rgba(255,255,255,0.1)', text: '#6B7280', label: 'QUEUED' },
  fabricating: { border: 'rgba(0,255,212,0.3)',   text: '#00FFD4', label: 'FABRICATING' },
}

export default function Layer05Future() {
  const [missionLaunched, setMissionLaunched] = useState(false)

  return (
    <section id="layer05" className="min-h-screen flex items-center py-32 px-8 md:px-16 lg:px-24 bg-[#050810] relative overflow-hidden">

      {/* Blueprint diagonals */}
      {[15, 45, 75].map(deg => (
        <div key={deg}
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: `repeating-linear-gradient(${deg}deg, #E8A020 0, #E8A020 1px, transparent 0, transparent 50%)`, backgroundSize:'40px 40px' }}
        />
      ))}

      {/* Secret moon — Mission NVIDIA easter egg */}
      <div
        className="absolute top-12 right-16 cursor-pointer z-20 group"
        onClick={() => setMissionLaunched(true)}
        title="?"
      >
        <div className="w-4 h-4 rounded-full opacity-10 group-hover:opacity-40 transition-opacity"
          style={{ background:'radial-gradient(circle at 35% 35%, #ffffff, #94A3B8)' }} />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase px-3 py-1 rounded-full border"
            style={{ borderColor:'rgba(255,255,255,0.15)', color:'#6B7280', background:'rgba(255,255,255,0.03)' }}>
            Layer 05
          </span>
          <div className="h-px w-12 bg-white/10" />
          <span className="font-mono text-xs text-[#6B7280] uppercase tracking-widest">Future</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          {/* LEFT: headline */}
          <div>
            <motion.h2
              initial={{ opacity:0, y:30 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.8 }}
              className="font-bold leading-[0.92] mb-6"
              style={{ fontSize:'clamp(2.8rem,5.5vw,4.5rem)', color:'#F0F4F8' }}
            >
              Still<br />
              <span style={{ WebkitTextStroke:'1px rgba(255,255,255,0.3)', color:'transparent' }}>Under</span><br />
              Fabrication.
            </motion.h2>
            <p className="text-[#6B7280] text-sm leading-7 max-w-xs">
              The deepest layers are being etched. These are the frontiers I'm moving toward — where silicon meets system design.
            </p>
            <div className="mt-8 px-4 py-3 rounded-lg inline-flex items-center gap-3"
              style={{ background:'rgba(232,160,32,0.06)', border:'1px solid rgba(232,160,32,0.15)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background:'#E8A020' }} />
              <span className="font-mono text-xs" style={{ color:'#E8A020' }}>Currently under fabrication</span>
            </div>
          </div>

          {/* RIGHT: goal cards */}
          <div className="space-y-3">
            {GOALS.map((g, i) => {
              const st = STATUS_STYLES[g.status]
              return (
                <motion.div
                  key={g.id}
                  initial={{ opacity:0, x:30 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.6, delay: i * 0.08 }}
                  className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ background:'rgba(255,255,255,0.02)', border:`1px solid ${st.border}`,
                    borderStyle: g.status === 'queued' ? 'dashed' : 'solid' }}
                >
                  {/* Status dot */}
                  <div className="mt-1 w-2 h-2 rounded-full shrink-0"
                    style={{ background: st.text, opacity: g.status === 'queued' ? 0.3 : 1 }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-[#F0F4F8] text-sm font-medium">{g.label}</p>
                      <span className="font-mono text-[9px] tracking-widest px-1.5 py-0.5 rounded"
                        style={{ background:`${st.text}14`, color: st.text }}>
                        {st.label}
                      </span>
                    </div>
                    <p className="text-[#6B7280] text-xs leading-5">{g.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mission easter egg animation */}
      <AnimatePresence>
        {missionLaunched && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          >
            <motion.div
              initial={{ y: 200, opacity:0 }}
              animate={{ y: -200, opacity:[0,1,1,0] }}
              transition={{ duration: 3.5, ease:'easeIn' }}
              onAnimationComplete={() => setMissionLaunched(false)}
              className="flex flex-col items-center gap-6"
            >
              <div className="text-6xl">🚀</div>
              <div className="text-center font-mono p-6 rounded-xl"
                style={{ background:'rgba(5,8,16,0.9)', border:'1px solid rgba(232,160,32,0.4)' }}>
                <p className="text-[#6B7280] text-xs mb-1 tracking-widest uppercase">Mission Status</p>
                <p className="text-[#E8A020] text-sm font-bold">Target Acquired:</p>
                <p className="text-[#F0F4F8] text-xs mt-1">Future RTL/VLSI Engineer</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

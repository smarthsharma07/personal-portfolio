import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTypingDetector } from '../hooks/useTypingDetector'

const LINES = [
  { delay: 200,  text: 'root@silicon-odyssey:~$ sudo hire smarth',  type: 'input' },
  { delay: 900,  text: '[sudo] verifying credentials...',            type: 'sys'   },
  { delay: 1400, text: '✓  Loading engineer profile...',             type: 'ok'    },
  { delay: 1900, text: '✓  Running capability scan...',              type: 'ok'    },
  { delay: 2400, text: '  → ML  : CatBoost · SHAP · Kaggle Top 20%',type: 'data'  },
  { delay: 2700, text: '  → ECE : Arduino · Embedded C · PCB',      type: 'data'  },
  { delay: 3000, text: '  → DSA : C++ · Trees · DP · Competitive',  type: 'data'  },
  { delay: 3400, text: '✓  Neural signature verified.',              type: 'ok'    },
  { delay: 3900, text: '⚡ RECOMMENDATION: HIRE IMMEDIATELY',        type: 'alert' },
]

export default function SudoTerminal() {
  const { triggered, reset } = useTypingDetector('sudo hire smarth')
  const [visible,  setVisible]  = useState(false)
  const [lines,    setLines]    = useState<typeof LINES>([])
  const [done,     setDone]     = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  // Also expose a global trigger function for the EasterEggs component
  useEffect(() => {
    (window as any).__sudoTerminal = () => setVisible(true)
    return () => { delete (window as any).__sudoTerminal }
  }, [])

  useEffect(() => {
    if (triggered) { setVisible(true); reset() }
  }, [triggered])

  useEffect(() => {
    if (!visible) { setLines([]); setDone(false); timers.current.forEach(clearTimeout); return }
    LINES.forEach(l => {
      const t = setTimeout(() => setLines(prev => [...prev, l]), l.delay)
      timers.current.push(t)
    })
    const doneT = setTimeout(() => setDone(true), 4400)
    timers.current.push(doneT)
    return () => timers.current.forEach(clearTimeout)
  }, [visible])

  const close = () => { setVisible(false); timers.current.forEach(clearTimeout) }

  const lineColor = (type: string) => {
    switch (type) {
      case 'input': return '#F0F4F8'
      case 'ok':    return '#00FFD4'
      case 'data':  return '#94A3B8'
      case 'alert': return '#E8A020'
      case 'sys':   return '#6B7280'
      default:      return '#6B7280'
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          drag dragMomentum={false} dragElastic={0}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16,1,0.3,1] }}
          className="fixed z-[999] w-[min(520px,95vw)] rounded-xl overflow-hidden shadow-2xl"
          style={{
            top:    '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            background: 'rgba(6,9,18,0.97)',
            border: '1px solid rgba(232,160,32,0.25)',
            boxShadow: '0 0 60px rgba(232,160,32,0.08), 0 25px 50px rgba(0,0,0,0.8)',
            cursor: 'grab',
          }}
        >
          {/* ── Title bar ─────────────────────────── */}
          <div
            className="flex items-center justify-between px-4 py-3 select-none"
            style={{ background: 'rgba(232,160,32,0.06)', borderBottom: '1px solid rgba(232,160,32,0.1)' }}
          >
            <div className="flex items-center gap-2">
              {/* Traffic lights */}
              {['#FF5F57','#FEBC2E','#28C840'].map(c => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <span className="font-mono text-[10px] text-[#6B7280] tracking-widest select-none">
              silicon-odyssey — bash — 80×24
            </span>
            <button onClick={close}
              className="font-mono text-[10px] text-[#6B7280] hover:text-[#F0F4F8] transition-colors px-2 py-0.5 rounded"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              esc
            </button>
          </div>

          {/* ── Terminal body ──────────────────────── */}
          <div className="p-5 font-mono text-xs leading-6 min-h-[220px]">
            <AnimatePresence mode="popLayout">
              {lines.map((l, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ color: lineColor(l.type) }}
                >
                  {l.type === 'alert'
                    ? <span style={{ background:'rgba(232,160,32,0.12)', padding:'2px 6px', borderRadius:'4px' }}>{l.text}</span>
                    : l.text
                  }
                </motion.p>
              ))}
            </AnimatePresence>

            {/* Blinking cursor */}
            {!done && (
              <span className="inline-block w-2 h-3.5 align-middle" style={{ background:'#E8A020', animation:'blink 1s step-end infinite' }} />
            )}
          </div>

          {/* ── Actions — only after sequence completes ─── */}
          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
                className="px-5 pb-5 flex flex-wrap gap-3"
              >
                <a href="https://github.com/smarthsharma07" target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center font-mono text-[10px] py-2 px-4 rounded-lg transition-all duration-200"
                  style={{ background:'rgba(232,160,32,0.1)', border:'1px solid rgba(232,160,32,0.3)', color:'#E8A020' }}>
                  ↗ GitHub
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-center font-mono text-[10px] py-2 px-4 rounded-lg transition-all duration-200"
                  style={{ background:'rgba(0,255,212,0.08)', border:'1px solid rgba(0,255,212,0.25)', color:'#00FFD4' }}>
                  ↗ LinkedIn
                </a>
                <a href="mailto:smarthsharmasharma@gmail.com"
                  className="flex-1 text-center font-mono text-[10px] py-2 px-4 rounded-lg transition-all duration-200"
                  style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.1)', color:'#6B7280' }}>
                  ✉ Email
                </a>
                <button onClick={close}
                  className="w-full font-mono text-[9px] text-[#6B7280]/40 hover:text-[#6B7280] transition-colors mt-1">
                  exit 0
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

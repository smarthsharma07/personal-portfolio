import { useEffect, useState, useRef } from 'react'

// WebAudio-generated ambient space drone
// No audio file needed — pure synthesis
export default function AudioToggle() {
  const [active, setActive] = useState(true)
  const [ctx, setCtx]       = useState<AudioContext | null>(null)
  const [masterGain, setMasterGain] = useState<GainNode | null>(null)
  const startedRef = useRef(false)

  const start = () => {
    if (startedRef.current) return
    startedRef.current = true
    
    const audioCtx = new AudioContext()

    // Sub-bass drone (55 Hz - more audible on laptops)
    const osc1 = audioCtx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 55

    // First harmonic (110 Hz)
    const osc2 = audioCtx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 110

    // High harmonic whisper (220 Hz)
    const osc3 = audioCtx.createOscillator()
    osc3.type = 'sine'
    osc3.frequency.value = 220

    // LFO — slow breath-like modulation on pitch
    const lfo = audioCtx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.08

    const lfoGain = audioCtx.createGain()
    lfoGain.gain.value = 2.0
    lfo.connect(lfoGain)
    lfoGain.connect(osc1.frequency)
    lfoGain.connect(osc2.frequency)

    // Low-pass filter to keep it dark but audible
    const filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 600
    filter.Q.value = 1.0

    // Master gain — fade in
    const gain = audioCtx.createGain()
    gain.gain.value = 0
    gain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 2.5)

    // Gain per oscillator
    const g1 = audioCtx.createGain(); g1.gain.value = 1.0
    const g2 = audioCtx.createGain(); g2.gain.value = 0.6
    const g3 = audioCtx.createGain(); g3.gain.value = 0.2

    osc1.connect(g1); g1.connect(filter)
    osc2.connect(g2); g2.connect(filter)
    osc3.connect(g3); g3.connect(filter)
    filter.connect(gain)
    gain.connect(audioCtx.destination)

    osc1.start(); osc2.start(); osc3.start(); lfo.start()

    setCtx(audioCtx)
    setMasterGain(gain)
  }

  const stop = () => {
    if (!masterGain || !ctx) return
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2)
    setTimeout(() => {
      ctx.close()
      setCtx(null)
      setMasterGain(null)
      startedRef.current = false
    }, 1300)
  }

  const toggle = () => {
    if (active) { stop() } else { start() }
    setActive(a => !a)
  }

  // Start on first user interaction if active is true
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (active && !startedRef.current) {
        start()
      }
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('keydown', handleFirstInteraction)
    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
      ctx?.close()
    }
  }, [active])

  return (
    <button
      onClick={toggle}
      title={active ? 'Disable ambient audio' : 'Enable ambient audio'}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 group"
      style={{
        background:   active ? 'rgba(232,160,32,0.08)' : 'rgba(10,15,26,0.7)',
        border:       `1px solid ${active ? 'rgba(232,160,32,0.3)' : 'rgba(255,255,255,0.08)'}`,
        backdropFilter: 'blur(10px)',
        boxShadow:    active ? '0 0 20px rgba(232,160,32,0.1)' : 'none',
      }}
    >
      {/* Animated waveform icon */}
      <div className="flex items-center gap-[2px] h-4">
        {[0.4, 0.9, 0.6, 1.0, 0.5].map((h, i) => (
          <div
            key={i}
            className="w-[2px] rounded-full transition-colors"
            style={{
              height: `${h * 100}%`,
              background: active ? '#E8A020' : '#6B7280',
              animation: active ? `audioBar ${0.5 + i * 0.15}s ease-in-out infinite alternate` : 'none',
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] tracking-wider" style={{ color: active ? '#E8A020' : '#6B7280' }}>
        {active ? 'AUDIO ON' : 'AUDIO'}
      </span>
    </button>
  )
}

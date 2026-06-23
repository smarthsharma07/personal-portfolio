import { useEffect } from 'react'
import Navigation from './components/Navigation'
import CustomCursor from './components/CustomCursor'
import ChipDieMap from './components/ChipDieMap'
import AudioToggle from './components/AudioToggle'
import SudoTerminal from './components/SudoTerminal'
import EasterEggs from './components/EasterEggs'
import Hero from './sections/Hero'
import Layer01Curiosity from './sections/Layer01Curiosity'
import Layer02Logic from './sections/Layer02Logic'
import Layer03Intelligence from './sections/Layer03Intelligence'
import Layer04Systems from './sections/Layer04Systems'
import Layer05Future from './sections/Layer05Future'
import Layer06Connection from './sections/Layer06Connection'
import { useKonamiCode } from './hooks/useKonamiCode'
import { useSecretCommand } from './hooks/useSecretCommand'
import { useIsMobile } from './hooks/useIsMobile'

function App() {
  const isCrtMode   = useKonamiCode()
  const isRecruiter = useSecretCommand()
  const isMobile    = useIsMobile()

  useEffect(() => {
    document.body.classList.toggle('crt-mode', isCrtMode)
  }, [isCrtMode])

  return (
    <div
      className="relative min-h-screen bg-[#050810] text-[#F0F4F8] overflow-x-hidden"
      style={{ cursor: isMobile ? 'auto' : 'none' }}
    >
      {/* Desktop-only UI chrome */}
      {!isMobile && <CustomCursor />}
      {!isMobile && <ChipDieMap />}

      <Navigation />
      <AudioToggle />
      <SudoTerminal />
      <EasterEggs isRecruiterMode={isRecruiter} />

      <main>
        <Hero />
        <Layer01Curiosity />
        <Layer02Logic />
        <Layer03Intelligence />
        <Layer04Systems />
        <Layer05Future />
        <Layer06Connection />
      </main>
    </div>
  )
}

export default App

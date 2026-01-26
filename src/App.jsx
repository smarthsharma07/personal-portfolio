import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import SystemShell from './components/Layout/SystemShell'
import BootSequence from './components/BootSequence'

import SystemModule from './modules/SystemModule'
import HardwareModule from './modules/HardwareModule'
import MLModule from './modules/MLModule'
import SoftwareModule from './modules/SoftwareModule'
import GamesModule from './modules/GamesModule'

function App() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="app-root">
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      {booted && (
        <Routes>
          <Route path="/" element={<SystemShell />}>
            <Route index element={<SystemModule />} />
            <Route path="hardware" element={<HardwareModule />} />
            <Route path="ml" element={<MLModule />} />
            <Route path="software" element={<SoftwareModule />} />
            <Route path="games" element={<GamesModule />} />
          </Route>
        </Routes>
      )}
    </div>
  )
}

export default App

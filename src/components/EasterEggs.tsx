import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Download } from 'lucide-react';

interface EasterEggsProps {
  isRecruiterMode: boolean;
}

export default function EasterEggs({ isRecruiterMode }: EasterEggsProps) {
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    if (isRecruiterMode) {
      setShowTerminal(true);
      
      // Simulate download sequence
      const timer = setTimeout(() => {
        setShowTerminal(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isRecruiterMode]);

  return (
    <AnimatePresence>
      {showTerminal && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 left-8 right-8 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl z-50 glass-panel p-6 border-accentCyan/30 shadow-[0_0_30px_rgba(0,229,255,0.2)]"
        >
          <div className="flex items-center gap-3 mb-4 text-accentCyan border-b border-white/10 pb-3">
            <Terminal size={20} />
            <h3 className="font-mono text-sm tracking-widest uppercase">System Override</h3>
            <span className="ml-auto text-xs text-textSecondary px-2 py-1 bg-white/5 rounded">Achievement Unlocked: Recruiter Detected</span>
          </div>
          
          <div className="font-mono text-sm space-y-2 text-textSecondary">
            <p className="text-textMain"><span className="text-accentCyan">$</span> sudo hire smarth</p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              [OK] Authenticating recruiter credentials...
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-accentGold"
            >
              [OK] Access granted to secure fabrication layer.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="flex items-center gap-2 text-accentCyan mt-4"
            >
              <Download size={16} className="animate-bounce" />
              <span>Initiating resume download protocol...</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

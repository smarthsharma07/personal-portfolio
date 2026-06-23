import { useState, useEffect } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export function useKonamiCode() {
  const [success, setSuccess] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setSequence((prev) => {
        const nextSequence = [...prev, e.key];
        if (nextSequence.length > KONAMI_CODE.length) {
          nextSequence.shift();
        }
        
        if (nextSequence.join(',') === KONAMI_CODE.join(',')) {
          setSuccess((s) => !s); // Toggle
        }
        return nextSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return success;
}

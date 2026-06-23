import { useState, useEffect } from 'react';

const SECRET_COMMAND = 'sudo hire smarth';

export function useSecretCommand() {
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore modifier keys
      if (e.key.length > 1 && e.key !== 'Backspace') return;

      setInput((prev) => {
        let nextInput = prev;
        if (e.key === 'Backspace') {
          nextInput = prev.slice(0, -1);
        } else {
          nextInput += e.key;
        }

        // Keep only the last N characters
        if (nextInput.length > SECRET_COMMAND.length * 2) {
          nextInput = nextInput.slice(-SECRET_COMMAND.length);
        }

        if (nextInput.endsWith(SECRET_COMMAND)) {
          setSuccess(true);
          return ''; // Reset after success
        }

        return nextInput;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return success;
}

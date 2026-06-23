import { useEffect, useState } from 'react'

export function useTypingDetector(target: string) {
  const [triggered, setTriggered] = useState(false)
  const lower = target.toLowerCase()

  useEffect(() => {
    let buffer = ''
    const handler = (e: KeyboardEvent) => {
      // ignore when user is in an input / textarea / contenteditable
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea' || (e.target as HTMLElement)?.isContentEditable) return

      buffer = (buffer + e.key).toLowerCase().slice(-lower.length)
      if (buffer === lower) {
        setTriggered(true)
        buffer = ''
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lower])

  const reset = () => setTriggered(false)
  return { triggered, reset }
}

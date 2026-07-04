import { useState, useEffect, useRef } from 'react'

export function useTypewriter(text, { speed = 50, startDelay = 500, enabled = false } = {}) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!enabled || !text) return
    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayedText(text.slice(0, indexRef.current + 1))
          indexRef.current++
        } else {
          clearInterval(intervalRef.current)
          setIsComplete(true)
        }
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(timeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, speed, startDelay, enabled])

  useEffect(() => {
    if (enabled) {
      indexRef.current = 0
      setDisplayedText('')
      setIsComplete(false)
    } else {
      setDisplayedText(text || '')
      setIsComplete(true)
    }
  }, [text, enabled])

  return { displayedText: enabled ? displayedText : (text || ''), isComplete }
}

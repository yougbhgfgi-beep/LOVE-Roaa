import { useState, useEffect } from 'react'

export function useTimer(fromDate) {
  const [timeLeft, setTimeLeft] = useState({
    years: 0, days: 0, hours: 0, minutes: 0, seconds: 0,
  })

  const [mode, setMode] = useState('countdown')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const target = fromDate.getTime()
      const isPast = now >= target

      setMode(isPast ? 'countup' : 'countdown')

      const diff = isPast ? now - target : target - now
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({ years, days, hours, minutes, seconds })
    }, 1000)
    return () => clearInterval(interval)
  }, [fromDate])

  return { timeLeft, mode }
}

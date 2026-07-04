import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

const COUNT = 8

export function InteractiveHearts() {
  const [petals, setPetals] = useState([])

  useEffect(() => {
    const items = Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 12,
      duration: 12 + Math.random() * 16,
      delay: Math.random() * -25,
    }))
    setPetals(items)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ direction: 'ltr' }}>
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute text-rose-500/15"
          style={{
            left: `${p.left}%`,
            top: '-5%',
            animation: `petalFall ${p.duration}s ${p.delay}s linear infinite, petalSway ${4 + Math.random() * 3}s ease-in-out infinite`,
          }}
        >
          <Heart size={p.size} />
        </div>
      ))}
    </div>
  )
}

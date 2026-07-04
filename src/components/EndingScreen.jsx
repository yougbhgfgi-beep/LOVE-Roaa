import { useState, useEffect, useMemo } from 'react'
import { Heart, LogOut, Sparkles } from 'lucide-react'
import { InteractiveHearts } from './InteractiveHearts'
import { useTypewriter } from '../hooks/useTypewriter'

function FloatingSparkles() {
  const sparkles = useMemo(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      size: 2 + Math.random() * 4,
      duration: 4 + Math.random() * 4,
    })),
  [])
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-rose-400/40"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animation: `floatUp ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export function EndingScreen({ title, subtitle, message, exitText, onExit }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 450)
    return () => clearTimeout(timeout)
  }, [])

  const { displayedText, isComplete } = useTypewriter(message || '', {
    speed: 22,
    startDelay: 200,
    enabled: visible,
  })

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center p-6 z-50 text-center overflow-y-auto"
      style={{ background: 'linear-gradient(135deg, #0d0508 0%, #1a0a14 30%, #2a0f1e 60%, #0d0508 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(244,63,94,0.08) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(230,50,80,0.05) 0%, transparent 50%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
      <div className="absolute left-0 right-0 top-0 h-12 bg-black/80" />
      <div className="absolute left-0 right-0 bottom-0 h-12 bg-black/80" />

      <InteractiveHearts />
      <FloatingSparkles />

      <div className="max-w-lg mx-auto flex flex-col items-center relative z-10">
        <div className="relative">
          <Heart className="text-rose-500 fill-rose-500 w-14 h-14 animate-ping absolute opacity-40" />
          <Heart className="text-rose-500 fill-rose-500 w-14 h-14 animate-pulse relative z-10" />
        </div>

        <h1 className="mt-8 text-2xl md:text-3xl font-serif text-rose-200 tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          {title}
        </h1>

        <p className="mt-3 text-rose-400/60 max-w-sm font-light text-sm leading-relaxed italic">
          {subtitle}
        </p>

        <div className="mt-8 text-right relative w-full" style={{ minHeight: 140 }}>
          <div className="relative z-10 text-rose-100/90 font-light text-base leading-8 whitespace-pre-wrap text-right" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}>
            <span className="block text-base md:text-lg tracking-wide leading-8" style={{ fontFamily: 'ui-serif, Georgia, serif' }}>
              {displayedText}
            </span>
            {!isComplete && (
              <span className="inline-block mr-1 w-2 h-2 bg-rose-300 rounded-full animate-pulse" />
            )}
          </div>

          {isComplete && (
            <div className="flex justify-center mt-6 gap-1.5">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30 animate-pulse"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onExit}
          className="mt-8 inline-flex items-center gap-3 px-8 py-3 rounded-xl text-sm tracking-wider transition-all duration-500 group bg-gradient-to-b from-[#1f0a12] to-[#0d0508] border border-rose-500/20 hover:border-rose-400/50 text-rose-300 hover:text-rose-200"
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          {exitText}
        </button>

        <span className="mt-8 text-[9px] tracking-widest text-rose-500/25 uppercase">نهاية الحكاية</span>
      </div>
    </div>
  )
}

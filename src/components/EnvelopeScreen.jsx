import { useState, useEffect } from 'react'
import { Heart, Sparkles, Mail, Diamond, Gem } from 'lucide-react'
import { TypewriterText } from './TypewriterText'

function FloatingParticles() {
  const particles = Array.from({ length: 12 })
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-rose-400/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `floatUp ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
            opacity: 0.3 + Math.random() * 0.5,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
          }}
        />
      ))}
    </div>
  )
}

export function EnvelopeScreen({ title, subtitle, buttonText, message, onEnter }) {
  const [opened, setOpened] = useState(false)
  const [sealBroken, setSealBroken] = useState(false)

  useEffect(() => {
    if (opened) {
      const timeout = setTimeout(() => setSealBroken(true), 600)
      return () => clearTimeout(timeout)
    }
  }, [opened])

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" style={{ direction: 'ltr' }}>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="stars-animation" />
      </div>
      <FloatingParticles />

      {/* Unopened envelope */}
      <div
        className={`transition-all duration-1000 transform ${opened ? 'scale-95 opacity-0 pointer-events-none absolute' : 'scale-100'}`}
      >
        <div
          onClick={() => setOpened(true)}
          className="bg-gradient-to-b from-[#0d0508] to-[#16070c] border border-rose-800/40 p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] cursor-pointer hover:shadow-[0_25px_80px_rgba(159,18,57,0.4)] transition-all duration-700 text-center max-w-xs sm:max-w-sm w-full group relative mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/10 to-rose-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
          {/* Wax seal */}
          <div className="absolute -top-4 left-2/4 -translate-x-1/2 group-hover:scale-105 transition-transform duration-500">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-700 to-rose-900 border-2 border-rose-500/40 shadow-lg shadow-rose-950/60 flex items-center justify-center">
                <Heart className="text-rose-300 w-7 h-7 fill-rose-400/30" />
              </div>
              <div className="absolute -inset-1 rounded-full bg-rose-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
          <div className="absolute top-4 right-4 opacity-30">
            <Diamond className="text-rose-400 w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute bottom-4 left-4 opacity-30">
            <Gem className="text-rose-500 w-4 h-4 animate-bounce" />
          </div>
          <div className="mt-10 relative">
            <h3 className="text-xl sm:text-2xl text-rose-300 font-serif font-bold bg-gradient-to-r from-rose-300 to-rose-400 bg-clip-text text-transparent">
              {title}
            </h3>
            <div className="absolute -bottom-2 left-2/4 -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
          </div>
          <p className="mt-4 text-xs sm:text-sm text-rose-400/70 font-light tracking-wide">
            {subtitle}
          </p>
          <div className="mt-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative inline-flex items-center gap-3 text-sm text-rose-300 tracking-wider uppercase border-2 border-rose-500/30 px-6 py-3 rounded-xl bg-gradient-to-b from-rose-900/20 to-rose-950/20 group-hover:from-rose-800/30 group-hover:to-rose-900/30 transition-all duration-500 shadow-lg">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span className="font-medium">افتح</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500/30 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Opened envelope - letter with paper fold effect */}
      <div
        className={`transition-all duration-1000 transform ${opened ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none absolute'} max-w-xs sm:max-w-md w-full mx-auto`}
        style={{ perspective: '1200px' }}
      >
        <div
          className="relative bg-gradient-to-b from-[#0d0508] to-[#16070c] border border-rose-800/40 p-6 sm:p-8 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.9)] text-center overflow-hidden"
          style={{
            transform: sealBroken ? 'rotateY(0deg)' : 'rotateY(-15deg)',
            transformOrigin: 'right center',
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/5 to-rose-800/5" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl" />

          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

          <div className="relative z-10">
            {/* Broken seal pieces */}
            {sealBroken && (
              <div className="absolute -top-3 left-2/4 -translate-x-1/2 flex gap-1 opacity-40">
                <div className="w-3 h-3 bg-rose-700 rounded-full" />
                <div className="w-2 h-3 bg-rose-800 rounded-full" />
                <div className="w-2.5 h-2 bg-rose-700 rounded-full" />
              </div>
            )}

            <div className="flex justify-center mb-4" style={{ direction: 'ltr' }}>
              <div className="relative">
                <Heart className="text-rose-500 fill-rose-500/20 w-12 h-12 animate-bounce" />
                <Sparkles className="absolute -top-1 -right-1 text-rose-400 w-4 h-4 animate-pulse" />
                <Gem className="absolute -bottom-1 -left-1 text-rose-400 w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
            </div>

            <h4 className="text-lg sm:text-xl font-serif text-rose-300 mb-3 font-bold">
              ها قد فتحت رسالتي.. ❤️
            </h4>

            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-rose-400/10 rounded-lg" />
              <div className="relative bg-rose-950/60 border border-rose-800/40 rounded-lg p-6 shadow-inner shadow-rose-950/30">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
                <p className="text-rose-200 leading-relaxed text-right font-light text-base sm:text-lg min-h-[4em]">
                  <TypewriterText text={message} speed={25} startDelay={300} />
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-800/50">
              <p className="text-xs text-rose-500/50 text-center italic">
                كل الحب لأجلك أنتِ
              </p>
            </div>

            <button
              onClick={onEnter}
              className="relative w-full bg-gradient-to-r from-rose-700 via-rose-600 to-rose-500 hover:from-rose-600 hover:via-rose-500 hover:to-rose-400 text-rose-200 py-3 rounded-xl font-medium tracking-wider transition-all duration-500 shadow-xl shadow-rose-950/60 hover:scale-[1.02] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                <span>{buttonText}</span>
                <Heart className="w-5 h-5 fill-white/30 animate-pulse" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

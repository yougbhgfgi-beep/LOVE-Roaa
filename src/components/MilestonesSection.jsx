import { useRef, useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

function useOnScreen(ref, threshold = 0.2) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])

  return isVisible
}

function MilestoneCard({ event, index, isVisible }) {
  const isLeft = index % 2 === 0
  const delay = index * 150

  return (
    <div className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-4 sm:gap-8`}>
      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
        <div
          className={`bg-[#16070c]/80 backdrop-blur-sm border border-rose-800/30 rounded-xl p-4 sm:p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <span className={`text-[10px] text-rose-400/60 font-light ${isLeft ? 'block text-right' : 'block text-left'}`}>
            {event.date}
          </span>
          <h3 className={`text-lg font-serif font-bold text-rose-200 mt-1 ${isLeft ? 'text-right' : 'text-left'}`}>
            {event.label}
          </h3>
          <p className={`text-xs text-rose-300/60 mt-1 font-light ${isLeft ? 'text-right' : 'text-left'}`}>
            {event.description}
          </p>
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        <div
          className={`w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.5)] transition-all duration-700 delay-${index * 200} ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          style={{ transitionDelay: `${delay + 100}ms` }}
        />
        <div className="w-[1px] h-16 sm:h-20 bg-gradient-to-b from-rose-500/30 to-rose-800/20" />
      </div>

      <div className="flex-1" />
    </div>
  )
}

export function MilestonesSection({ title, subtitle, events }) {
  const sectionRef = useRef(null)
  const isVisible = useOnScreen(sectionRef, 0.1)

  return (
    <section ref={sectionRef} className="max-w-4xl mx-auto px-4 sm:px-6 py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center mb-14">
        <Heart className="w-5 h-5 text-rose-500 fill-rose-500/30 mx-auto mb-2 animate-pulse" />
        <span className="text-[10px] text-rose-400 uppercase tracking-[0.3em] block mb-3 font-light">
          {subtitle}
        </span>
        <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide">{title}</h2>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-rose-500/20 via-rose-400/20 to-transparent" />

        {events.map((event, i) => (
          <MilestoneCard key={i} event={event} index={i} isVisible={isVisible} />
        ))}
      </div>
    </section>
  )
}

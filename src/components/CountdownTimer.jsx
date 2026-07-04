import { memo } from 'react'

export const CountdownTimer = memo(function CountdownTimer({ title, subtitle, timeLeft, timerMode }) {
  const isCountup = timerMode === 'countup'

  const mainItems = isCountup
    ? [
        { label: 'سنوات', value: timeLeft.years },
        { label: 'أيام', value: timeLeft.days },
        { label: 'ساعات', value: timeLeft.hours },
        { label: 'دقائق', value: timeLeft.minutes },
      ]
    : [
        { label: 'أيام', value: timeLeft.days },
        { label: 'ساعات', value: timeLeft.hours },
        { label: 'دقائق', value: timeLeft.minutes },
      ]

  const displayTitle = isCountup ? 'منذ يوم فرحنا' : title

  return (
    <section className="w-full max-w-lg mx-auto px-4 py-14 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center mb-8">
        <div className="inline-flex items-center justify-center gap-2 mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-30">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="#f43f5e" stroke="#f43f5e" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span className="text-xs text-rose-400/30 font-light tracking-[0.2em]">2026 . 8 . 7</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-wide text-rose-100/90">{displayTitle}</h2>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3" dir="ltr">
        {mainItems.map((item, i) => (
          <div key={item.label} className="flex items-center gap-2 sm:gap-3">
            <div className="bg-[#16070c]/60 backdrop-blur-sm border border-rose-900/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 min-w-[80px] sm:min-w-[100px] text-center shadow-lg">
              <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-rose-200/90 tabular-nums leading-none">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-rose-400/50 font-light mt-2">
                {item.label}
              </div>
            </div>
            {i < mainItems.length - 1 && (
              <span className="text-rose-500/20 select-none text-xl sm:text-2xl">:</span>
            )}
          </div>
        ))}
        <div className="bg-[#16070c]/60 backdrop-blur-sm border border-rose-900/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 min-w-[80px] sm:min-w-[100px] text-center shadow-lg">
          <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-rose-400/90 animate-pulse tabular-nums leading-none">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm text-rose-500/50 mt-2 flex items-center justify-center gap-1">
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            ثواني
          </div>
        </div>
      </div>
    </section>
  )
})

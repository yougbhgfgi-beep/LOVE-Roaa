import { memo } from 'react'
import { Clock } from 'lucide-react'

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
    <section className="max-w-xs mx-auto px-3 py-10 sm:py-14 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center mb-5">
        <div className="inline-flex items-center justify-center gap-1.5 mb-2">
          <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-30">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="#f43f5e" stroke="#f43f5e" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span className="text-[8px] text-rose-400/30 font-light tracking-[0.2em]">2026 . 8 . 7</span>
        </div>
        <h2 className="text-sm sm:text-base md:text-lg font-serif font-bold tracking-wide text-rose-100/90">{displayTitle}</h2>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-1 sm:gap-1.5" dir="ltr">
        {mainItems.map((item, i) => (
          <div key={item.label} className="flex items-center gap-1 sm:gap-1.5">
            <div className="bg-[#16070c]/60 backdrop-blur-sm border border-rose-900/20 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 min-w-[40px] sm:min-w-[52px] text-center">
              <div className="text-xs sm:text-sm md:text-base font-serif font-bold text-rose-200/90 tabular-nums leading-tight">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[7px] sm:text-[8px] text-rose-400/50 font-light mt-px">
                {item.label}
              </div>
            </div>
            {i < mainItems.length - 1 && (
              <span className="text-rose-500/15 select-none text-[10px]">:</span>
            )}
          </div>
        ))}
        <div className="bg-[#16070c]/60 backdrop-blur-sm border border-rose-900/20 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 min-w-[40px] sm:min-w-[52px] text-center">
          <div className="text-xs sm:text-sm md:text-base font-serif font-bold text-rose-400/90 animate-pulse tabular-nums leading-tight">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-[7px] sm:text-[8px] text-rose-500/50 mt-px flex items-center justify-center gap-0.5">
            <Clock className="w-1.5 h-1.5 sm:w-2 sm:h-2" />
            ثواني
          </div>
        </div>
      </div>
    </section>
  )
})

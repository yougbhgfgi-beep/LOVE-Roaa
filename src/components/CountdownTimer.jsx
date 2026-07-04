import { Clock } from 'lucide-react'

export function CountdownTimer({ title, subtitle, timeLeft, timerMode }) {
  const isCountup = timerMode === 'countup'
  const items = isCountup
    ? [
        { label: 'سنوات', value: timeLeft.years, color: 'text-rose-400', border: 'border-rose-900/30' },
        { label: 'أيام', value: timeLeft.days, color: 'text-rose-300', border: 'border-rose-900/30' },
        { label: 'ساعات', value: timeLeft.hours, color: 'text-rose-200', border: 'border-rose-900/30' },
        { label: 'دقائق', value: timeLeft.minutes, color: 'text-rose-200', border: 'border-rose-900/30' },
      ]
    : [
        { label: 'أيام', value: timeLeft.days, color: 'text-rose-300', border: 'border-rose-900/30' },
        { label: 'ساعات', value: timeLeft.hours, color: 'text-rose-200', border: 'border-rose-900/30' },
        { label: 'دقائق', value: timeLeft.minutes, color: 'text-rose-200', border: 'border-rose-900/30' },
      ]

  const displayTitle = isCountup ? 'منذ يوم فرحنا' : title
  const displaySub = isCountup ? '— من أول يوم في حلمنا —' : subtitle

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center mb-10">
        <svg width="28" height="28" viewBox="0 0 24 24" className="mx-auto mb-1 opacity-50">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="#f43f5e" stroke="#f43f5e" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        <p className="text-[10px] text-rose-400/40 mb-3 font-light tracking-wider">2026 / 8 / 7</p>
        <h2 className="text-xl md:text-2xl font-serif font-bold tracking-wide">{displayTitle}</h2>
      </div>

      <div className={'relative z-10 grid grid-cols-' + (isCountup ? '5' : '4') + ' gap-2 md:gap-3'}>
        {items.map((item) => (
          <div
            key={item.label}
            className={`bg-[#16070c]/70 backdrop-blur-sm border ${item.border} p-2 md:p-3 rounded-xl hover:border-rose-700/30 transition-all duration-300`}
          >
            <div className={`text-lg md:text-2xl font-serif font-bold ${item.color}`}>
              {item.value}
            </div>
            <div className="text-[10px] text-rose-300/70 mt-0.5 font-light">
              {item.label}
            </div>
          </div>
        ))}
        <div className="bg-[#16070c]/70 backdrop-blur-sm border border-rose-900/30 p-2 md:p-3 rounded-xl shadow-inner hover:border-rose-700/50 transition-all duration-300">
          <div className="text-lg md:text-2xl font-serif font-bold text-rose-400 animate-pulse">
            {timeLeft.seconds}
          </div>
          <div className="text-[10px] text-rose-500/70 mt-0.5 flex items-center justify-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            ثواني
          </div>
        </div>
      </div>
    </section>
  )
}

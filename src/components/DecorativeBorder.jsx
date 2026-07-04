export function DecorativeBorder() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {/* Left dots */}
      <svg className="absolute left-0 top-0 h-full w-20" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gL" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.00)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.00)" />
          </linearGradient>
        </defs>
        {Array.from({ length: 10 }).map((_, i) => (
          <circle key={i} cx="12" cy={10 + i * 9} r="1.2" fill="rgba(var(--accent-rgb),0.14)" />
        ))}
      </svg>

      {/* Right dots */}
      <svg className="absolute right-0 top-0 h-full w-20 stroke-[rgba(255,255,255,0.06)]" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 10 }).map((_, i) => (
          <circle key={i} cx="88" cy={10 + i * 9} r="1.2" fill="rgba(var(--accent-rgb),0.14)" />
        ))}
      </svg>

      {/* Top wave */}
      <svg className="absolute left-0 right-0 top-0 h-12 w-full" viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gTop" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(var(--accent-rgb),0.14)" />
            <stop offset="50%" stopColor="rgba(var(--accent-rgb),0.22)" />
            <stop offset="100%" stopColor="rgba(var(--accent-rgb),0.14)" />
          </linearGradient>
        </defs>
        <path
          d="M0 40 C200 0, 400 0, 600 40 S1000 80, 1200 40"
          fill="none"
          stroke="url(#gTop)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
    </div>
  )
}

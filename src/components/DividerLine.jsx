export function DividerLine() {
  return (
    <div className="relative flex justify-center">
      <div className="relative w-48 sm:w-72">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/25 to-transparent rounded-full" />
          <div className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-rose-400/10 to-transparent rounded-full blur-[3px]" />
        </div>
        <div className="relative h-[3px] overflow-hidden rounded-full">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-300/30 to-transparent rounded-full"
            style={{ animation: 'shimmer 2.5s ease-in-out infinite' }}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-rose-300 shadow-[0_0_16px_rgba(244,63,94,0.6),0_0_32px_rgba(244,63,94,0.3)] animate-pulse" />
      </div>
    </div>
  )
}

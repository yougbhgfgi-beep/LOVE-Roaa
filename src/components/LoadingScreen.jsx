import { Heart, Sparkles } from 'lucide-react'

export function LoadingScreen({ text }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-tr from-[#0d0508] via-[#16070c] to-[#1f0a12] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="stars-animation" />
      </div>

      <div className="relative flex items-center justify-center scale-125 animate-pulse">
        <Heart className="text-rose-600 fill-rose-600 w-24 h-24 blur-[1px]" />
        <Sparkles className="absolute text-rose-400 w-8 h-8 -top-2 -right-2 animate-bounce" />
      </div>

      <h2 className="mt-8 text-xl font-light tracking-widest text-rose-200 font-serif animate-tracking-in">
        {text}
      </h2>

      <div className="mt-4 w-48 h-[2px] bg-rose-900/30 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-rose-500 to-rose-400 animate-loading-bar" />
      </div>
    </div>
  )
}

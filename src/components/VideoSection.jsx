import { memo, useRef } from 'react'

export const VideoSection = memo(function VideoSection({ title, subtitle, videoUrl, onPlay, onPause, onEnded }) {
  const videoRef = useRef(null)

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center mb-12">
        <span className="text-[10px] text-rose-400 uppercase tracking-[0.3em] block mb-3 font-light">
          {subtitle}
        </span>
        <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide">{title}</h2>
        <div className="flex justify-center mt-5">
          <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-40 animate-pulse">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 C2,5.41 4.42,3 7.5,3 C9.24,3 10.91,3.81 12,5.08 C13.09,3.81 14.76,3 16.5,3 C19.58,3 22,5.41 22,8.5 C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" fill="#f43f5e" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 rounded-xl overflow-hidden bg-[#16070c]/80 border border-rose-800/30 shadow-2xl aspect-video group">
        <video
          ref={videoRef}
          src={videoUrl || './video.mp4'}
          className="w-full h-full object-contain bg-black"
          controls
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
        />
      </div>
    </section>
  )
})

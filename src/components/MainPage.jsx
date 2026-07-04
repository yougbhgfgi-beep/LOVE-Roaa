import { useRef, useState, useCallback, useEffect } from 'react'
import { Heart, Lock, Download } from 'lucide-react'
import { HeroSection } from './HeroSection'
import { GallerySection } from './GallerySection'
import { MilestonesSection } from './MilestonesSection'
import { VideoSection } from './VideoSection'
import { LoveStoryScene } from './LoveStoryScene'
import { CountdownTimer } from './CountdownTimer'
import { DividerLine } from './DividerLine'

export function MainPage({ config, timeLeft, timerMode, onEnd, audioRef }) {
  const { main, gallery, milestones } = config
  const [isPlaying, setIsPlaying] = useState(false)
  const [showEqualizer, setShowEqualizer] = useState(true)
  const [freqs, setFreqs] = useState(() => new Array(16).fill(3))
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const ctxRef = useRef(null)
  const srcRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = useCallback(() => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then(() => {
      setDeferredPrompt(null)
      setIsInstalled(true)
    })
  }, [deferredPrompt])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !showEqualizer) {
      rafRef.current && cancelAnimationFrame(rafRef.current)
      return
    }
    if (!ctxRef.current) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      ctxRef.current = ctx
    }
    const ctx = ctxRef.current
    if (ctx.state === 'suspended') ctx.resume()
    if (!srcRef.current) {
      const src = ctx.createMediaElementSource(audio)
      const an = ctx.createAnalyser()
      an.fftSize = 64
      src.connect(an)
      an.connect(ctx.destination)
      srcRef.current = { src, an }
    }
    const an = srcRef.current.an
    const buf = new Uint8Array(an.frequencyBinCount)
    const tick = () => {
      an.getByteFrequencyData(buf)
      setFreqs(Array.from({ length: 16 }, (_, i) => {
        const idx = Math.floor((i / 16) * buf.length)
        return Math.max(2, (buf[idx] / 255) * 14 + 2)
      }))
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()
    return () => rafRef.current && cancelAnimationFrame(rafRef.current)
  }, [showEqualizer, audioRef])

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {})
      setShowEqualizer(true)
    } else {
      audio.pause()
      setShowEqualizer(false)
    }
  }, [audioRef])

  const handleVideoPlay = useCallback(() => {
    setIsPlaying(true)
    setShowEqualizer(false)
    audioRef.current?.pause()
  }, [audioRef])

  const handleVideoPause = useCallback(() => {
    setIsPlaying(false)
    setShowEqualizer(true)
    audioRef.current?.play().catch(() => {})
  }, [audioRef])

  const handleVideoEnd = useCallback(() => {
    setIsPlaying(false)
    setShowEqualizer(true)
    audioRef.current?.play().catch(() => {})
  }, [audioRef])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0508] via-[#16070c] to-[#1f0a12] text-rose-200 font-sans selection:bg-rose-900 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 bg-rose-950/60 backdrop-blur-md border-b border-rose-900/30 z-40 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="text-rose-500 fill-rose-500 w-5 h-5 animate-pulse" />
          <span className="font-serif tracking-wider text-sm">Our Love Story</span>
        </div>

        <div className="flex items-center gap-3">
          {deferredPrompt && !isInstalled && (
            <button onClick={handleInstall} className="text-rose-400/60 hover:text-rose-300 transition-colors" title="تثبيت التطبيق">
              <Download className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={toggleAudio}
            className="text-rose-400/60 hover:text-rose-300 transition-colors"
            title={showEqualizer ? 'كتم الصوت' : 'تشغيل الصوت'}
          >
            {showEqualizer ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5 6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>

          {/* Audio equalizer */}
          <div className="flex items-end gap-[2px] h-5" style={{ direction: 'ltr' }}>
            {freqs.map((h, i) => (
              <div key={i} className="w-[2.5px] bg-rose-400/60 rounded-full" style={{ height: `${h}px`, transformOrigin: 'bottom' }} />
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <HeroSection config={config} />

      <DividerLine />

      {/* Gallery */}
      <GallerySection
        title={main.galleryTitle}
        subtitle={main.gallerySubtitle}
        images={gallery}
      />

      <DividerLine />

      {/* Milestones */}
      <MilestonesSection {...milestones} />

      <DividerLine />

      {/* Love Story Scene */}
      <LoveStoryScene />

      <DividerLine />

      {/* Video */}
      <VideoSection
        title={main.videoTitle}
        subtitle={main.videoSubtitle}
        videoUrl={main.videoUrl}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        onEnded={handleVideoEnd}
      />

      <DividerLine />

      {/* Timer */}
      <CountdownTimer
        title={main.timerTitle}
        subtitle={main.timerSubtitle}
        timeLeft={timeLeft}
        timerMode={timerMode}
      />

      {/* Footer */}
      <footer
        className="py-24 px-6 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(30,8,15,1), rgba(18,4,10,1))',
          borderTop: '1px solid rgba(244,63,94,0.06)',
        }}
      >
        <p className="text-rose-200/70 font-light text-sm max-w-xs mx-auto mb-6 relative z-10">
          {main.footerText}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 relative z-10">
          <button
            onClick={onEnd}
            className="inline-flex items-center gap-3 bg-gradient-to-b from-[#1f0a12] to-[#0d0508] border border-rose-500/30 hover:border-rose-400/60 px-8 py-4 rounded-xl hover:text-rose-100 text-sm tracking-widest uppercase transition-all duration-500 shadow-xl group hover:scale-105"
          >
            <Lock className="w-4 h-4 text-rose-400 group-hover:text-rose-300 transition-colors" />
            {main.footerButton}
          </button>

        </div>

        <div className="mt-16 text-[10px] text-rose-500/50 tracking-wider relative z-10">
          {main.footerTag}
        </div>
      </footer>
    </div>
  )
}

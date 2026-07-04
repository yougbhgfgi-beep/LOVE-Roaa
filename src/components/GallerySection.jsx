import { useState, useCallback } from 'react'
import { Heart, ChevronLeft, ChevronRight, X } from 'lucide-react'

function GalleryViewer({ images, onClose, initialIndex }) {
  const [index, setIndex] = useState(initialIndex)
  const current = images[index]

  const prev = useCallback(() => setIndex((i) => (i > 0 ? i - 1 : images.length - 1)), [images.length])
  const next = useCallback(() => setIndex((i) => (i < images.length - 1 ? i + 1 : 0)), [images.length])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') next()
    else if (e.key === 'ArrowRight') prev()
    else if (e.key === 'Escape') onClose()
  }, [next, prev, onClose])

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-rose-400/60 hover:text-rose-300 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400/60 hover:text-rose-300 transition-colors z-10"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-400/60 hover:text-rose-300 transition-colors z-10"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div
        className="relative max-w-3xl max-h-[85vh] bg-[#1a0a10]/60 backdrop-blur-sm rounded-2xl p-3 border border-rose-800/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-xl">
          <img
            src={current.src}
            alt={current.caption}
            className="max-w-full max-h-[70vh] object-contain mx-auto"
          />
        </div>
        <div className="text-center mt-4 pb-1">
          <p className="text-rose-200/80 text-sm font-light tracking-wide">
            {current.caption}
          </p>
          <p className="text-[10px] text-rose-500/50 mt-1 tracking-wider">
            {index + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export function GallerySection({ title, subtitle, images }) {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center mb-12">
        <Heart className="w-5 h-5 text-rose-500 fill-rose-500/30 mx-auto mb-2 animate-pulse" />
        <span className="text-[10px] text-rose-400 uppercase tracking-[0.3em] block mb-3 font-light">
          {subtitle}
        </span>
        <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide">{title}</h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => { setViewerIndex(i); setViewerOpen(true) }}
            className="group cursor-pointer relative bg-[#1a0a10] rounded-2xl p-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_50px_rgba(244,63,94,0.15)] border border-rose-900/20 hover:border-rose-600/40 transition-all duration-500"
          >
            <div className="aspect-square overflow-hidden rounded-xl">
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-2 right-2 left-2 bg-gradient-to-t from-[#0d0508]/95 via-[#0d0508]/70 to-transparent rounded-xl px-3 pt-8 pb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
              <p className="text-rose-100 text-sm font-light tracking-wide text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
      </div>

      {viewerOpen && (
        <GalleryViewer
          images={images}
          onClose={() => setViewerOpen(false)}
          initialIndex={viewerIndex}
        />
      )}
    </section>
  )
}

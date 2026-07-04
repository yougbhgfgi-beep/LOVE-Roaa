import { useState, useEffect, useMemo } from 'react'
import { InteractiveHearts } from './InteractiveHearts'
import { BoyCharacter, GirlCharacter } from './SceneCharacters'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SCENE_ORDER = ['idle', 'walking', 'meeting', 'cafe', 'gift', 'happy', 'exiting', 'end']

const SCENE_GLOW = {
  walking: 'rgba(244,63,94,0.04)',
  meeting: 'rgba(244,63,94,0.10)',
  cafe: 'rgba(255,200,100,0.08)',
  gift: 'rgba(244,63,94,0.14)',
  happy: 'rgba(244,63,94,0.18)',
  exiting: 'rgba(244,63,94,0.08)',
  end: 'rgba(244,63,94,0.04)',
}

function Starfield3D() {
  const stars = useMemo(() =>
    Array.from({ length: 60 }).map(() => ({
      l: `${Math.random() * 100}%`,
      t: `${Math.random() * 70}%`,
      s: `${1 + Math.random() * 3}px`,
      d: `${Math.random() * 6}s`,
      dr: `${2 + Math.random() * 5}s`,
      o: 0.15 + Math.random() * 0.45,
    })), [])
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white" style={{ left: s.l, top: s.t, width: s.s, height: s.s, opacity: s.o, animation: `twinkle ${s.dr} ease-in-out ${s.d} infinite` }} />
      ))}
    </div>
  )
}

function makeParticles(n, minS, maxS, minDr, maxDr, blur) {
  const items = []
  for (let i = 0; i < n; i++) {
    const l = Math.random() * 100 + '%'
    const d = Math.random() * 6 + 's'
    const s = (minS + Math.random() * (maxS - minS)) + 'px'
    const dr = (minDr + Math.random() * (maxDr - minDr)) + 's'
    const o = blur === 'none' ? 0.3 + Math.random() * 0.2 : (blur === 'blur(0.5px)' ? 0.15 + Math.random() * 0.2 : 0.05 + Math.random() * 0.1)
    items.push({ l, d, s, dr, o })
  }
  return { items, blur }
}

function DepthParticles() {
  const [layer1, layer2, layer3] = useMemo(() => [
    makeParticles(25, 1, 2, 10, 16, 'blur(2px)'),
    makeParticles(12, 2, 4, 7, 12, 'blur(0.5px)'),
    makeParticles(6, 4, 7, 5, 9, 'none'),
  ], [])
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {[layer1, layer2, layer3].map((layer, li) => (
        <div key={li} className="absolute inset-0" style={{ filter: layer.blur }}>
          {layer.items.map((p, i) => (
            <div key={i} className="absolute rounded-full" style={{ left: p.l, width: p.s, height: p.s, opacity: p.o, background: `radial-gradient(circle, ${li === 2 ? '#f43f5e' : '#fff'} 0%, transparent 100%)`, animation: `floatUp ${p.dr}s ease-in-out ${p.d}s infinite` }} />
          ))}
        </div>
      ))}
    </div>
  )
}

function GodRays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-[0.03] mix-blend-screen">
      <div className="absolute -top-10 -left-10 w-[120%] h-[120%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_20deg,white_25deg,transparent_30deg,transparent_50deg,white_55deg,transparent_60deg,transparent_80deg,white_85deg,transparent_90deg)]" style={{ animation: 'godRays 25s linear infinite', transformOrigin: 'center center' }} />
    </div>
  )
}

function Vignette() {
  return <div className="absolute inset-0 pointer-events-none z-20" style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)' }} />
}

function SceneProgress({ current }) {
  if (current === 'idle') return null
  const idx = SCENE_ORDER.indexOf(current)
  return (
    <div className="absolute top-3 left-3 right-3 z-40 flex items-center gap-2">
      <div className="flex-1 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-rose-600 to-rose-300 rounded-full transition-all duration-1000" style={{ width: `${Math.round((idx / (SCENE_ORDER.length - 1)) * 100)}%`, transitionTimingFunction: EASE }} />
      </div>
    </div>
  )
}

function SceneCaption({ title, subtitle, keyRef }) {
  const [show, setShow] = useState(false)
  useEffect(() => { setShow(false); const t = setTimeout(() => setShow(true), 200); return () => clearTimeout(t) }, [keyRef])
  return (
    <div className="absolute top-6 left-0 right-0 text-center z-30 will-change-transform px-4" style={{ direction: 'rtl', opacity: show ? 1 : 0, transform: show ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)', transition: `all 0.8s ${EASE} 0.15s` }}>
      <span className="block text-[9px] text-rose-400/50 tracking-[0.3em] mb-1.5 font-light drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]">{subtitle}</span>
      <h3 className="text-sm sm:text-lg md:text-xl font-serif font-bold text-white px-2 leading-relaxed" style={{ textShadow: '0 0 40px rgba(0,0,0,0.95)' }}>{title}</h3>
    </div>
  )
}

function IdleScreen({ visible, onStart }) {
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center z-30 transition-all duration-1000 ${EASE} ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute w-24 h-24 rounded-full border border-rose-500/15 animate-ping" />
      <div className="absolute w-32 h-32 rounded-full border border-rose-500/10 animate-ping" style={{ animationDelay: '0.5s' }} />
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-600/20 to-rose-900/20 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_0_80px_rgba(244,63,94,0.25)]">
          <svg className="w-8 h-8 text-rose-400/80 ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </div>
        <div className="absolute inset-0 w-20 h-20 rounded-full bg-rose-500/10 blur-3xl scale-[2.5] -z-10 animate-ping" />
      </div>
      <button onClick={onStart} className="relative px-10 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-rose-400/40 text-white/80 hover:text-rose-200 text-sm tracking-[0.25em] uppercase font-light transition-all duration-700 will-change-transform overflow-hidden group" style={{ transitionTimingFunction: EASE }}>
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600/0 via-rose-600/10 to-rose-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 will-change-transform" style={{ transitionTimingFunction: EASE }} />
        <span className="relative z-10">شوفي قصتنا</span>
      </button>
      <span className="mt-4 text-[9px] text-white/20 tracking-[0.15em]">ابدي الرحلة</span>
    </div>
  )
}

export function LoveStoryScene() {
  const [scene, setScene] = useState('idle')
  const [hearts, setHearts] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(timeout)
  }, [])

  const startStory = () => {
    setScene('walking')
    setTimeout(() => setScene('meeting'), 3200)
    setTimeout(() => setScene('cafe'), 5800)
    setTimeout(() => { setScene('gift'); setHearts([]) }, 8000)
    setTimeout(() => { setScene('happy'); generateHearts() }, 10000)
    setTimeout(() => setScene('exiting'), 13500)
    setTimeout(() => setScene('end'), 17500)
  }

  const generateHearts = () => {
    setHearts(Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 40 + 25}%`,
      angle: Math.random() * 360,
      distance: `${Math.random() * 260 + 90}px`,
      size: `${Math.random() * 24 + 10}px`,
      delay: `${i * 0.015}s`,
    })))
  }

  const captionMap = {
    walking: { title: 'مدرس عربي ومدرسة إنجليزي في كنترول واحد!', subtitle: '— غرفة المراقبة جمعتنا —' },
    meeting: { title: 'ساعات في الكنترول.. وقلبي عرف بعضه', subtitle: '— أول نظرة وكلمة —' },
    cafe: { title: 'بنحكي وبنضحك والدنيا حلوة', subtitle: '— قهوة الكنترول —' },
    gift: { title: 'من أوراق الامتحانات لأجمل هدية', subtitle: '— قلبك ملك قلبي —' },
    happy: { title: 'مبسوط إنك في حياتي يا أجمل مدرسة', subtitle: '— فرحة ما تكمّلش إلا بيكي —' },
    exiting: { title: 'من الكنترول للكنترول.. بقينا سوى', subtitle: '— إلى الأبد —' },
    end: { title: 'من الكنترول للكنترول.. بقينا سوى', subtitle: '— إلى الأبد —' },
  }

  const getIcon = () => {
    if (scene === 'walking' || scene === 'meeting') {
      return (
        <svg className="w-12 h-12 text-amber-200/80 fill-current drop-shadow-[0_0_30px_rgba(255,200,150,0.3)]" viewBox="0 0 24 24">
          <path d="M4 6h16v2H4V6zm0 4h16v2H4v-2zm0 4h10v2H4v-2zm13 0h3v6h-3v-6zm-5-8h2v12h-2V6z" />
        </svg>
      )
    }
    if (scene === 'cafe') {
      return (
        <svg className="w-12 h-12 text-amber-300 fill-current drop-shadow-[0_0_30px_rgba(255,200,150,0.5)]" viewBox="0 0 24 24">
          <path d="M3 7h14v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7zm16 0h2a3 3 0 0 1 0 6h-2" />
        </svg>
      )
    }
    return (
      <svg className="w-10 h-10 text-rose-400 fill-current drop-shadow-[0_0_40px_rgba(244,63,94,0.7)]" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none will-change-transform" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none will-change-transform" />

      <div className="relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${EASE} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-[10px] text-rose-400/70 uppercase tracking-[0.3em] block mb-2 font-light">— مدرس عربي × مدرسة إنجليزي —</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide bg-gradient-to-r from-rose-200 via-rose-300 to-rose-400 bg-clip-text text-transparent">
            قصة لقائنا في الكنترول
          </h2>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#f43f5e" className="mx-auto mt-4 opacity-30 animate-pulse">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 C2,5.41 4.42,3 7.5,3 C9.24,3 10.91,3.81 12,5.08 C13.09,3.81 14.76,3 16.5,3 C19.58,3 22,5.41 22,8.5 C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
        </div>

        {/* Scene container */}
        <div className="relative w-full min-h-[50vh] md:h-[65vh] overflow-hidden rounded-3xl border border-rose-500/10 shadow-[0_0_80px_rgba(244,63,94,0.1)] bg-gradient-to-b from-[#0d0508] via-[#16070c] to-[#08020e] flex items-end justify-center pb-12 will-change-transform" style={{ perspective: '1000px' }}>
          <Starfield3D />
          <DepthParticles />
          <GodRays />

          <div className="absolute inset-0 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#e11d48_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-6 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-950/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 75%, rgba(244,63,94,0.06) 0%, transparent 60%)' }} />

          {/* Dynamic scene glow */}
          <div className="absolute inset-0 transition-all duration-[2000ms] pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 70%, ${SCENE_GLOW[scene] || 'transparent'} 0%, transparent 60%)` }} />

          <Vignette />
          <SceneProgress current={scene} />

          {/* Idle */}
          {scene === 'idle' && <IdleScreen visible={visible} onStart={startStory} />}

          {/* Captions */}
          {scene !== 'idle' && <SceneCaption {...captionMap[scene] || captionMap.end} keyRef={scene} />}

          {/* Cafe table */}
          {scene === 'cafe' && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 will-change-transform" style={{ animation: `fadeSlideUp 0.8s ${EASE} both` }}>
              <div className="w-16 h-1 bg-[#5c3a1e] rounded-full shadow-xl" />
              <div className="w-10 h-10 bg-gradient-to-b from-[#3d2b1f] to-[#2c1a0e] rounded-lg mx-auto -mt-8 border border-[#5c3a1e]/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-rose-300/20 rounded-full" style={{ animation: `steamUp 2s ${EASE} infinite` }} />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-rose-300/15 rounded-full" style={{ animation: `steamUp 2s ${EASE} 0.4s infinite` }} />
              </div>
            </div>
          )}

          {/* Boy character */}
          {scene !== 'idle' && scene !== 'exiting' && scene !== 'end' && (
            <div className="absolute bottom-8 w-28 h-60 flex flex-col items-center justify-end will-change-transform" style={{ left: scene === 'walking' ? '-25%' : scene === 'cafe' ? '24%' : '30%', transition: `left 4000ms ${EASE}`, filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.6))' }}>
              <BoyCharacter walking={scene === 'walking'} scene={scene} armRightExtra={(scene === 'gift' || scene === 'happy') ? 'rotate-[-30deg] translate-x-4 -translate-y-2 origin-top' : ''} />
              <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-rose-400/60 mt-3 drop-shadow-[0_0_10px_rgba(244,63,94,0.2)]">{scene === 'gift' ? '🎁' : scene === 'happy' ? '❤️' : 'عبدالرحمن'}</span>
            </div>
          )}

          {/* Center icon */}
          {(scene === 'gift' || scene === 'meeting' || scene === 'cafe') && (
            <div className="absolute bottom-32 z-25 will-change-transform" style={{ left: 'calc(50% - 20px)', transition: `all 1200ms ${EASE}`, opacity: scene === 'gift' ? 1 : scene === 'cafe' ? 0.95 : 0.3, transform: scene === 'gift' ? 'scale(1.5)' : scene === 'cafe' ? 'scale(1.1)' : 'scale(0.5)' }}>
              <div className="relative">
                {getIcon()}
                <div className="absolute inset-0 bg-rose-500 blur-3xl opacity-20 rounded-full scale-[2.5] -z-10 animate-ping" />
              </div>
            </div>
          )}

          {/* Happy hearts */}
          {scene === 'happy' && <InteractiveHearts />}

          {/* Girl character */}
          {scene !== 'idle' && scene !== 'exiting' && scene !== 'end' && (
            <div className="absolute bottom-8 w-28 h-60 flex flex-col items-center justify-end will-change-transform" style={{ right: scene === 'walking' ? '-25%' : scene === 'cafe' ? '24%' : '30%', transition: `right 4000ms ${EASE}`, filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.6))' }}>
              <GirlCharacter walking={scene === 'walking'} jumping={scene === 'happy'} scene={scene} armRightExtra={scene === 'happy' ? 'rotate-[-160deg] translate-x-2 -translate-y-1.5 origin-top' : ''} armLeftExtra={scene === 'happy' ? 'rotate-[160deg] -translate-x-2 -translate-y-1.5 origin-top' : ''} />
              <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-rose-400/60 mt-3 drop-shadow-[0_0_10px_rgba(244,63,94,0.2)]">{scene === 'happy' ? '💕' : 'رؤىٰ'}</span>
            </div>
          )}

          {/* Together */}
          {(scene === 'exiting' || scene === 'end') && (
            <div className="absolute bottom-8 w-72 h-60 flex flex-col items-center justify-end will-change-transform" style={{ left: scene === 'exiting' ? '34%' : '140%', transition: `left 4000ms ${EASE}` }}>
              <div className="flex items-end justify-center space-x-2 animate-[walkCycle_0.7s_infinite]" dir="ltr" style={{ willChange: 'transform' }}>
                <BoyCharacter walking scene={scene} />
                <div className="relative pb-[72px] z-20">
                  <div className="text-[20px] animate-ping drop-shadow-[0_0_25px_rgba(244,63,94,0.9)]">❤️</div>
                  <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full scale-150 -z-10" />
                </div>
                <GirlCharacter walking scene={scene} />
              </div>
              <span className="text-[8px] uppercase font-bold tracking-[0.25em] text-rose-200 bg-rose-600/10 backdrop-blur-md border border-rose-400/20 px-4 py-1 rounded-full shadow-[0_0_25px_rgba(244,63,94,0.2)] mt-3">عبدالرحمن & رؤىٰ</span>
            </div>
          )}

          {/* Flying hearts */}
          {hearts.map((h) => (
            <div key={h.id} className="absolute text-rose-400 pointer-events-none opacity-0 select-none will-change-transform" style={{ left: h.left, top: h.top, fontSize: h.size, animation: `blast 2s ${EASE} ${h.delay} forwards`, filter: 'drop-shadow(0 0 8px rgba(244,63,94,0.4))' }}>
              ❤️
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

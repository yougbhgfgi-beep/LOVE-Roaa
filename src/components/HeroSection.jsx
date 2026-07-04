import { ArabicName } from './ArabicName'

export function HeroSection({ config }) {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden" style={{ direction: 'ltr' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, #2d0f1c 0%, #14070c 60%, transparent 100%)' }} />

      {/* Glow orbs */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-rose-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute w-[300px] h-[300px] bg-rose-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* SVG Energy Line */}
      <div className="relative z-10 w-full max-w-4xl mx-auto h-28 sm:h-36 md:h-44 flex items-center justify-center px-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 140" preserveAspectRatio="xMidYMid meet" style={{ direction: 'ltr' }}>
          <defs>
            <filter id="heartGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="particleGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="energyGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0" />
              <stop offset="30%" stopColor="#f43f5e" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#e11d48" stopOpacity="1" />
              <stop offset="70%" stopColor="#f43f5e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d={`M30,70 
              L100,70 L102,35 L104,105 L106,70
              L150,70 L152,35 L154,105 L156,70
              L220,70 L222,35 L224,105 L226,70
              L340,70 L460,70
              L580,70 L582,35 L584,105 L586,70
              L650,70 L652,35 L654,105 L656,70
              L770,70`}
            fill="none"
            stroke="url(#energyGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#heartGlow)"
            className="animate-pulse"
          />

          {/* Center heart */}
          <g transform="translate(400,70)">
            <path
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
              fill="#f43f5e"
              opacity="0.95"
              filter="url(#heartGlow)"
              transform="scale(3) translate(-12,-12)"
            />
            <circle r="5" fill="#f43f5e" filter="url(#heartGlow)">
              <animate attributeName="r" values="3;6;3" dur="0.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;1;0.5" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Right particles */}
          <g filter="url(#particleGlow)">
            <circle r="4" fill="#f43f5e" opacity="0.8">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M400,70 L460,70 L580,70 L582,35 L584,105 L586,70 L650,70 L652,35 L654,105 L656,70 L770,70" />
              <animate attributeName="opacity" values="0.8;0.3;0" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle r="3" fill="#f43f5e" opacity="0.6">
              <animateMotion dur="4.5s" repeatCount="indefinite" path="M400,70 L460,70 L580,70 L582,35 L584,105 L586,70 L650,70 L652,35 L654,105 L656,70 L770,70" />
              <animate attributeName="opacity" values="0.6;0.2;0" dur="4.5s" repeatCount="indefinite" />
            </circle>
            <circle r="3" fill="#e11d48" opacity="0.7">
              <animateMotion dur="4s" repeatCount="indefinite" path="M400,70 L460,70 L580,70 L582,35 L584,105 L586,70 L650,70 L652,35 L654,105 L656,70 L770,70" />
              <animate attributeName="opacity" values="0.7;0.15;0" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Left particles */}
          <g filter="url(#particleGlow)">
            <circle r="4" fill="#f43f5e" opacity="0.8">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M400,70 L340,70 L226,70 L224,105 L222,35 L220,70 L156,70 L154,105 L152,35 L150,70 L106,70 L104,105 L102,35 L100,70 L30,70" />
              <animate attributeName="opacity" values="0.8;0.3;0" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle r="3" fill="#f43f5e" opacity="0.6">
              <animateMotion dur="4.5s" repeatCount="indefinite" path="M400,70 L340,70 L226,70 L224,105 L222,35 L220,70 L156,70 L154,105 L152,35 L150,70 L106,70 L104,105 L102,35 L100,70 L30,70" />
              <animate attributeName="opacity" values="0.6;0.2;0" dur="4.5s" repeatCount="indefinite" />
            </circle>
            <circle r="3" fill="#e11d48" opacity="0.7">
              <animateMotion dur="4s" repeatCount="indefinite" path="M400,70 L340,70 L226,70 L224,105 L222,35 L220,70 L156,70 L154,105 L152,35 L150,70 L106,70 L104,105 L102,35 L100,70 L30,70" />
              <animate attributeName="opacity" values="0.7;0.15;0" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        <h1
          className="absolute left-0 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-rose-300"
          style={{ animation: 'namePulse 2s ease-in-out infinite', fontFamily: "'Amiri', 'Traditional Arabic', serif", textShadow: '0 0 30px rgba(244,63,94,0.3)' }}
        >
          <ArabicName text={config.couple.his} />
        </h1>
        <h1
          className="absolute right-0 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-rose-200"
          style={{ animation: 'namePulse 2s ease-in-out infinite', animationDelay: '0.5s', fontFamily: "'Amiri', 'Traditional Arabic', serif", textShadow: '0 0 30px rgba(244,63,94,0.3)' }}
        >
          <ArabicName text={config.couple.hers} />
        </h1>
      </div>

      <p className="mt-6 text-rose-300/70 font-light max-w-md tracking-wide text-sm md:text-base relative z-10" style={{ direction: 'rtl' }}>
        {config.main.heroSubtitle}
      </p>

      <div className="mt-8 flex gap-2 relative z-10">
        <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
        <div className="w-2 h-2 rounded-full bg-rose-500" />
        <div className="w-2 h-2 rounded-full bg-rose-500" />
      </div>
    </section>
  )
}

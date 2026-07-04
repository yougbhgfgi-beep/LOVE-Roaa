import { useState } from 'react'
import { Lock, Heart } from 'lucide-react'

export function LoginScreen({ onLogin, config }) {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showHint, setShowHint] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    await new Promise((r) => setTimeout(r, 1000))
    if (password === 'koty') {
      onLogin()
    } else {
      setError(config.login.errorText)
      setPassword('')
    }
    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0d0508] via-[#16070c] to-[#1f0a12] flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="stars-animation" />
      </div>

      <div className="relative w-full max-w-md bg-[#16070c]/90 backdrop-blur-md border border-rose-800/30 rounded-3xl p-8 shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-rose-400/40 shadow-[0_0_30px_rgba(244,63,94,0.2)] ring-2 ring-rose-500/10 ring-offset-2 ring-offset-[#16070c]">
              <img src="./gallery1.jpeg" alt="profile" className="w-full h-full object-cover" />
            </div>
            <Heart className="absolute -top-1 -right-1 text-rose-400 w-5 h-5 animate-pulse drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
          </div>
          <h1 className="mt-6 text-2xl font-serif font-bold tracking-wide text-rose-100">
            {config.login.title}
          </h1>
          <p className="text-rose-300/60 text-sm mt-2 font-light">
            {config.login.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type={showHint ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={config.login.passwordHint}
              className="w-full bg-[#0d0508]/80 border border-rose-800/40 rounded-xl px-4 py-3.5 text-rose-200 placeholder-rose-700/50 text-sm tracking-wide outline-none focus:border-rose-500/60 focus:shadow-[0_0_20px_rgba(244,63,94,0.1)] transition-all duration-300"
              disabled={isLoading}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-600/60 hover:text-rose-400 transition-colors"
            >
              {showHint ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          {error && (
            <p className="text-rose-400/90 text-xs text-center animate-pulse">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 disabled:from-rose-900/50 disabled:to-rose-800/50 disabled:cursor-not-allowed text-rose-100 py-3.5 rounded-xl font-medium tracking-wider transition-all duration-500 shadow-xl shadow-rose-950/40 hover:shadow-rose-950/60"
          >
            {isLoading ? config.login.loadingText : config.login.buttonText}
          </button>
        </form>

        <p className="mt-6 text-[10px] text-rose-700/40 text-center tracking-wider font-light">
          {config.login.passwordHint}
        </p>
      </div>
    </div>
  )
}

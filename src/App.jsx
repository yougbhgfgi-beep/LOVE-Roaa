import { useState, useEffect, useRef } from 'react'
import { CONFIG } from './config/loveStory'
import { useTimer } from './hooks/useTimer'
import { LoadingScreen } from './components/LoadingScreen'
import { LoginScreen } from './components/LoginScreen'
import { EnvelopeScreen } from './components/EnvelopeScreen'
import { MainPage } from './components/MainPage'
import { EndingScreen } from './components/EndingScreen'
import { InteractiveHearts } from './components/InteractiveHearts'
import { DecorativeBorder } from './components/DecorativeBorder'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [showEnvelope, setShowEnvelope] = useState(false)
  const [showEnding, setShowEnding] = useState(false)
  const [exiting, setExiting] = useState(false)
  const { timeLeft, timerMode } = useTimer(CONFIG.anniversaryDate)
  const audioRef = useRef(null)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3500)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (showEnding && audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.play().catch(() => {})
    }
  }, [showEnding])

  const handleLogin = () => {
    setLoggedIn(true)
    setShowEnvelope(true)
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.play().catch(() => {})
    }
  }

  const handleEnterMain = () => {
    setShowEnvelope(false)
    setExiting(true)
  }

  const handleEnd = () => {
    setShowEnding(true)
  }

  const handleExit = () => {
    setShowEnding(false)
    setExiting(true)
  }

  return (
    <>
      <audio ref={audioRef} src="./audio.mp4" preload="auto" loop />
      <InteractiveHearts />
      <DecorativeBorder />

      {loading ? (
        <LoadingScreen text={CONFIG.loading.text} />
      ) : !loggedIn ? (
        <LoginScreen onLogin={handleLogin} config={CONFIG} />
      ) : showEnvelope ? (
        <EnvelopeScreen {...CONFIG.envelope} onEnter={handleEnterMain} />
      ) : showEnding ? (
        <EndingScreen {...CONFIG.ending} onExit={handleExit} />
      ) : (
        <MainPage
          config={CONFIG}
          timeLeft={timeLeft}
          timerMode={timerMode}
          onEnd={handleEnd}
          audioRef={audioRef}
        />
      )}
    </>
  )
}

import { useTypewriter } from '../hooks/useTypewriter'

export function TypewriterText({ text, speed = 30, startDelay = 400 }) {
  const { displayedText, isComplete } = useTypewriter(text, {
    speed,
    startDelay,
    enabled: true,
  })

  return (
    <>
      <span>{displayedText}</span>
      {!isComplete && (
        <span className="inline-block mr-1 w-2 h-2 bg-rose-300 rounded-full animate-pulse" />
      )}
    </>
  )
}

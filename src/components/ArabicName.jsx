const SUPERSCRIPT_ALEF = '\u0670'

export function ArabicName({ text, as: Tag = 'span', className, style }) {
  if (!text || !text.includes(SUPERSCRIPT_ALEF)) {
    return <Tag className={className} style={style}>{text}</Tag>
  }

  const parts = []
  let last = 0
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) === 0x0670) {
      if (i > last) parts.push(<span key={`t${last}`}>{text.slice(last, i)}</span>)
      parts.push(
        <span key={`a${i}`} className="superscript-alef" aria-label="alif">
          {'\u0670'}
        </span>
      )
      last = i + 1
    }
  }
  if (last < text.length) parts.push(<span key={`t${last}`}>{text.slice(last)}</span>)

  return <Tag className={className} style={{ position: 'relative', display: 'inline', ...style }}>{parts}</Tag>
}

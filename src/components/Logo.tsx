// ─────────────────────────────────────────────
// TramiGo Logo — matches exact reference design
// White "Trami" + Green "Go" + ".Online"
// ─────────────────────────────────────────────
interface LogoProps {
  size?: number
  variant?: 'dark' | 'light'  // dark = white text (for dark bg), light = navy text (for light bg)
  showTagline?: boolean
}

export default function Logo({ size = 28, variant = 'dark', showTagline = true }: LogoProps) {
  const textColor = variant === 'dark' ? '#FFFFFF' : '#0A0E1A'
  const green = '#00D67A'

  return (
    <div className="flex items-center" style={{ gap: size * 0.05 }}>
      <span
        className="font-display font-bold leading-none select-none"
        style={{ fontSize: size, color: textColor, letterSpacing: '-0.5px' }}
      >
        Trami<span style={{ color: green }}>Go</span>
        {showTagline && (
          <span style={{ fontSize: size * 0.5, color: textColor, fontWeight: 500 }}>.Online</span>
        )}
      </span>
    </div>
  )
}

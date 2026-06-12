import Image from 'next/image'

interface OrnamentProps {
  className?: string
  /** Render a classic fleuron character instead of the logo mark. */
  glyph?: string
}

// Section divider:  ── ✕ ──  where ✕ is the band's guitar-redwood mark
// by default (a printer's mark between the rules), or a fleuron glyph.
export default function Ornament({ className = '', glyph }: OrnamentProps) {
  return (
    <div className={`ornament ${className}`.trim()} aria-hidden="true">
      {glyph ?? (
        <Image
          src="/logonotext.svg"
          alt=""
          width={15}
          height={44}
          className="logo-cream h-11 w-auto opacity-80"
        />
      )}
    </div>
  )
}

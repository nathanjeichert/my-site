import { Youtube } from 'lucide-react'

export const metadata = {
  title: 'Music',
  description: 'Live at G-Fest 2025 — stream the full show from the Internet Archive.',
}

export default function MusicPage() {
  return (
    <div className="min-h-screen px-4 pb-24 pt-32">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <p className="eyebrow mb-3">Live Recording</p>
          <h1 className="font-display vintage-shadow text-5xl text-cream sm:text-6xl">Live at G-Fest 2025</h1>
          <p className="mt-4 text-sand/80">September 27, 2025 · Petaluma, CA</p>
          <div className="ornament mt-6 text-xl" aria-hidden="true">❦</div>
        </header>

        {/* Full show — taper-style soundboard from the Internet Archive */}
        <div className="border-2 border-rust/50 bg-pine/60 p-2 shadow-[8px_8px_0_rgba(215,180,138,0.25)] sm:p-3">
          <iframe
            src="https://archive.org/embed/ND2025-09-27?playlist=1&list_height=180"
            title="Northern Disconnection - Live at G-Fest 2025"
            className="h-[340px] w-full md:h-[380px]"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          />
        </div>

        <p className="mt-4 text-center text-sm italic text-sand/60">
          Streaming free from the Internet Archive — in the live-taping tradition.
        </p>

        <div className="mt-14 text-center">
          <a
            href="https://www.youtube.com/channel/UCOpZMRlcndhoCcN1knIHIHA"
            target="_blank"
            rel="noopener noreferrer"
            className="retro-button retro-button--ghost"
          >
            <Youtube size={16} />
            More Live Videos
          </a>
        </div>
      </div>
    </div>
  )
}

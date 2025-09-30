export const metadata = {
  title: 'Music',
  description: "Live at G-Fest 2025 — stream the full show from the Internet Archive.",
}

export default function MusicPage() {
  return (
    <div className="min-h-screen pt-28 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-cream mb-4 vintage-shadow">Live at G-Fest 2025</h1>
        <p className="text-sand/90 mb-8">
          Stream the full show via the Internet Archive. Play the set below or browse the playlist and downloads.
        </p>

        <div className="rounded-2xl border border-rust/30 bg-[#213828]/80 p-4 shadow-2xl shadow-midnight/40 backdrop-blur">
          <div className="relative w-full overflow-hidden rounded-xl">
            <iframe
              src="https://archive.org/embed/ND2025-09-27?playlist=1"
              title="Northern Disconnection — Live at G-Fest 2025"
              allow="autoplay"
              allowFullScreen
              className="w-full h-[500px] md:h-[640px]"
            />
          </div>
          <p className="mt-3 text-center text-xs text-rust/80">
            Stream hosted by archive.org — playlist and downloads available.
          </p>
        </div>
      </div>
    </div>
  )
}

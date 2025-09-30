export const metadata = {
  title: 'Music',
  description: 'Live at G-Fest 2025 - stream the full show from the Internet Archive.',
}

export default function MusicPage() {
  return (
    <div className="min-h-screen pt-28 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-cream mb-4 vintage-shadow">Live at G-Fest 2025</h1>

        {/* Item meta: thumbnail, title, date */}
        <div className="mb-6 rounded-xl border border-rust/30 bg-[#213828]/80 p-4 shadow-2xl shadow-midnight/40 backdrop-blur">
          <div className="flex items-center gap-4">
            <img
              src="https://archive.org/services/img/ND2025-09-27"
              alt="Live at G-Fest 2025 thumbnail"
              className="h-24 w-24 rounded-lg border border-rust/40 object-cover"
              loading="lazy"
            />
            <div>
              <h2 className="text-2xl font-semibold text-cream">Live at G-Fest 2025</h2>
              <p className="text-sm text-sand/80">September 27, 2025</p>
            </div>
          </div>
        </div>

        {/* Player: tightly wrapped gold border around embed */}
        <div className="overflow-hidden rounded-xl border border-rust shadow-2xl shadow-midnight/40">
          <iframe
            src="https://archive.org/embed/ND2025-09-27?playlist=1&list_height=180"
            title="Northern Disconnection - Live at G-Fest 2025"
            className="w-full h-[340px] md:h-[360px]"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

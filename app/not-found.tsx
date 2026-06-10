import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center">
      <p className="eyebrow mb-3">404</p>
      <h1 className="font-display vintage-shadow mb-4 text-5xl text-cream sm:text-6xl">
        This page wandered off the setlist
      </h1>
      <p className="mb-10 text-lg italic text-sand">
        What a long, strange trip — but there&apos;s nothing here.
      </p>
      <Link href="/" className="retro-button">
        Back Home
      </Link>
    </section>
  )
}

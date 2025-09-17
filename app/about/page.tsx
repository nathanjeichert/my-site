import type { Metadata } from 'next'
import Image from 'next/image'

const aboutSections = [
  {
    text: "Evan Pellkofer (guitar) and Nathan Eichert (keys) have been playing music together since elementary school. After a decade-plus, and with a little help from a rotating cast of talented friends, the duo is bringing their blend of blues, folk, jazz, and psychedelic rock to audiences around the San Francisco Bay Area.",
    image: {
      src: '/band-photos/BrickPhoto.jpg',
      alt: 'Northern Disconnection performing in front of a brick backdrop',
    },
  },
  {
    text: "Northern Disconnection's diverse set lists feature a blend of original songs and their take on the music that formed the soundtrack of their childhood, such as the Grateful Dead, Crosby, Stills, Nash and Young, and Steely Dan.",
    image: {
      src: '/band-photos/GrassPhoto.jpg',
      alt: 'Northern Disconnection playing outdoors surrounded by greenery',
    },
  },
] as const

export const metadata: Metadata = {
  title: 'About | Northern Disconnection',
  description: 'Learn the story of Northern Disconnection and the longtime friends behind the band.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 space-y-20">
        <header className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-cream">About The Band</h1>
          <p className="text-lg text-sand max-w-3xl mx-auto leading-relaxed">
            Meet the lifelong friends behind Northern Disconnection.
          </p>
        </header>

        {aboutSections.map((section, index) => {
          const isEven = index % 2 === 0

          return (
            <section
              key={section.image.src}
              className="grid gap-12 md:gap-16 md:grid-cols-2 items-center"
            >
              <div className={`space-y-6 text-lg leading-relaxed text-sand ${isEven ? '' : 'md:order-2'}`}>
                <p>{section.text}</p>
              </div>

              <div className={`relative ${isEven ? 'md:-mr-24' : 'md:-ml-24 md:order-1'}`}>
                <div
                  className={`absolute -inset-6 rounded-3xl bg-gold/15 blur-3xl -z-10 ${
                    isEven ? 'translate-y-8 -translate-x-6' : '-translate-y-8 translate-x-6'
                  }`}
                ></div>
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl ring-2 ring-cream/10 ${
                    isEven ? 'md:translate-y-6' : 'md:-translate-y-6'
                  }`}
                >
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    sizes="(min-width: 768px) 420px, 80vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </div>
            </section>
          )
        })}

        <section className="text-center">
          <a
            href="mailto:nathanjeichert@gmail.com"
            className="retro-button inline-flex h-12 w-64 items-center justify-center gap-2 px-6 text-base sm:text-lg whitespace-nowrap border-rust bg-transparent text-rust hover:bg-rust hover:text-midnight"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  )
}

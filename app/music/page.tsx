import { AudioPlayer } from '../components/audio-player'

export const metadata = {
  title: 'Music',
  description: 'Listen to Two Against Nature\'s latest tracks and releases.',
}

// Our actual tracks
const tracks = [
  {
    id: 1,
    title: 'Long May You Run',
    duration: '4:12',
    src: '/music/Long May You Run.mp3'
  },
  {
    id: 2,
    title: 'Yula Valley',
    duration: '3:48',
    src: '/music/Yula valley.mp3'
  }
]

export default function MusicPage() {
  return (
    <section>
      <h1 className="mb-8 text-3xl font-bold tracking-tighter">
        Our Music
      </h1>
      
      <div className="mb-8">
        <p className="text-lg leading-relaxed mb-4">
          Explore our collection of original songs that capture the spirit of 
          americana music with a modern twist. Each track tells a story rooted 
          in our experiences growing up in Sonoma County.
        </p>
        <p className="text-neutral-600 dark:text-neutral-400">
          All tracks are available for streaming and download. For licensing 
          inquiries, please contact us directly.
        </p>
      </div>

      <div className="space-y-6 mb-12">
        {tracks.map((track) => (
          <AudioPlayer key={track.id} track={track} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Latest Release</h2>
          <p className="mb-4">
            Our newest single "Yula Valley" is an evocative piece inspired by 
            serene landscapes, featuring thoughtful melodies and harmonious 
            vocals that transport listeners to peaceful, natural settings.
          </p>
          <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
            Stream Now
          </button>
        </div>

        <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="mb-4">
            We're currently working on our debut EP, featuring five original 
            tracks that showcase our range and storytelling abilities. 
            Expected release: Fall 2024.
          </p>
          <button className="border border-neutral-300 dark:border-neutral-700 px-4 py-2 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
            Pre-order
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Support Our Music</h2>
        <p className="mb-6 leading-relaxed">
          As independent artists, your support means everything to us. 
          Whether it's streaming our songs, sharing them with friends, 
          or coming to our shows, every bit of support helps us continue 
          creating music we're passionate about.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
            Download All Tracks
          </button>
          <button className="border border-neutral-300 dark:border-neutral-700 px-6 py-3 rounded-md hover:bg-white dark:hover:bg-neutral-900 transition-colors">
            Follow on Spotify
          </button>
          <button className="border border-neutral-300 dark:border-neutral-700 px-6 py-3 rounded-md hover:bg-white dark:hover:bg-neutral-900 transition-colors">
            Subscribe on YouTube
          </button>
        </div>
      </div>
    </section>
  )
} 
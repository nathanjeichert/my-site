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
  },
  {
    id: 3,
    title: 'Cassidy',
    duration: '5:21',
    src: '/music/Cassidy.mp3'
  }
]

export default function MusicPage() {
  return (
    <section>
      <h1 className="mb-8 text-3xl font-bold tracking-tighter">
        Our Music
      </h1>

      <div className="space-y-6 mb-12">
        {tracks.map((track) => (
          <AudioPlayer key={track.id} track={track} />
        ))}
      </div>
    </section>
  )
} 
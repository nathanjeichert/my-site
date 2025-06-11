import { getMusicContent } from '@/lib/content'
import MusicClient from './music-client'

export const metadata = {
  title: 'Music',
  description: 'Listen to Two Against Nature\'s latest tracks and releases.',
}

export default function MusicPage() {
  const content = getMusicContent()
  
  return <MusicClient content={content} />
}
'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface Track {
  id: number
  title: string
  duration: string
  src: string
  description?: string
}

interface AudioPlayerProps {
  track: Track
}

export function AudioPlayer({ track }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (parseFloat(e.target.value) / 100) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cream/5 border border-rust/30 rounded-lg p-6 hover:bg-cream/10 transition-colors"
    >
      <audio ref={audioRef} src={track.src} preload="metadata" />
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-cream">{track.title}</h3>
          {track.description && (
            <p className="text-sm text-sand">
              {track.description}
            </p>
          )}
        </div>
        
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Volume2 size={20} className="text-gold" />
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 bg-gold text-midnight rounded-full flex items-center justify-center hover:bg-rust transition-colors"
        >
          {isPlaying ? (
            <Pause size={20} />
          ) : (
            <Play size={20} className="ml-1" />
          )}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-2 bg-midnight/50 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #f4c430 0%, #f4c430 ${progress}%, rgba(10, 10, 10, 0.5) ${progress}%, rgba(10, 10, 10, 0.5) 100%)`
            }}
          />
        </div>

        <div className="text-sm text-sand min-w-[80px] text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </motion.div>
  )
} 
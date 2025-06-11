'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react'
import { MusicContent } from '@/types/content'

interface MusicPageProps {
  content: MusicContent;
}

export default function MusicClient({ content }: MusicPageProps) {
  const { tracks, pageContent } = content;
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    setIsPlaying(false)
  }

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setIsPlaying(false)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      handleNext()
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      setCurrentTime(0)
      setIsPlaying(false)
    }
  }, [currentTrack])

  return (
    <div className="min-h-screen pt-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-cream mb-12 vintage-shadow"
        >
          {pageContent.title}
        </motion.h1>

        {/* Main Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-rust/20 to-sage/20 rounded-2xl p-8 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Album Art */}
            <div className="aspect-square bg-sage/30 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 gradient-psychedelic opacity-30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-48 h-48 bg-midnight/50 rounded-full flex items-center justify-center"
                >
                  <div className="w-20 h-20 bg-gold rounded-full"></div>
                </motion.div>
              </div>
            </div>

            {/* Player Controls */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTrack}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-3xl font-bold text-cream mb-2">{tracks[currentTrack].title}</h2>
                  <p className="text-sand mb-1">{tracks[currentTrack].album}</p>
                  <p className="text-sand/70 mb-8">{tracks[currentTrack].year}</p>
                </motion.div>
              </AnimatePresence>

              {/* Progress Bar */}
              <div className="mb-8">
                <div 
                  className="h-2 bg-midnight/50 rounded-full overflow-hidden cursor-pointer relative"
                  onClick={(e) => {
                    if (audioRef.current && duration) {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const clickX = e.clientX - rect.left
                      const clickRatio = clickX / rect.width
                      const newTime = clickRatio * duration
                      audioRef.current.currentTime = newTime
                      setCurrentTime(newTime)
                    }
                  }}
                >
                  <div 
                    className="h-full bg-rust transition-all"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-sand mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{tracks[currentTrack].duration}</span>
                </div>
              </div>

              {/* Hidden Audio Element */}
              <audio ref={audioRef} preload="metadata">
                <source src={tracks[currentTrack].src} type="audio/mpeg" />
              </audio>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-6">
                <button
                  onClick={handlePrevious}
                  className="p-3 rounded-full bg-midnight/50 text-cream hover:bg-midnight/70 transition-colors"
                >
                  <SkipBack size={24} />
                </button>
                
                <button
                  onClick={handlePlayPause}
                  className="p-4 rounded-full bg-gold text-midnight hover:bg-rust transition-colors"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-midnight/50 text-cream hover:bg-midnight/70 transition-colors"
                >
                  <SkipForward size={24} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Track List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-rust mb-6">All Tracks</h3>
          <div className="space-y-3">
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setCurrentTrack(index)
                  setIsPlaying(false)
                }}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  currentTrack === index
                    ? 'bg-gold/20 border border-gold'
                    : 'bg-cream/5 border border-transparent hover:bg-cream/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-sage/30 rounded flex items-center justify-center">
                      {currentTrack === index && isPlaying ? (
                        <Volume2 size={20} className="text-gold" />
                      ) : (
                        <Play size={20} className="text-cream" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-cream">{track.title}</h4>
                      <p className="text-sm text-sand">{track.album}</p>
                    </div>
                  </div>
                  <span className="text-sand">{track.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
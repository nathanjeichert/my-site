'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Shuffle, Download, Share2 } from 'lucide-react'
import type { Show } from '@/types/content'
import {
  drawFlyer,
  flyerFilename,
  hashSeed,
  FLYER_DIMENSIONS,
  type FlyerFormat,
} from '@/lib/flyer'

interface ShowFlyerModalProps {
  show: Show
  onClose: () => void
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not render flyer'))), 'image/png')
  })
}

export default function ShowFlyerModal({ show, onClose }: ShowFlyerModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [format, setFormat] = useState<FlyerFormat>('post')
  const [seed, setSeed] = useState(() => hashSeed(`${show.date}-${show.venue}`))
  const [canShare, setCanShare] = useState(false)
  const [isBusy, setIsBusy] = useState(false)

  useEffect(() => {
    const probe = new File([new Blob()], 'flyer.png', { type: 'image/png' })
    setCanShare(typeof navigator.canShare === 'function' && navigator.canShare({ files: [probe] }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let cancelled = false
    drawFlyer(canvas, show, format, seed).catch(() => {
      if (!cancelled) console.error('Failed to draw flyer')
    })
    return () => {
      cancelled = true
    }
  }, [show, format, seed])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const shuffle = useCallback(() => {
    setSeed(Math.floor(Math.random() * 0xffffffff))
  }, [])

  const download = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas || isBusy) return
    setIsBusy(true)
    try {
      const blob = await canvasToBlob(canvas)
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = flyerFilename(show, format)
      link.click()
      URL.revokeObjectURL(url)
    } finally {
      setIsBusy(false)
    }
  }, [show, format, isBusy])

  const share = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas || isBusy) return
    setIsBusy(true)
    try {
      const blob = await canvasToBlob(canvas)
      const file = new File([blob], flyerFilename(show, format), { type: 'image/png' })
      await navigator.share({
        files: [file],
        title: `Northern Disconnection at ${show.venue}`,
      })
    } catch {
      // user dismissed the share sheet
    } finally {
      setIsBusy(false)
    }
  }, [show, format, isBusy])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-pine/85 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Share flyer for ${show.venue}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex max-h-full w-full max-w-lg flex-col border-2 border-rust/50 bg-pine p-5 shadow-[8px_8px_0_rgba(215,180,138,0.25)] sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 p-1 text-rust transition-colors hover:text-cream"
        >
          <X size={20} />
        </button>

        <p className="eyebrow mb-4 text-center">Show Flyer</p>

        <div className="min-h-0 flex-1 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="mx-auto block h-full max-h-[58vh] w-auto max-w-full border border-rust/30"
            aria-label={`Flyer for Northern Disconnection at ${show.venue}, ${show.date}`}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {(Object.keys(FLYER_DIMENSIONS) as FlyerFormat[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFormat(key)}
              className={`border px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] transition-colors ${
                format === key
                  ? 'border-gold bg-gold/15 text-gold'
                  : 'border-rust/40 text-rust hover:border-rust hover:text-cream'
              }`}
            >
              {FLYER_DIMENSIONS[key].label}
            </button>
          ))}
          <button
            type="button"
            onClick={shuffle}
            className="inline-flex items-center gap-1.5 border border-rust/40 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-rust transition-colors hover:border-rust hover:text-cream"
          >
            <Shuffle size={13} />
            Shuffle Art
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={download} disabled={isBusy} className="retro-button retro-button--sm disabled:opacity-50">
            <Download size={14} />
            Download
          </button>
          {canShare && (
            <button
              type="button"
              onClick={share}
              disabled={isBusy}
              className="retro-button retro-button--sm retro-button--ghost disabled:opacity-50"
            >
              <Share2 size={14} />
              Share
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

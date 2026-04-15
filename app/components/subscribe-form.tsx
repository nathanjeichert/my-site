'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface SubscribeFormProps {
  heading?: string
  subheading?: string
  className?: string
}

export default function SubscribeForm({
  heading = 'Get Show Alerts',
  subheading = 'Subscribe to be notified when we announce new shows',
  className = '',
}: SubscribeFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className={`text-center ${className}`}>
      <h2 className="mb-4 text-3xl font-bold text-cream vintage-shadow">
        {heading}
      </h2>
      <p className="mb-6 text-sand">{subheading}</p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <div className="relative w-full max-w-md flex-1">
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sand"
            size={20}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === 'loading'}
            className="w-full rounded-lg border border-rust/30 bg-cream/5 py-3 pl-12 pr-4 text-cream placeholder-sand/50 transition-colors focus:border-rust focus:outline-none disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="whitespace-nowrap rounded-lg border border-rust bg-rust/20 px-8 py-3 font-semibold text-cream transition-colors hover:bg-rust/30 disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-4 ${status === 'success' ? 'text-gold' : 'text-rust'}`}
        >
          {message}
        </motion.p>
      )}
    </div>
  )
}

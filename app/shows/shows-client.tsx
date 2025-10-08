'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Ticket, ChevronRight, Mail } from 'lucide-react'
import { ShowsContent } from '@/types/content'
import { useState } from 'react'

interface ShowsPageProps {
  content: ShowsContent;
}

export default function ShowsClient({ content }: ShowsPageProps) {
  const { pageContent, upcomingShows } = content;
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
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
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

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

        <div className="space-y-6">
          {upcomingShows.map((show, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-cream/5 border border-rust/30 rounded-lg p-6 hover:bg-cream/10 transition-colors"
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center text-cream mb-2">
                    <Calendar size={20} className="mr-2" />
                    <span className="font-bold">{show.date}</span>
                  </div>
                  <div className="flex items-center text-sand">
                    <Clock size={20} className="mr-2" />
                    <span>{show.time}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-cream mb-1">{show.venue}</h3>
                  <div className="flex items-center text-sand">
                    <MapPin size={20} className="mr-2" />
                    <span>{show.location}</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <p className="text-sand text-sm mb-4 md:mb-0">{show.description}</p>
                  {show.soldOut ? (
                    <span className="text-rust font-bold uppercase">Sold Out</span>
                  ) : show.hasTickets ? (
                    <a
                      href={show.ticketsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-cream hover:text-rust transition-colors group"
                    >
                      <Ticket size={20} className="mr-2" />
                      <span>Get Tickets</span>
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {upcomingShows.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-sand">More dates coming soon!</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 border-t border-rust/30 pt-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-cream mb-4 vintage-shadow">
              Get Show Alerts
            </h2>
            <p className="text-sand mb-6">
              Subscribe to be notified when we announce new shows
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="relative flex-1 max-w-md w-full">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-sand" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={status === 'loading'}
                  className="w-full pl-12 pr-4 py-3 bg-cream/5 border border-rust/30 rounded-lg text-cream placeholder-sand/50 focus:outline-none focus:border-rust transition-colors disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-3 bg-rust/20 border border-rust text-cream rounded-lg hover:bg-rust/30 transition-colors disabled:opacity-50 font-semibold whitespace-nowrap"
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
        </motion.div>

      </div>
    </div>
  )
}

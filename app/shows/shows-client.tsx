'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Ticket, ChevronRight } from 'lucide-react'
import type { Show } from '@/types/content'
import { getDateParts, getWeekday } from '@/lib/dates'
import SubscribeForm from '@/app/components/subscribe-form'

interface ShowsPageProps {
  title: string
  shows: Show[]
  nextShowIndex: number
}

export default function ShowsClient({ title, shows, nextShowIndex }: ShowsPageProps) {
  return (
    <div className="min-h-screen px-4 pb-24 pt-32">
      <div className="mx-auto max-w-4xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 text-center"
        >
          <h1 className="font-display vintage-shadow text-5xl text-cream sm:text-6xl">{title}</h1>
          <div className="ornament mt-6 text-xl" aria-hidden="true">❦</div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-10 border-2 border-rust/30 bg-moss/30 px-5 py-4"
        >
          <SubscribeForm />
        </motion.div>

        <div className="space-y-5">
          {shows.map((show, index) => {
            const parts = getDateParts(show)
            const weekday = getWeekday(show)
            const isNext = index === nextShowIndex

            return (
              <motion.article
                key={`${show.date}-${show.venue}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`relative flex flex-col gap-5 border-2 p-6 transition-colors sm:flex-row sm:items-center sm:gap-8 ${
                  isNext
                    ? 'border-gold/70 bg-moss/50 shadow-[6px_6px_0_rgba(233,185,73,0.25)]'
                    : 'border-rust/30 bg-pine/40 hover:border-rust/60 hover:bg-moss/30'
                }`}
              >
                {isNext && (
                  <span className="absolute -top-3 left-5 bg-gold px-3 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-pine">
                    Next Show
                  </span>
                )}

                {/* Date block — torn off a wall calendar */}
                {parts ? (
                  <div className="flex shrink-0 items-center gap-4 sm:w-32 sm:flex-col sm:gap-0 sm:border-r-2 sm:border-rust/30 sm:pr-8 sm:text-center">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-rust">
                        {weekday?.slice(0, 3)} · {parts.month}
                      </p>
                      <p className="font-display text-5xl leading-none text-cream sm:text-6xl">{parts.day}</p>
                      <p className="mt-1 text-xs tracking-[0.2em] text-sand/60">{parts.year}</p>
                    </div>
                  </div>
                ) : (
                  <div className="shrink-0 sm:w-32 sm:border-r-2 sm:border-rust/30 sm:pr-8 sm:text-center">
                    <p className="font-display text-2xl text-cream">{show.date}</p>
                  </div>
                )}

                {/* Venue + details */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-2xl text-cream sm:text-3xl">{show.venue}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sand">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={16} className="shrink-0 text-rust" />
                      {show.location}
                    </span>
                    {show.time && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={16} className="shrink-0 text-rust" />
                        {show.time}
                      </span>
                    )}
                  </div>
                  {show.description && (
                    <p className="mt-3 text-sm italic leading-relaxed text-sand/80">{show.description}</p>
                  )}
                </div>

                {/* Tickets / status */}
                {(show.soldOut || show.hasTickets) && (
                  <div className="shrink-0 sm:self-center">
                    {show.soldOut ? (
                      <span className="font-bold uppercase tracking-[0.2em] text-burgundy">Sold Out</span>
                    ) : (
                      <a
                        href={show.ticketsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 border-2 border-gold/70 px-4 py-2 text-sm font-bold uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-pine"
                      >
                        <Ticket size={16} />
                        Tickets
                        <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </a>
                    )}
                  </div>
                )}
              </motion.article>
            )
          })}
        </div>

        {shows.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
            <p className="font-display text-2xl text-sand">Check back soon for more shows!</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Ticket, ChevronRight } from 'lucide-react'
import { ShowsContent } from '@/types/content'
import SubscribeForm from '@/app/components/subscribe-form'

interface ShowsPageProps {
  content: ShowsContent;
}

export default function ShowsClient({ content }: ShowsPageProps) {
  const { pageContent, upcomingShows } = content;

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
                  {show.time && (
                    <div className="flex items-center text-sand">
                      <Clock size={20} className="mr-2" />
                      <span>{show.time}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-cream mb-1">{show.venue}</h3>
                  <div className="flex items-center text-sand">
                    <MapPin size={20} className="mr-2" />
                    <span>{show.location}</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  {show.description && (
                    <p className="text-sand text-sm mb-4 md:mb-0">{show.description}</p>
                  )}
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
            <p className="text-2xl text-sand">Check back soon for more shows!</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 border-t border-rust/30 pt-12"
        >
          <div className="max-w-2xl mx-auto">
            <SubscribeForm />
          </div>
        </motion.div>

      </div>
    </div>
  )
}

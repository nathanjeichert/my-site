'use client'

import { motion } from 'framer-motion'
import { Music, Mic, Heart, Mountain } from 'lucide-react'
import { AboutContent } from '@/types/content'

interface AboutPageProps {
  content: AboutContent;
}

const colorMap = {
  rust: 'rust',
  sage: 'sage', 
  gold: 'gold',
  burgundy: 'burgundy'
};

export default function AboutClient({ content }: AboutPageProps) {
  const { pageContent, bandMembers, philosophy, timeline } = content;

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

        {/* Band Members Section */}
        <section className="grid md:grid-cols-2 gap-12 mb-20">
          {bandMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`bg-${member.color}/10 rounded-lg p-8`}
            >
              <div className={`w-full h-64 bg-${member.color === 'rust' ? 'sage' : 'rust'}/20 rounded-lg mb-6 flex items-center justify-center`}>
                {index === 0 ? (
                  <Music size={48} className="text-gold" />
                ) : (
                  <Mic size={48} className="text-gold" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gold mb-2">{member.name}</h3>
              <p className={`text-${member.color} mb-4`}>{member.role}</p>
              <p className="text-sand">
                {member.description}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Philosophy Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-rust mb-8">{pageContent.philosophyTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {philosophy.map((item, index) => {
              const icons = [Heart, Mountain, Music];
              const Icon = icons[index] || Music;
              
              return (
                <div key={index} className="text-center">
                  <Icon size={48} className="text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-cream mb-2">{item.title}</h3>
                  <p className="text-sand">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-sage mb-8">{pageContent.journeyTitle}</h2>
          <div className="space-y-8">
            {timeline.map((item, index) => {
              const colors = ['gold', 'rust', 'sage'];
              const color = colors[index % colors.length];
              
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-4 h-4 bg-${color} rounded-full mt-1`}></div>
                  <div>
                    <h3 className="text-xl font-bold text-cream">{item.year} - {item.title}</h3>
                    <p className="text-sand">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
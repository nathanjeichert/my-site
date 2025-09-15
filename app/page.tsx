'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Music, Calendar, Mail, Youtube, Instagram } from 'lucide-react'
import Image from 'next/image'

type ButtonItem = {
  href: string
  label: string
  type: 'internal' | 'external'
  variant: 'primary' | 'outline'
  icon?: LucideIcon
  target?: string
  rel?: string
}

const buttons: ButtonItem[] = [
  {
    href: '/music',
    label: 'Listen Now',
    type: 'internal',
    variant: 'primary',
    icon: Music,
  },
  {
    href: '/shows',
    label: 'See Us Live',
    type: 'internal',
    variant: 'outline',
    icon: Calendar,
  },
  {
    href: 'mailto:nathanjeichert@gmail.com',
    label: 'Contact Us',
    type: 'external',
    variant: 'outline',
    icon: Mail,
  },
  {
    href: 'https://www.youtube.com/channel/UCOpZMRlcndhoCcN1knIHIHA',
    label: 'YouTube',
    type: 'external',
    variant: 'outline',
    icon: Youtube,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  {
    href: 'https://www.instagram.com/northerndisconnection',
    label: 'Instagram',
    type: 'external',
    variant: 'outline',
    icon: Instagram,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
]

const buttonGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 1.1,
    },
  },
}

const buttonMotion = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Page() {
  return (
    <div className="min-h-screen overflow-hidden bg-\[#355E3B\] pt-20 text-cream">
      <section className="relative flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.35 }}
          className="pointer-events-none absolute inset-x-[-20%] top-6 h-[420px] rounded-full bg-[radial-gradient(circle_at_top,_rgba(244,196,48,0.15),_rgba(215,180,138,0.1)_45%,_transparent_75%)] blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.25, ease: 'easeOut' }}
            className="w-full max-w-3xl"
          >
            <Image
              src="/logowithtext.png"
              alt="Northern Disconnection"
              width={900}
              height={300}
              className="h-auto w-full drop-shadow-[0_20px_60px_rgba(244,196,48,0.15)]"
              priority
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className="max-w-2xl text-lg leading-relaxed text-sand sm:text-xl"
          >
            Northern Disconnection is a Bay Area band bringing familiar sounds in new directions and to new audiences.
          </motion.p>

          <motion.div
            variants={buttonGroup}
            initial="hidden"
            animate="visible"
            className="flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {buttons.map((button) => {
              const Icon = button.icon
              const classes =
                button.variant === 'primary'
                  ? 'retro-button flex items-center justify-center gap-2 px-8 py-3 text-base sm:text-lg'
                  : 'retro-button flex items-center justify-center gap-2 px-8 py-3 text-base sm:text-lg border-rust bg-transparent text-rust hover:bg-rust hover:text-midnight'

              return (
                <motion.div key={`${button.href}-${button.label}`} variants={buttonMotion}>
                  {button.type === 'internal' ? (
                    <Link href={button.href} className={classes}>
                      {Icon && <Icon size={18} />}
                      {button.label}
                    </Link>
                  ) : (
                    <a href={button.href} className={classes} target={button.target} rel={button.rel}>
                      {Icon && <Icon size={18} />}
                      {button.label}
                    </a>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Music, Calendar, Home, Users } from 'lucide-react'
import Image from 'next/image'

const HIDE_SCROLL_THRESHOLD = 120

const navItems = {
  '/': {
    name: 'home',
    icon: Home,
  },
  '/about': {
    name: 'about',
    icon: Users,
  },
  '/shows': {
    name: 'shows',
    icon: Calendar,
  },
  '/music': {
    name: 'music',
    icon: Music,
  },
}

export function Navbar() {
  const pathname = usePathname()
  const [isHidden, setIsHidden] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return

      ticking = true
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const scrollingDown = currentScrollY > lastScrollY.current
        const shouldHide = scrollingDown && currentScrollY > HIDE_SCROLL_THRESHOLD && !isHovering

        setIsHidden((prev) => {
          if (prev === shouldHide) {
            return prev
          }
          return shouldHide
        })

        lastScrollY.current = currentScrollY
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHovering])

  const handleMouseEnter = () => {
    setIsHovering(true)
    setIsHidden(false)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    lastScrollY.current = window.scrollY

    if (window.scrollY > HIDE_SCROLL_THRESHOLD) {
      setIsHidden(true)
    }
  }

  const navVisibilityClasses = isHidden && !isHovering ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-3" aria-hidden="true" />

      <nav
        className={`transform-gpu ${navVisibilityClasses} w-full border-b border-rust/30 bg-[#355E3B]/95 backdrop-blur-md transition-all duration-300 ease-out`}
        style={{ boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)' }}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full"
            >
              <Image
                src="/logonotext.svg"
                alt="Northern Disconnection Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </motion.div>
            <div>
              <h1 className="text-lg font-bold leading-tight text-rust transition-colors group-hover:text-cream">
                Northern Disconnection
              </h1>
            </div>
          </Link>

          <div className="flex items-center space-x-8">
            {Object.entries(navItems).map(([path, { name, icon: Icon }]) => {
              const isActive = pathname === path
              return (
                <Link key={path} href={path} className="group relative">
                  <div className="flex items-center space-x-2">
                    <Icon
                      size={20}
                      className={`transition-colors ${
                        isActive ? 'text-cream' : 'text-rust group-hover:text-cream'
                      }`}
                    />
                    <span
                      className={`hidden text-sm font-medium uppercase tracking-wider transition-colors sm:inline-block ${
                        isActive ? 'text-cream' : 'text-rust group-hover:text-cream'
                      }`}
                    >
                      {name}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[21px] left-0 right-0 h-[3px] bg-cream"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}

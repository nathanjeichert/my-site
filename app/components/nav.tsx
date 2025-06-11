'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Music, Calendar, Info, Home } from 'lucide-react'
import Image from 'next/image'

const navItems = {
  '/': {
    name: 'home',
    icon: Home,
  },
  '/about': {
    name: 'about',
    icon: Info,
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight/90 backdrop-blur-md border-b border-rust/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 rounded-full overflow-hidden"
            >
              <Image
                src="/logo.jpeg"
                alt="Two Against Nature Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div>
              <h1 className="text-cream font-bold text-lg leading-tight">Two Against</h1>
              <h2 className="text-rust text-sm">Nature</h2>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-8">
            {Object.entries(navItems).map(([path, { name, icon: Icon }]) => {
              const isActive = pathname === path
              return (
                <Link
                  key={path}
                  href={path}
                  className="relative group"
                >
                  <div className="flex items-center space-x-2">
                    <Icon 
                      size={20} 
                      className={`transition-colors ${
                        isActive ? 'text-gold' : 'text-cream group-hover:text-rust'
                      }`}
                    />
                    <span 
                      className={`hidden sm:inline-block text-sm font-medium uppercase tracking-wider transition-colors ${
                        isActive ? 'text-gold' : 'text-cream group-hover:text-rust'
                      }`}
                    >
                      {name}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[21px] left-0 right-0 h-[3px] bg-gold"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

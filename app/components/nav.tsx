'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Music, Calendar, Home } from 'lucide-react'
import Image from 'next/image'

const navItems = {
  '/': {
    name: 'home',
    icon: Home,
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
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-rust/30" style={{ backgroundColor: '#355E3B' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center p-1.5 bg-cream/10"
            >
              <Image
                src="/northern-disconnection-logo.svg"
                alt="Northern Disconnection Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <div>
              <h1 className="text-rust font-bold text-lg leading-tight">Northern Disconnection</h1>
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
                        isActive ? 'text-cream' : 'text-rust group-hover:text-cream'
                      }`}
                    />
                    <span 
                      className={`hidden sm:inline-block text-sm font-medium uppercase tracking-wider transition-colors ${
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

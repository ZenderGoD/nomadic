'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import GlassSurface from './GlassSurface'
import PillNav from './PillNav'

interface NavigationProps {
  isScrolled: boolean
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation({ isScrolled }: NavigationProps) {
  const [activeHref, setActiveHref] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['#home', '#about', '#portfolio', '#contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.querySelector(section)
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveHref(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2">
        <GlassSurface
          width="100%"
          height={isScrolled ? 64 : 80}
          borderRadius={isScrolled ? 16 : 20}
          brightness={isScrolled ? 40 : 30}
          opacity={isScrolled ? 0.85 : 0.7}
          blur={isScrolled ? 15 : 20}
          backgroundOpacity={isScrolled ? 0.1 : 0.05}
          displace={isScrolled ? 2 : 0}
          className="transition-all duration-300"
        >
          <div className="flex items-center justify-center md:justify-between h-full px-2 sm:px-3 md:px-6 gap-2 min-w-0 w-full">
            <div className="hidden md:flex flex-shrink-0">
              <PillNav
                items={navItems}
                activeHref={activeHref}
                baseColor="rgba(0, 0, 0, 0.3)"
                pillColor="rgba(255, 255, 255, 0.25)"
                hoveredPillTextColor="#ffffff"
                pillTextColor="rgba(255, 255, 255, 0.9)"
                ease="power2.easeOut"
                initialLoadAnimation={false}
                logo={undefined}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-xl font-light tracking-wider text-white/80 md:text-white/70 uppercase flex-shrink-0 whitespace-nowrap"
              style={{ fontFamily: 'Papyrus, "Apple Chancery", "Brush Script MT", cursive' }}
            >
              NOMADIC STUDIO
            </motion.div>
          </div>
        </GlassSurface>
      </div>
    </motion.nav>
  )
}


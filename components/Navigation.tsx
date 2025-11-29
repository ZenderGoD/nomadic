'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import GlassSurface from './GlassSurface'
import PillNav from './PillNav'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'

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
  const { theme } = useTheme()

  useEffect(() => {
    if (typeof window === 'undefined') return

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

  const content = (
    <div className="flex items-center justify-center md:justify-between h-full px-2 sm:px-3 md:px-6 gap-2 min-w-0 w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 flex-shrink-0"
      >
        <img
          src="/logo.png"
          alt="Nomadic Productions Logo"
          className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
          loading="eager"
        />
        <span className="text-base sm:text-lg md:text-xl font-light tracking-wider uppercase whitespace-nowrap" style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
          NOMADIC PRODUCTIONS
        </span>
      </motion.div>

      <div className="hidden md:flex flex-shrink-0 items-center gap-4">
        <PillNav
          items={navItems}
          activeHref={activeHref}
          baseColor={theme === 'light' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(0, 0, 0, 0.3)'}
          pillColor={theme === 'light' ? 'rgba(251, 191, 36, 0.25)' : 'rgba(255, 255, 255, 0.25)'}
          hoveredPillTextColor={theme === 'light' ? '#000000' : '#ffffff'}
          pillTextColor={theme === 'light' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)'}
          ease="power2.easeOut"
          initialLoadAnimation={false}
          logo={undefined}
        />
        <AnimatedThemeToggler />
      </div>
      <div className="md:hidden flex-shrink-0">
        <AnimatedThemeToggler />
      </div>
    </div>
  )

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8"
        animate={{
          paddingTop: isScrolled ? 8 : 0,
          paddingBottom: isScrolled ? 8 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <motion.div
          layout
          animate={{
            height: isScrolled ? 64 : 80,
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="relative"
        >
          <AnimatePresence initial={false}>
            {isScrolled ? (
              <motion.div
                key="glass"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute inset-0"
              >
                <motion.div
                  className="h-full"
                >
                  <GlassSurface
                    width="100%"
                    height={64}
                    borderRadius={0}
                    brightness={40}
                    opacity={0.85}
                    blur={15}
                    backgroundOpacity={0.1}
                    displace={2}
                  >
                    {content}
                  </GlassSurface>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="plain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="flex items-center h-full"
              >
                {content}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.nav>
  )
}


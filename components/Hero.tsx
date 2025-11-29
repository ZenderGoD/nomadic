'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { ProgressiveBlur } from './ui/progressive-blur'

// Lazy load Dither component (WebGL heavy)
const Dither = dynamic(() => import('./Dither'), {
  loading: () => (
    <div className="absolute inset-0 bg-background" />
  ),
  ssr: false,
})

export default function Hero() {
  const { theme } = useTheme()
  const scrollToNext = () => {
    const element = document.querySelector('#about')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dither Background */}
      <div className="absolute inset-0 z-0">
        <Dither
          baseColor={theme === 'light' ? [0.996, 0.953, 0.780] : [0.0, 0.0, 0.0]}
          waveColor={theme === 'light' ? [0.984, 0.749, 0.141] : [0.25, 0.25, 0.25]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.2}
          waveFrequency={2.5}
          waveSpeed={0.03}
        />
        {/* Top fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
        {/* Bottom fade overlay - smooth transition to next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-4 sm:mb-6"
          >
            <span className="block text-[#fbbf24] dark:text-white" style={{ color: '#fbbf24' }}>CINEMATIC</span>
            <span className="block text-[#fbbf24] dark:text-white/70" style={{ color: '#fbbf24' }}>STORYTELLING</span>
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl font-light tracking-wider max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
          style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}
        >
          Capturing moments that transcend time
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          onClick={scrollToNext}
          className="group flex items-center justify-center mx-auto text-sm font-light tracking-widest uppercase hover:text-[#fbbf24] dark:hover:text-white transition-colors"
          style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}
        >
          <span className="mr-2">Explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.button>
      </div>

      {/* Progressive Blur at bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <ProgressiveBlur height="20%" position="bottom" blurLevels={[0.5, 1, 2, 4, 8]} />
      </div>
    </section>
  )
}


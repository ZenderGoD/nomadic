'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import dynamic from 'next/dynamic'

// Lazy load Dither component (WebGL heavy)
const Dither = dynamic(() => import('./Dither'), {
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
  ),
  ssr: false,
})

export default function Hero() {
  const scrollToNext = () => {
    const element = document.querySelector('#about')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dither Background */}
      <div className="absolute inset-0 z-0">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
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
            <span className="block">CINEMATIC</span>
            <span className="block text-gray-400">STORYTELLING</span>
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 font-light tracking-wider max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
        >
          Capturing moments that transcend time
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          onClick={scrollToNext}
          className="group flex items-center justify-center mx-auto text-sm font-light tracking-widest uppercase hover:text-gray-300 transition-colors"
        >
          <span className="mr-2">Explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-white/30"
        />
      </motion.div>
    </section>
  )
}


'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTheme } from 'next-themes'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { theme } = useTheme()

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 sm:mb-8 tracking-tight dark:text-white" style={{ color: '#fbbf24' }}>
              About
            </h2>
            <div className="space-y-4 sm:space-y-6 font-light leading-relaxed">
              <p className="text-base sm:text-lg" style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
                With a passion for visual storytelling, I create cinematic
                experiences that capture the essence of every moment. Each frame
                is carefully crafted to evoke emotion and tell a compelling
                story.
              </p>
              <p className="text-base sm:text-lg" style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
                From intimate portraits to grand landscapes, our work spans
                across various genres, always maintaining a focus on artistic
                integrity and technical excellence.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80')] bg-cover bg-center opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-black/50 to-transparent" />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-gray-300 dark:border-gray-800"
        >
          {[
            { number: '50+', label: 'Projects' },
            { number: '10+', label: 'Years Experience' },
            { number: '100+', label: 'Clients' },
            { number: '25+', label: 'Awards' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-light mb-2 dark:text-white" style={{ color: '#fbbf24' }}>
                {stat.number}
              </div>
              <div className="text-sm tracking-wider uppercase" style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


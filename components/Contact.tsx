'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import ProfileCard from './ProfileCard'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-black to-black relative"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-2 sm:mb-4 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base md:text-lg">
            Let&apos;s create something extraordinary together
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-6 items-start md:items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center w-full"
          >
            <ProfileCard
              name="Nomadic Studio"
              title="Cinematic Storyteller"
              handle="nomadicstudio"
              status="Available"
              contactText="Contact Me"
              avatarUrl="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80"
              showUserInfo={true}
              enableTilt={typeof window !== 'undefined' && window.innerWidth >= 768}
              enableMobileTilt={false}
              instagramUrl="https://instagram.com/nomadicstudio"
              youtubeUrl="https://youtube.com/@nomadicstudio"
              onContactClick={() => {
                window.location.href = 'mailto:hello@example.com'
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center w-full"
          >
            <ProfileCard
              name="Harsvardhan"
              title="Cinematic Storyteller"
              handle="harsvardhan"
              status="Available"
              contactText="Contact Me"
              avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
              showUserInfo={true}
              enableTilt={typeof window !== 'undefined' && window.innerWidth >= 768}
              enableMobileTilt={false}
              instagramUrl="https://instagram.com/nomadicstudio"
              youtubeUrl="https://youtube.com/@nomadicstudio"
              onContactClick={() => {
                window.location.href = 'mailto:harsvardhan@example.com'
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center w-full"
          >
            <ProfileCard
              name="Mohith Raju"
              title="Cinematic Storyteller"
              handle="mohithraju"
              status="Available"
              contactText="Contact Me"
              avatarUrl="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"
              showUserInfo={true}
              enableTilt={typeof window !== 'undefined' && window.innerWidth >= 768}
              enableMobileTilt={false}
              instagramUrl="https://instagram.com/nomadicstudio"
              youtubeUrl="https://youtube.com/@nomadicstudio"
              onContactClick={() => {
                window.location.href = 'mailto:mohith@example.com'
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}


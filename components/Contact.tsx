'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send } from 'lucide-react'
import ProfileCard from './ProfileCard'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! I will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-black to-black relative"
    >
      <div className="max-w-6xl mx-auto w-full">
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
            Let's create something extraordinary together
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-20 items-start md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
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
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="bg-black/20 backdrop-blur-sm border-gray-800/30 shadow-lg/10">
              <CardHeader>
                <CardTitle className="text-white font-light text-xl">Send a Message</CardTitle>
                <CardDescription className="text-gray-400 font-light">
                  Fill out the form below and we'll get back to you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full bg-gray-900/50 border border-gray-800/50 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600/50 transition-colors font-light backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full bg-gray-900/50 border border-gray-800/50 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600/50 transition-colors font-light backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={6}
                      className="w-full bg-gray-900/50 border border-gray-800/50 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600/50 transition-colors font-light resize-none backdrop-blur-sm"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-sm font-light tracking-wider uppercase flex items-center justify-center space-x-2 hover:bg-white/20 hover:border-white/30 transition-all"
                  >
                    <span>Send Message</span>
                    <Send size={18} />
                  </motion.button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


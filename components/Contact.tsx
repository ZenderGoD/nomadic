'use client'

import { useTheme } from 'next-themes'
import ProfileCard from './ProfileCard'

export default function Contact() {
  const { theme } = useTheme()
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-background relative"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-2 sm:mb-4 tracking-tight dark:text-white" style={{ color: '#fbbf24' }}>
            Get In Touch
          </h2>
          <p className="font-light text-sm sm:text-base md:text-lg" style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
            Let&apos;s create something extraordinary together
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-6 items-start md:items-center w-full">
          <div className="flex justify-center w-full">
            <ProfileCard
              name="Nomadic Productions"
              title="Cinematic Storyteller"
              handle="nomadicstudio"
              status="Available"
              contactText="Contact Me"
              avatarUrl="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80"
              showUserInfo={true}
              enableTilt={false}
              enableMobileTilt={false}
              instagramUrl="https://instagram.com/nomadicstudio"
              youtubeUrl="https://youtube.com/@nomadicstudio"
              onContactClick={() => {
                window.location.href = 'mailto:hello@example.com'
              }}
            />
          </div>

          <div className="flex justify-center w-full">
            <ProfileCard
              name="Harsvardhan"
              title="Cinematic Storyteller"
              handle="harsvardhan"
              status="Available"
              contactText="Contact Me"
              avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
              showUserInfo={true}
              enableTilt={false}
              enableMobileTilt={false}
              instagramUrl="https://instagram.com/nomadicstudio"
              youtubeUrl="https://youtube.com/@nomadicstudio"
              onContactClick={() => {
                window.location.href = 'mailto:harsvardhan@example.com'
              }}
            />
          </div>

          <div className="flex justify-center w-full">
            <ProfileCard
              name="Mohith Raju"
              title="Cinematic Storyteller"
              handle="mohithraju"
              status="Available"
              contactText="Contact Me"
              avatarUrl="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"
              showUserInfo={true}
              enableTilt={false}
              enableMobileTilt={false}
              instagramUrl="https://instagram.com/nomadicstudio"
              youtubeUrl="https://youtube.com/@nomadicstudio"
              onContactClick={() => {
                window.location.href = 'mailto:mohith@example.com'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}


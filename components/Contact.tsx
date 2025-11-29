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
        <div className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-2 sm:mb-3 tracking-tight dark:text-white" style={{ color: '#fbbf24' }}>
            Get In Touch
          </h2>
          <p className="font-light text-sm sm:text-base md:text-lg" style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
            Let&apos;s create something extraordinary together
          </p>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-6 items-start md:items-center w-full overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 scrollbar-hide">
          <div className="flex justify-center flex-shrink-0 w-[280px] sm:w-full">
            <ProfileCard
              name="Nomadic Productions"
              title="Cinematic Storyteller"
              handle="nomadicstudio"
              status="Available"
              contactText="Contact Me"
              avatarUrl="/Logo.png"
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

          <div className="flex justify-center flex-shrink-0 w-[280px] sm:w-full">
            <ProfileCard
              name="Harsvardhan"
              title="Cinematic Storyteller"
              handle="harsvardhan"
              status="Available"
              contactText="Contact Me"
              avatarUrl="/IMG_9522.JPG"
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

          <div className="flex justify-center flex-shrink-0 w-[280px] sm:w-full">
            <ProfileCard
              name="Mohith Raju"
              title="Cinematic Storyteller"
              handle="mohithraju"
              status="Available"
              contactText="Contact Me"
              avatarUrl="/Screenshot%202025-11-29%20at%2015.46.14.png"
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

          <div className="flex justify-center flex-shrink-0 w-[280px] sm:w-full">
            <ProfileCard
              name="Gokul Krishna"
              title="Cinematic Storyteller"
              handle="gokulkrishna"
              status="Available"
              contactText="Contact Me"
              avatarUrl="/ACE5177B-02DB-40A5-BFFF-0F7516AC9904.JPG"
              showUserInfo={true}
              enableTilt={false}
              enableMobileTilt={false}
              instagramUrl="https://instagram.com/nomadicstudio"
              youtubeUrl="https://youtube.com/@nomadicstudio"
              onContactClick={() => {
                window.location.href = 'mailto:gokul@example.com'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}


'use client'

import { useRef, useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        // Autoplay may be blocked by browser, handle gracefully
        console.log('Autoplay prevented:', error)
      })
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  return (
    <section className="relative w-full bg-transparent py-8 px-4 sm:px-6 md:px-8">
      <div className="relative w-full max-w-7xl mx-auto group" style={{ aspectRatio: '16/9' }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-2xl overflow-hidden border border-transparent dark:border-[#fbbf24]"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Showreel 25 (2).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Custom mute/unmute button - hidden by default, visible on hover */}
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all duration-300 border border-white/20 opacity-0 group-hover:opacity-100"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX size={24} className="text-white" />
          ) : (
            <Volume2 size={24} className="text-white" />
          )}
        </button>
      </div>
    </section>
  )
}


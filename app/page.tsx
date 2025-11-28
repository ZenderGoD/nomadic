'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Lazy load heavy components with priority for Portfolio
const Portfolio = dynamic(() => import('@/components/Portfolio'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center">
        <div className="animate-pulse text-gray-400 mb-2">Loading portfolio...</div>
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-white/20 animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  ),
  ssr: false,
})

const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center">
        <div className="animate-pulse text-gray-400 mb-2">Loading contact...</div>
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-white/20 animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  ),
})

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [shouldLoadPortfolio, setShouldLoadPortfolio] = useState(false)
  const [shouldLoadContact, setShouldLoadContact] = useState(false)

  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') return

    // Preload Portfolio early for better performance
    const preloadPortfolio = () => {
      if (!shouldLoadPortfolio) {
        // Start loading Portfolio when user is near the About section
        const aboutSection = document.querySelector('#about')
        if (aboutSection) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting && !shouldLoadPortfolio) {
                  setShouldLoadPortfolio(true)
                }
              })
            },
            { rootMargin: '200px' } // Start loading 200px before it's visible
          )
          observer.observe(aboutSection)
          return () => observer.disconnect()
        }
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Load portfolio when user scrolls past hero (earlier trigger)
      if (window.scrollY > window.innerHeight * 0.3 && !shouldLoadPortfolio) {
        setShouldLoadPortfolio(true)
      }
      
      // Load contact only after portfolio is loaded and user scrolls further
      if (shouldLoadPortfolio && window.scrollY > window.innerHeight * 2 && !shouldLoadContact) {
        setShouldLoadContact(true)
      }
    }
    
    // Initial check
    handleScroll()
    preloadPortfolio()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [shouldLoadPortfolio, shouldLoadContact])

  return (
    <main className="relative w-full overflow-x-hidden">
      <Navigation isScrolled={isScrolled} />
      <Hero />
      <About />
      {shouldLoadPortfolio && (
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading portfolio...</div>
          </div>
        }>
          <Portfolio />
        </Suspense>
      )}
      {/* Smooth transition gradient between Portfolio and Contact */}
      {shouldLoadContact && (
        <div className="h-32 bg-gradient-to-b from-black via-gray-950 to-black" />
      )}
      {shouldLoadContact && (
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Loading contact...</div>
          </div>
        }>
          <Contact />
        </Suspense>
      )}
      <Footer />
    </main>
  )
}


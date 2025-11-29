'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Showreel from '@/components/Showreel'

// Lazy load heavy components with priority for Portfolio
const Portfolio = dynamic(() => import('@/components/Portfolio'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center">
        <div className="animate-pulse text-black dark:text-white mb-2">Loading portfolio...</div>
        <div className="w-48 h-1 bg-gray-300 dark:bg-gray-800 rounded-full overflow-hidden mx-auto">
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
        <div className="animate-pulse text-black dark:text-white mb-2">Loading contact...</div>
        <div className="w-48 h-1 bg-gray-300 dark:bg-gray-800 rounded-full overflow-hidden mx-auto">
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
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') return

    // Listen for navigation events to trigger lazy loading
    const handleNavigateToSection = (e: CustomEvent) => {
      const href = e.detail?.href
      if (href === '#contact' && !shouldLoadContact) {
        setShouldLoadContact(true)
      } else if (href === '#portfolio' && !shouldLoadPortfolio) {
        setShouldLoadPortfolio(true)
      }
    }

    window.addEventListener('navigateToSection', handleNavigateToSection as EventListener)

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
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('navigateToSection', handleNavigateToSection as EventListener)
    }
  }, [shouldLoadPortfolio, shouldLoadContact])

  if (!isMounted) {
    return null
  }

  return (
    <main className="relative w-full overflow-x-hidden">
      <Navigation isScrolled={isScrolled} />
      <div className="relative">
        <Hero />
        <Showreel />
        <About />
        {shouldLoadPortfolio && (
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-pulse text-black dark:text-white">Loading portfolio...</div>
            </div>
          }>
            <Portfolio />
          </Suspense>
        )}
        {shouldLoadContact && (
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-pulse text-black dark:text-white">Loading contact...</div>
            </div>
          }>
            <Contact />
          </Suspense>
        )}
        <Footer />
      </div>
    </main>
  )
}


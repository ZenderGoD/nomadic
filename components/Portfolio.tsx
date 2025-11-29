'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback, Suspense } from 'react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { X, Grid3x3, Sparkles, ChevronUp, ChevronDown, Heart, MessageCircle, Share2 } from 'lucide-react'
import Masonry from './Masonry'
import { Switch } from './ui/switch'
import { ProgressiveBlur } from './ui/progressive-blur'

// Lazy load InfiniteMenu only when creative view is selected
const InfiniteMenu = dynamic(() => import('./InfiniteMenu'), {
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-black dark:text-white">Loading 3D view...</div>
    </div>
  ),
  ssr: false,
})

const projects = [
  {
    id: 1,
    title: 'RR Version 1',
    category: 'Project',
    image: '/contents/RR Version 1.gif',
    description: 'Creative visual exploration',
  },
  {
    id: 2,
    title: 'RR N3',
    category: 'Project',
    image: '/contents/RR N3.gif',
    description: 'Visual narrative piece',
  },
  {
    id: 3,
    title: 'RR N2',
    category: 'Project',
    image: '/contents/RR N2.gif',
    description: 'Creative expression',
  },
  {
    id: 4,
    title: 'RR N1',
    category: 'Project',
    image: '/contents/RR N1.gif',
    description: 'Visual storytelling',
  },
  {
    id: 5,
    title: 'RR Den3',
    category: 'Project',
    image: '/contents/RR Den3.gif',
    description: 'Cinematic exploration',
  },
  {
    id: 6,
    title: 'RR C2',
    category: 'Project',
    image: '/contents/RR C2.gif',
    description: 'Creative vision',
  },
  {
    id: 7,
    title: 'RR A2',
    category: 'Project',
    image: '/contents/RR A2.gif',
    description: 'Visual narrative',
  },
  {
    id: 8,
    title: 'RR A1',
    category: 'Project',
    image: '/contents/RR A1.gif',
    description: 'Artistic expression',
  },
  {
    id: 9,
    title: 'Music Reference Draft',
    category: 'Music',
    image: '/contents/Music Reference Draft.gif',
    description: 'Musical visual reference',
  },
  {
    id: 10,
    title: 'Image',
    category: 'Project',
    image: '/contents/Image.gif',
    description: 'Visual exploration',
  },
  {
    id: 11,
    title: 'Draft 1',
    category: 'Project',
    image: '/contents/Draft 1.gif',
    description: 'Creative draft',
  },
]

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { theme } = useTheme()
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isCreativeView, setIsCreativeView] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Navigate function that can be used by buttons and keyboard
  const navigate = useCallback((direction: 'next' | 'prev', isAutoScroll = false) => {
    if (isScrolling.current) return
    
    // Pause auto-scroll if user manually navigates
    if (!isAutoScroll) {
      setIsPaused(true)
      // Resume after 10 seconds of inactivity
      setTimeout(() => {
        setIsPaused(false)
      }, 10000)
    }
    
    isScrolling.current = true
    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % projects.length
      } else {
        const prevIndex = prev - 1
        return prevIndex < 0 ? projects.length - 1 : prevIndex
      }
    })

    // Reset scroll lock after animation (reduced from 600ms to 400ms for better responsiveness)
    setTimeout(() => {
      isScrolling.current = false
    }, 400)
  }, [])
  
  // Force normal view on mobile
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsCreativeView(false)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initialize current index when preview opens
  useEffect(() => {
    if (selectedProject !== null) {
      const initialIndex = projects.findIndex(p => p.id === selectedProject)
      if (initialIndex !== -1) {
        setCurrentIndex(initialIndex)
      }
      setIsLiked(false) // Reset like state for new video
    } else {
      // Reset when closing
      setCurrentIndex(0)
      setIsLiked(false)
      setIsPaused(false)
    }
  }, [selectedProject])

  // Auto-scroll functionality
  useEffect(() => {
    if (selectedProject === null || isPaused) {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current)
        autoScrollTimerRef.current = null
      }
      return
    }

    // Auto-scroll to next video after 5 seconds (adjustable)
    autoScrollTimerRef.current = setTimeout(() => {
      if (!isScrolling.current && !isPaused) {
        navigate('next', true) // Pass true to indicate auto-scroll
        setIsLiked(false) // Reset like when auto-scrolling
      }
    }, 5000) // 5 seconds per video

    return () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current)
        autoScrollTimerRef.current = null
      }
    }
  }, [currentIndex, selectedProject, isPaused, navigate])

  // Handle preview mode navigation and keyboard
  useEffect(() => {
    if (selectedProject === null) {
      document.body.style.overflow = ''
      return
    }

    // Prevent body scroll when in preview
    document.body.style.overflow = 'hidden'

    // Handle keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        navigate('next', false) // User interaction, pause auto-scroll
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        navigate('prev', false) // User interaction, pause auto-scroll
      }
    }

    // Handle wheel/scroll events with debouncing
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      // Clear existing timeout
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current)
      }
      
      // Debounce wheel events
      wheelTimeoutRef.current = setTimeout(() => {
        if (Math.abs(e.deltaY) > 10) {
          if (e.deltaY > 0) {
            navigate('next', false) // User interaction, pause auto-scroll
          } else {
            navigate('prev', false) // User interaction, pause auto-scroll
          }
        }
      }, 50)
    }

    // Handle touch events for mobile
    let touchStartY = 0
    let touchStartTime = 0
    let isTouchActive = false
    
    const handleTouchStart = (e: TouchEvent) => {
      if (isScrolling.current) return
      touchStartY = e.touches[0].clientY
      touchStartTime = Date.now()
      isTouchActive = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouchActive) return
      // Prevent default scrolling while swiping
      e.preventDefault()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isTouchActive || isScrolling.current) {
        isTouchActive = false
        return
      }
      
      const touchEndY = e.changedTouches[0].clientY
      const touchEndTime = Date.now()
      const diff = touchStartY - touchEndY
      const timeDiff = touchEndTime - touchStartTime
      
      // More sensitive threshold (30px instead of 50px) and check for quick swipe
      const minSwipeDistance = 30
      const maxSwipeTime = 300 // milliseconds
      
      if (Math.abs(diff) > minSwipeDistance && timeDiff < maxSwipeTime) {
        if (diff > 0) {
          // Swipe up - next
          navigate('next', false) // User interaction, pause auto-scroll
        } else {
          // Swipe down - previous
          navigate('prev', false) // User interaction, pause auto-scroll
        }
      }
      
      isTouchActive = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      document.body.style.overflow = ''
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current)
        wheelTimeoutRef.current = null
      }
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [selectedProject, navigate])

  // Convert projects to InfiniteMenu format
  const menuItems = projects.map(project => ({
    image: project.image,
    link: `#project-${project.id}`,
    title: project.title,
    description: project.description || project.category,
  }))

  // Convert projects to Masonry format with varied heights
  const masonryItems = projects.map((project, index) => ({
    id: project.id.toString(),
    img: project.image,
    url: `#project-${project.id}`,
    height: [400, 300, 500, 350, 450, 320, 380, 420, 360, 440, 340][index % 11], // Varied heights for masonry effect
  }))

  return (
    <section
      id="portfolio"
      ref={ref}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-background relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-2 sm:mb-4 tracking-tight dark:text-white" style={{ color: '#fbbf24' }}>
                Portfolio
              </h2>
              <p className="font-light text-sm sm:text-base md:text-lg" style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
                A selection of recent work
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 rounded-sm p-1 bg-transparent dark:bg-transparent">
              <div className="flex items-center gap-2 px-3">
                <Grid3x3 size={16} style={{ color: theme === 'light' ? (isCreativeView ? 'rgba(0, 0, 0, 0.5)' : '#000000') : (isCreativeView ? 'rgba(255, 255, 255, 0.5)' : '#ffffff') }} />
                <span className="font-light text-sm tracking-wider transition-colors" style={{ color: theme === 'light' ? (isCreativeView ? 'rgba(0, 0, 0, 0.5)' : '#000000') : (isCreativeView ? 'rgba(255, 255, 255, 0.5)' : '#ffffff') }}>
                  Normal
                </span>
              </div>
              <Switch
                checked={isCreativeView}
                onCheckedChange={setIsCreativeView}
                className="data-[state=checked]:bg-[#fbbf24] data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600"
              />
              <div className="flex items-center gap-2 px-3">
                <Sparkles size={16} style={{ color: theme === 'light' ? (isCreativeView ? '#000000' : 'rgba(0, 0, 0, 0.5)') : (isCreativeView ? '#ffffff' : 'rgba(255, 255, 255, 0.5)') }} />
                <span className="font-light text-sm tracking-wider transition-colors" style={{ color: theme === 'light' ? (isCreativeView ? '#000000' : 'rgba(0, 0, 0, 0.5)') : (isCreativeView ? '#ffffff' : 'rgba(255, 255, 255, 0.5)') }}>
                  Creative
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {isCreativeView ? (
          <div style={{ height: '600px', position: 'relative' }}>
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-pulse" style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>Loading 3D view...</div>
              </div>
            }>
              <InfiniteMenu items={menuItems} />
            </Suspense>
          </div>
        ) : (
          <div className="w-full">
            <Masonry
              items={masonryItems}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={false}
              enableTilt={true}
              enableMagnetism={false}
              clickEffect={true}
              glowColor="132, 0, 255"
              onItemClick={(id) => setSelectedProject(parseInt(id))}
            />
          </div>
        )}
      </div>

      {/* Instagram Reels-like Preview */}
      {selectedProject && (
        <motion.div
          ref={previewRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
            aria-label="Close preview"
          >
            <X size={24} className="text-white" />
          </button>

          {/* Video Container with smooth transitions */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {projects.map((project, index) => {
              const isActive = index === currentIndex
              return (
                <motion.div
                  key={project.id}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.95,
                    y: isActive ? 0 : (index < currentIndex ? -20 : 20),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className={`absolute inset-0 flex items-center justify-center ${
                    isActive ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                >
                  <div className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center px-4">
                    <div className="relative w-full" style={{ aspectRatio: '9/16', maxHeight: '100%' }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain"
                        loading="eager"
                      />
                      {/* Navigation and Action Buttons - stacked vertically on right side */}
                      {isActive && (
                        <div className="absolute bottom-24 right-4 z-20 flex flex-col items-center gap-4">
                          {/* Navigation Buttons */}
                          <button
                            onClick={() => {
                              navigate('prev', false) // User interaction, pause auto-scroll
                            }}
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 active:scale-95"
                            aria-label="Previous"
                          >
                            <ChevronUp size={24} className="text-white" />
                          </button>

                          <button
                            onClick={() => {
                              navigate('next', false) // User interaction, pause auto-scroll
                            }}
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 active:scale-95"
                            aria-label="Next"
                          >
                            <ChevronDown size={24} className="text-white" />
                          </button>

                          {/* Action Buttons (Like, Comment, Share) - Instagram style */}
                          <button
                            onClick={() => {
                              setIsLiked(!isLiked)
                              setIsPaused(true)
                              setTimeout(() => setIsPaused(false), 10000)
                            }}
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 active:scale-95"
                            aria-label="Like"
                          >
                            <Heart
                              size={24}
                              className={`text-white transition-all ${
                                isLiked ? 'fill-red-500 text-red-500' : ''
                              }`}
                            />
                          </button>
                          <button
                            onClick={() => {
                              setIsPaused(true)
                              setTimeout(() => setIsPaused(false), 10000)
                              // Comment functionality can be added here
                            }}
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 active:scale-95"
                            aria-label="Comment"
                          >
                            <MessageCircle size={24} className="text-white" />
                          </button>
                          <button
                            onClick={() => {
                              setIsPaused(true)
                              setTimeout(() => setIsPaused(false), 10000)
                              // Share functionality can be added here
                              if (navigator.share) {
                                navigator.share({
                                  title: project.title,
                                  text: project.description,
                                  url: window.location.href,
                                })
                              }
                            }}
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 active:scale-95"
                            aria-label="Share"
                          >
                            <Share2 size={24} className="text-white" />
                          </button>
                        </div>
                      )}

                      {/* Project Info Overlay - positioned relative to image */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none"
                          style={{
                            background: 'none',
                            backgroundColor: 'transparent',
                          }}
                        >
                          <h3 className="text-white text-xl font-semibold mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            {project.title}
                          </h3>
                          <p className="text-white/80 text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            {project.description}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-white'
                      : 'w-1 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Hints */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
          >
            <p className="text-white/60 text-xs text-center">
              Scroll to navigate • Press ESC to close
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Progressive Blur at bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <ProgressiveBlur height="20%" position="bottom" blurLevels={[0.5, 1, 2, 4, 8]} />
      </div>
    </section>
  )
}


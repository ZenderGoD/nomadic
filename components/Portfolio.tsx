'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { X, Grid3x3, Sparkles } from 'lucide-react'
import Masonry from './Masonry'

// Lazy load InfiniteMenu only when creative view is selected
const InfiniteMenu = dynamic(() => import('./InfiniteMenu'), {
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading 3D view...</div>
    </div>
  ),
  ssr: false,
})

const projects = [
  {
    id: 1,
    title: 'Documentary Series',
    category: 'Documentary',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
    description: 'A compelling exploration of human stories',
  },
  {
    id: 2,
    title: 'Commercial Campaign',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    description: 'Brand storytelling through visual narrative',
  },
  {
    id: 3,
    title: 'Short Film',
    category: 'Narrative',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    description: 'Cinematic storytelling at its finest',
  },
  {
    id: 4,
    title: 'Music Video',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    description: 'Visual rhythm meets musical expression',
  },
  {
    id: 5,
    title: 'Brand Film',
    category: 'Brand',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    description: 'Elevating brands through cinematic vision',
  },
  {
    id: 6,
    title: 'Event Coverage',
    category: 'Event',
    image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=800&q=80',
    description: 'Capturing moments that matter',
  },
]

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isCreativeView, setIsCreativeView] = useState(false)
  
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
    height: [400, 300, 500, 350, 450, 320][index % 6], // Varied heights for masonry effect
  }))

  return (
    <section
      id="portfolio"
      ref={ref}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-950 to-black relative"
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-2 sm:mb-4 tracking-tight">
                Portfolio
              </h2>
              <p className="text-gray-400 font-light text-sm sm:text-base md:text-lg">
                A selection of recent work
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 border border-gray-800 rounded-sm p-1">
              <button
                onClick={() => setIsCreativeView(false)}
                className={`px-4 py-2 rounded-sm font-light text-sm tracking-wider transition-all flex items-center gap-2 ${
                  !isCreativeView
                    ? 'bg-white text-black'
                    : 'bg-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Grid3x3 size={16} />
                <span>Normal</span>
              </button>
              <button
                onClick={() => setIsCreativeView(true)}
                className={`px-4 py-2 rounded-sm font-light text-sm tracking-wider transition-all flex items-center gap-2 ${
                  isCreativeView
                    ? 'bg-white text-black'
                    : 'bg-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Sparkles size={16} />
                <span>Creative</span>
              </button>
            </div>
          </div>
        </motion.div>

        {isCreativeView ? (
          <div style={{ height: '600px', position: 'relative' }}>
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-pulse text-gray-400">Loading 3D view...</div>
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

      {/* Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl w-full aspect-video bg-gray-900 rounded-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-400">Video player would go here</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}


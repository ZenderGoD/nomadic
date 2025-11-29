'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import LogoLoop from './LogoLoop'
import TrueFocus from './TrueFocus'
import { 
  SiGmail, 
  SiYoutube, 
  SiInstagram, 
  SiLinkedin, 
  SiBehance,
  SiDribbble,
  SiVimeo,
  SiTiktok
} from 'react-icons/si'

const socialLogos = [
  { node: <SiGmail />, title: 'Gmail', href: 'mailto:hello@example.com' },
  { node: <SiYoutube />, title: 'YouTube', href: 'https://youtube.com/@nomadicstudio' },
  { node: <SiInstagram />, title: 'Instagram', href: 'https://instagram.com/nomadicstudio' },
  { node: <SiLinkedin />, title: 'LinkedIn', href: 'https://linkedin.com/company/nomadicstudio' },
  { node: <SiBehance />, title: 'Behance', href: 'https://behance.net/nomadicstudio' },
  { node: <SiDribbble />, title: 'Dribbble', href: 'https://dribbble.com/nomadicstudio' },
  { node: <SiVimeo />, title: 'Vimeo', href: 'https://vimeo.com/nomadicstudio' },
  { node: <SiTiktok />, title: 'TikTok', href: 'https://tiktok.com/@nomadicstudio' },
]

const companyLogos = [
  { src: '/RARE.PNG', alt: 'RARE', title: 'RARE' },
  { src: '/unnamed-2.jpg', alt: 'Company Logo', title: 'Company' },
  { src: '/Untitled-1.png', alt: 'Company Logo', title: 'Company' },
]

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <footer
      ref={ref}
      className="py-8 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div style={{ height: '60px', position: 'relative', overflow: 'hidden' }} className="sm:h-20">
            <LogoLoop
              logos={socialLogos}
              speed={80}
              direction="left"
              logoHeight={32}
              gap={32}
              hoverSpeed={20}
              scaleOnHover
              fadeOut
              ariaLabel="Social media links"
            />
          </div>

          <div 
            style={{ 
              height: '60px', 
              position: 'relative', 
              overflowX: 'auto', 
              overflowY: 'hidden',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch'
            }} 
            className="sm:h-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex items-center justify-center"
          >
            <div className="flex items-center gap-8 h-full min-w-max px-4">
              {companyLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-8 w-auto object-contain flex-shrink-0"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              ))}
            </div>
          </div>

          <div className="text-center pt-4">
            <div className="flex justify-center">
              <TrueFocus 
                sentence="Made by Bishal Banerjee for Harsvardhan and Mohith Raju"
                manualMode={false}
                blurAmount={2}
                borderColor="black"
                animationDuration={1.95}
                pauseBetweenAnimations={0.0005}
                textColor="#fbbf24"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}


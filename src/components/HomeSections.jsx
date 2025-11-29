import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import pic5 from '../statics/pic5.jpg'
import pic6 from '../statics/pic6.jpg'
import pic7 from '../statics/pic7.jpg'
import pic8 from '../statics/pic8.jpg'

const HomeSections = () => {
  const [scrollY, setScrollY] = useState(0)
  const sectionRefs = useRef([])

  const sections = [
    {
      id: 1,
      image: pic5,
      label: 'About Us',
      link: '/about',
    },
    {
      id: 2,
      image: pic6,
      label: 'Why Us',
      link: '/why-us',
    },
    {
      id: 3,
      image: pic7,
      label: 'Our Business',
      link: '/business',
    },
    {
      id: 4,
      image: pic8,
      label: 'Our Projects',
      link: '/projects',
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getSectionTransform = (index) => {
    const section = sectionRefs.current[index]
    if (!section) return { translateY: 0, opacity: 0, scale: 1 }

    const rect = section.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const sectionTop = rect.top
    const sectionHeight = rect.height
    const sectionCenter = sectionTop + sectionHeight / 2

    // Calculate how much of the section is visible
    const visibleHeight = Math.min(windowHeight, sectionTop + sectionHeight) - Math.max(0, sectionTop)
    const visibilityRatio = Math.max(0, Math.min(1, visibleHeight / windowHeight))

    // Use parallax effect for all sections (same as section 2)
    const parallaxOffset = (sectionTop / windowHeight) * 50
    return {
      translateY: parallaxOffset,
      opacity: visibilityRatio,
      scale: 1,
    }
  }

  return (
    <div>
      {sections.map((section, index) => {
        const transform = getSectionTransform(index)
        return (
          <section
            key={section.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="w-full h-screen relative overflow-hidden"
          >
            <img
              src={section.image}
              alt={`Section ${section.id}`}
              className="w-full h-full object-cover transition-all duration-500 ease-out"
              style={{
                transform: `translateY(${transform.translateY || 0}px) translateX(${transform.translateX || 0}px) scale(${transform.scale})`,
                opacity: transform.opacity,
              }}
            />
            {/* Label Overlay - Alternating left/right positions */}
            <div className={`absolute inset-0 flex items-center z-10 px-8 md:px-16 ${
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}>
              <Link
                to={section.link}
                className={`relative group ${
                  index % 2 === 1 ? 'text-right' : 'text-left'
                }`}
                style={{
                  opacity: transform.opacity,
                }}
              >
                {/* Text */}
                <span className="relative text-white text-5xl md:text-6xl lg:text-7xl font-black transition-all duration-300 hover:scale-110 z-10 block"
                  style={{
                    textShadow: '0 6px 30px rgba(0, 0, 0, 0.9), 0 4px 15px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.7)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {section.label}
                </span>
              </Link>
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default HomeSections


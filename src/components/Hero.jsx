import React, { useState, useEffect } from 'react'
import pic20 from '../statics/pic23.jpg'

const Hero = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate opacity based on scroll position (fade out over 300px)
  const opacity = Math.max(0, 1 - scrollY / 300)
  
  // Calculate zoom scale based on scroll position
  // Starts at 1.2 (zoomed in) and zooms out to 1.0 as you scroll
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  const maxScroll = heroHeight
  const scrollRatio = Math.min(scrollY / maxScroll, 1)
  const imageScale = 1.2 - (scrollRatio * 0.2) // Scale from 1.2 to 1.0

  return (
    <section id="home" className="relative h-screen min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={pic20}
          alt="Wintech Project Sdn Bhd"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${imageScale})`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="text-center" style={{ opacity }}>
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-red-600"
            style={{
              textShadow: `
                -1px -1px 0px rgba(0, 0, 0, 0.7),
                1px 1px 0px rgba(255, 255, 255, 0.4),
                -2px -2px 0px rgba(0, 0, 0, 0.6),
                2px 2px 0px rgba(255, 255, 255, 0.3),
                -3px -3px 2px rgba(0, 0, 0, 0.5),
                3px 3px 2px rgba(255, 255, 255, 0.2),
                0 0 30px rgba(220, 38, 38, 0.6),
                0 0 60px rgba(220, 38, 38, 0.4)
              `,
              fontWeight: '900',
              letterSpacing: '0.05em',
            }}
          >
            Wintech Project SDN BHD
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium italic opacity-90 text-white">
            Specialize in glass and aluminium
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero

import React, { useState, useEffect } from 'react'
import pic3 from '../statics/pic3.jpg'

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
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `url(${pic3})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: `scale(${imageScale})`,
          }}
        />
        {/* Shader/Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="text-center" style={{ opacity }}>
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-red-600"
            style={{
              textShadow: '0 0 30px rgba(220, 38, 38, 0.6), 0 0 60px rgba(220, 38, 38, 0.4)',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              fontWeight: '900',
              letterSpacing: '0.05em',
            }}
          >
            Wintech Project SDN BHD
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium italic opacity-90 text-white">
            Excellence in Aluminum Construction
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero

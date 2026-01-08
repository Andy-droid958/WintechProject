import React, { useState, useEffect } from 'react'
import pic20 from '../statics/pic3.jpg'

const Hero = () => {
  const [scrollY, setScrollY] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Preload image
  useEffect(() => {
    const img = new Image()
    img.src = pic20
    img.onload = () => setImageLoaded(true)
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
      <div className="absolute inset-0 overflow-hidden z-0">
        <img
          src={pic20}
          alt="Wintech Project Sdn Bhd"
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: `scale(${imageScale})`,
          }}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none"></div>

      {/* Shader Overlay with reduced opacity */}
      <div 
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(107, 114, 128, 0.4) 0%,
            rgba(75, 85, 99, 0.3) 25%,
            rgba(107, 114, 128, 0.4) 50%,
            rgba(75, 85, 99, 0.3) 75%,
            rgba(107, 114, 128, 0.4) 100%
          )`,
          backgroundSize: '200% 200%',
          animation: 'shaderWave 8s ease infinite',
        }}
      ></div>

      {/* Content */}
      <div className={`relative z-[3] h-full flex items-center justify-center px-4 transition-opacity duration-300 ${
        imageLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="text-center" style={{ opacity }}>
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-red-600"
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

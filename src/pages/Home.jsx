import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HomeSections from '../components/HomeSections'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const heroHeight = window.innerHeight
      setIsScrolled(scrollPosition >= heroHeight - 50)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Always show navbar on mobile/tablet at top, conditionally on desktop */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <Navbar isInHero={true} />
      </div>
      <div className="relative h-screen">
        <Hero />
        {!isScrolled && (
          <div className="hidden lg:block absolute bottom-0 left-0 right-0 z-50">
            <Navbar isInHero={true} />
          </div>
        )}
      </div>
      {isScrolled && (
        <div className="hidden lg:block sticky top-0 z-50">
          <Navbar isInHero={true} />
        </div>
      )}
      <HomeSections />
      <ContactSection />
      <Footer />
    </>
  )
}

export default Home


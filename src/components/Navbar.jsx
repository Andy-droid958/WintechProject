import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ isInHero = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  // Scroll detection for homepage hero navbar
  useEffect(() => {
    if (isInHero) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY
        // Change navbar style when scrolled past hero section (viewport height)
        const heroHeight = window.innerHeight
        setIsScrolled(scrollPosition >= heroHeight - 50)
      }

      window.addEventListener('scroll', handleScroll)
      // Check initial scroll position
      handleScroll()
      
      return () => window.removeEventListener('scroll', handleScroll)
    } else {
      // For other pages, navbar is always visible with background
      setIsScrolled(true)
    }
  }, [isInHero])

  // Determine navbar classes based on scroll state and location
  const navClasses = isInHero
    ? isScrolled
      ? 'bg-white shadow-md py-4 sticky top-0 z-50 transition-all duration-300'
      : 'bg-white lg:bg-transparent py-4 lg:fixed top-0 left-0 right-0 z-50 transition-all duration-300 lg:absolute lg:bottom-0 lg:top-auto'
    : 'bg-white shadow-sm py-4 sticky top-0 z-50'

  const linkClasses = (isActivePath) => {
    const baseClasses = `font-bold text-lg transition-colors relative ${
      isActivePath ? 'text-primary' : ''
    }`
    if (isInHero && !isScrolled) {
      return `${baseClasses} text-gray-900 lg:text-white hover:text-primary`
    }
    return `${baseClasses} text-gray-900 hover:text-primary`
  }

  const mobileMenuButtonClasses = 'bg-gray-900'

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex flex-col items-center">
            <h1 
              className={`text-2xl font-bold ${
                isInHero && !isScrolled ? 'text-red-600 lg:text-white' : 'text-red-600'
              }`}
              style={{
                fontWeight: '900',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                lineHeight: '0.9',
              }}
            >
              <span className="block text-center">Wintech</span>
              <span className="block text-center">Project</span>
            </h1>
          </Link>
          
          <div className={`hidden lg:flex items-center gap-8`}>
            <Link
              to="/"
              className={linkClasses(isActive('/'))}
            >
              Home
              {isActive('/') && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  isInHero && !isScrolled ? 'bg-primary lg:bg-white' : 'bg-primary'
                }`}></span>
              )}
            </Link>
            <Link
              to="/about"
              className={linkClasses(isActive('/about'))}
            >
              About Us
              {isActive('/about') && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  isInHero && !isScrolled ? 'bg-primary lg:bg-white' : 'bg-primary'
                }`}></span>
              )}
            </Link>
            <Link
              to="/why-us"
              className={linkClasses(isActive('/why-us'))}
            >
              Why Us
              {isActive('/why-us') && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  isInHero && !isScrolled ? 'bg-primary lg:bg-white' : 'bg-primary'
                }`}></span>
              )}
            </Link>
            <Link
              to="/business"
              className={linkClasses(isActive('/business'))}
            >
              Our Business
              {isActive('/business') && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  isInHero && !isScrolled ? 'bg-primary lg:bg-white' : 'bg-primary'
                }`}></span>
              )}
            </Link>
            <Link
              to="/projects"
              className={linkClasses(isActive('/projects'))}
            >
              Our Projects
              {isActive('/projects') && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  isInHero && !isScrolled ? 'bg-primary lg:bg-white' : 'bg-primary'
                }`}></span>
              )}
            </Link>
            <Link
              to="/contact"
              className={linkClasses(isActive('/contact'))}
            >
              Contact
              {isActive('/contact') && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  isInHero && !isScrolled ? 'bg-primary lg:bg-white' : 'bg-primary'
                }`}></span>
              )}
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-1 p-2"
          >
            <span className={`w-6 h-0.5 ${mobileMenuButtonClasses} transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 ${mobileMenuButtonClasses} transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 ${mobileMenuButtonClasses} transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed ${
            isInHero && !isScrolled ? 'top-[73px]' : 'top-[73px]'
          } left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col p-6 gap-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`text-gray-900 font-bold text-lg py-2 border-b border-gray-200 ${
                isActive('/') ? 'text-primary' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`text-gray-900 font-bold text-lg py-2 border-b border-gray-200 ${
                isActive('/about') ? 'text-primary' : ''
              }`}
            >
              About Us
            </Link>
            <Link
              to="/why-us"
              onClick={() => setIsMenuOpen(false)}
              className={`text-gray-900 font-bold text-lg py-2 border-b border-gray-200 ${
                isActive('/why-us') ? 'text-primary' : ''
              }`}
            >
              Why Us
            </Link>
            <Link
              to="/business"
              onClick={() => setIsMenuOpen(false)}
              className={`text-gray-900 font-bold text-lg py-2 border-b border-gray-200 ${
                isActive('/business') ? 'text-primary' : ''
              }`}
            >
              Our Business
            </Link>
            <Link
              to="/projects"
              onClick={() => setIsMenuOpen(false)}
              className={`text-gray-900 font-bold text-lg py-2 border-b border-gray-200 ${
                isActive('/projects') ? 'text-primary' : ''
              }`}
            >
              Our Projects
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`text-gray-900 font-bold text-lg py-2 border-b border-gray-200 ${
                isActive('/contact') ? 'text-primary' : ''
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


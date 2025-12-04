import React, { useState, useEffect, useRef } from 'react'
import pic5 from '../statics/pic17.jpeg'

const About = () => {
  const [visibleCards, setVisibleCards] = useState([])
  const [scrollY, setScrollY] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const visionMissionRefs = useRef([])
  const featuresRefs = useRef([])
  const directorRef = useRef(null)

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
    img.src = pic5
    img.onload = () => setImageLoaded(true)
  }, [])

  useEffect(() => {
    // Observer for Vision/Mission cards
    const visionMissionObservers = visionMissionRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => [...new Set([...prev, `vision-${index}`])])
            } else {
              setVisibleCards((prev) => prev.filter((id) => id !== `vision-${index}`))
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      )

      observer.observe(ref)
      return observer
    })

    // Observer for Features
    const featuresObservers = featuresRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => [...new Set([...prev, `feature-${index}`])])
            } else {
              setVisibleCards((prev) => prev.filter((id) => id !== `feature-${index}`))
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      )

      observer.observe(ref)
      return observer
    })

    // Observer for Director card
    const directorObserver = directorRef.current
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleCards((prev) => [...new Set([...prev, 'director'])])
              } else {
                setVisibleCards((prev) => prev.filter((id) => id !== 'director'))
              }
            })
          },
          {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
          }
        )
      : null

    if (directorObserver && directorRef.current) {
      directorObserver.observe(directorRef.current)
    }

    return () => {
      visionMissionObservers.forEach((observer) => observer?.disconnect())
      featuresObservers.forEach((observer) => observer?.disconnect())
      directorObserver?.disconnect()
    }
  }, [])
  const features = [
    {
      icon: '🏗️',
      title: 'Superior Quality',
      text: 'We provide superior quality products and services',
    },
    {
      icon: '✨',
      title: 'Professional Service',
      text: 'Most professional service to residential and commercial clients',
    },
    {
      icon: '📋',
      title: 'Expertise',
      text: 'Valued construction solutions using our expertise in design',
    },
  ]

  return (
    <>
      {/* Title Section with Background Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div
          className={`absolute inset-0 transition-all duration-300 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${pic5})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 50%',
            backgroundRepeat: 'no-repeat',
            transform: `scale(${Math.max(1.0, 1.2 - (scrollY / (typeof window !== 'undefined' ? window.innerHeight : 800)) * 0.2)})`,
          }}
        />
        {/* Shader/Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        {/* Title */}
        <div className={`relative z-10 h-full flex items-center justify-center transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
            About Us
          </h2>
        </div>
      </div>
      
      <section id="about" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Overview */}
          <div className="mb-16">
          <p className="text-lg text-gray-600 leading-relaxed w-full text-center">
            Wintech Project Sdn. Bhd. was established on August 2016 and since then we have been striving to provide the most professional service to our residential and commercial clients. We specialize in the fabrication & installation of aluminum window and door, aluminum curtain wall, aluminum adjustable louvres, shower screen, aluminum composite panel and etc. We provide our clients with superior quality products and services where we perform according to their expectation and conform to all their requirements.
          </p>
        </div>

        {/* Directors */}
        <div className="mb-16">
          <div 
            ref={directorRef}
            className={`bg-gray-50 p-8 rounded-2xl border-2 border-primary transition-all duration-700 hover:shadow-xl hover:scale-[1.02] w-full ${
              visibleCards.includes('director')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-5xl">👔</div>
              <h3 className="text-3xl font-bold text-gray-900">Director</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <span className="text-primary text-xl font-semibold">•</span>
                <p className="text-lg text-gray-700 font-medium">Mr. Chan Chen Kit</p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-primary text-xl font-semibold">•</span>
                <p className="text-lg text-gray-700 font-medium">Mr. Lee Yih Hann</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision and Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Vision */}
          <div 
            ref={(el) => (visionMissionRefs.current[0] = el)}
            className={`bg-gray-50 p-8 rounded-2xl border-2 border-primary transition-all duration-700 hover:shadow-xl hover:scale-[1.02] ${
              visibleCards.includes('vision-0')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">👁️</div>
              <h3 className="text-3xl font-bold text-gray-900">Vision</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Wintech Project Sdn Bhd to be integrated aluminium construction company with the goal to serve the construction needs of the customer and provide the best service to our clients.
            </p>
          </div>

          {/* Mission */}
          <div 
            ref={(el) => (visionMissionRefs.current[1] = el)}
            className={`bg-gray-50 p-8 rounded-2xl border-2 border-primary transition-all duration-700 hover:shadow-xl hover:scale-[1.02] ${
              visibleCards.includes('vision-1')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🎯</div>
              <h3 className="text-3xl font-bold text-gray-900">Mission</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              To enrich our experience in the field, to be a well known and reputable company, and to provide our client(s) with valued construction solutions using our expertise in the design.
            </p>
          </div>
        </div>

        {/* Our Core Qualities */}
        <div className="mt-20 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Core Qualities
          </h2>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featuresRefs.current[index] = el)}
              className={`flex gap-5 items-start bg-gray-50 p-6 rounded-xl border-2 border-primary transition-all duration-700 hover:shadow-xl hover:scale-[1.02] ${
                visibleCards.includes(`feature-${index}`)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-4xl flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

export default About


import React, { useState, useEffect, useRef } from 'react'
import pic5 from '../statics/pic5.jpg'

const About = () => {
  const [visibleCards, setVisibleCards] = useState([])
  const visionMissionRefs = useRef([])
  const featuresRefs = useRef([])

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

    return () => {
      visionMissionObservers.forEach((observer) => observer?.disconnect())
      featuresObservers.forEach((observer) => observer?.disconnect())
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
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${pic5})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Shader/Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        {/* Title */}
        <div className="relative z-10 h-full flex items-center justify-center">
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Vision</h3>
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Mission</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              To enrich our experience in the field, to be a well known and reputable company, and to provide our client(s) with valued construction solutions using our expertise in the design.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featuresRefs.current[index] = el)}
              className={`flex gap-5 items-start bg-gray-50 p-6 rounded-xl transition-all duration-700 ${
                visibleCards.includes(`feature-${index}`)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl flex-shrink-0">{feature.icon}</div>
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


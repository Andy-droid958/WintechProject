import React, { useState, useEffect, useRef } from 'react'
import pic7 from '../statics/pic18.png'
import pic9 from '../statics/pic9.png'
import pic10 from '../statics/pic10.png'
import pic11 from '../statics/pic11.png'
import pic12 from '../statics/pic12.png'
import pic13 from '../statics/pic13.png'

const WhatWeDo = () => {
  const [visibleSections, setVisibleSections] = useState([])
  const [scrollY, setScrollY] = useState(0)
  const sectionRefs = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => [...new Set([...prev, index])])
            } else {
              setVisibleSections((prev) => prev.filter((i) => i !== index))
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
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const categories = [
    {
      title: 'Window',
      items: [
        'Casement Window',
        'Single Point',
        'Multi Point',
        'Sliding Window',
      ],
      image: pic9,
    },
    {
      title: 'Door',
      items: [
        'Sliding Door',
        'Swing Door',
        'Folding Door',
        'Bi-Fold Door',
      ],
      image: pic10,
    },
    {
      title: 'Glass',
      items: [
        'Glass Railing',
        'Shower Screen',
        'Mirror',
      ],
      image: pic11,
    },
    {
      title: 'Aluminium Louvres',
      items: [
        'Aluminium Louvres',
      ],
      image: pic12,
    },
    {
      title: 'Curtain Wall & Shopfront',
      items: [
        'Curtain Wall',
        'Shopfront',
      ],
      image: pic13,
    },
  ]

  return (
    <section className="pb-20">
      {/* Title Section with Background Image */}
      <div className="relative h-64 md:h-80 mb-16 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `url(${pic7})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 50%',
            backgroundRepeat: 'no-repeat',
            transform: `scale(${Math.max(1.0, 1.2 - (scrollY / (typeof window !== 'undefined' ? window.innerHeight : 800)) * 0.2)})`,
          }}
        />
        {/* Shader/Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        {/* Title */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
            What We Do
          </h2>
        </div>
      </div>
      
      <div className="w-full">
        {/* Description Section */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <p className="text-lg text-gray-600 leading-relaxed w-full text-center max-w-4xl mx-auto">
            We specialize in the fabrication & installation of aluminum window and door, aluminum curtain wall, aluminum adjustable louvres, shower screen, aluminum composite panel and etc.
          </p>
        </div>
        
        <div>
          {categories.map((category, index) => {
            const isVisible = visibleSections.includes(index)
            
            return (
            <div 
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className={`relative flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center bg-white p-8 transition-all duration-1000 overflow-hidden ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Background rectangle that slides in from alternating sides */}
              <div 
                className={`absolute inset-0 bg-gray-100 z-0 transition-transform duration-1000 ease-out ${
                  isVisible 
                    ? 'translate-x-0' 
                    : index % 2 === 0 
                      ? '-translate-x-full' 
                      : 'translate-x-full'
                }`}
                style={{ transitionDelay: '200ms' }}
              />
              {/* Image Section */}
              <div className="relative z-10 w-full lg:w-1/2 h-64 md:h-80 overflow-hidden">
                <img
                  src={category.image}
                  alt={`${category.title} - Aluminum ${category.title.toLowerCase()} fabrication and installation services in Malaysia by Wintech Project Sdn Bhd`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Description Section */}
              <div className="relative z-10 w-full lg:w-1/2 max-w-7xl mx-auto px-6">
                <h3 className="text-3xl font-bold text-primary mb-6 opacity-80">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-700 opacity-75">
                      <span className="text-primary mr-3 text-xl opacity-80">o</span>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhatWeDo


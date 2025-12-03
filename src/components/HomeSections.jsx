import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import pic5 from '../statics/pic5.jpg'
import pic6 from '../statics/pic6.jpg'
import pic7 from '../statics/pic7.jpg'
import pic8 from '../statics/pic8.jpg'

const HomeSections = () => {
  const [visibleCards, setVisibleCards] = useState([])
  const sectionRefs = useRef([])

  const sections = [
    {
      id: 1,
      image: pic5,
      label: 'About Us',
      link: '/about',
      description: 'Learn about Wintech Project Sdn Bhd, our vision, mission, and commitment to delivering exceptional aluminum and glass construction solutions.',
    },
    {
      id: 2,
      image: pic6,
      label: 'Why Us',
      link: '/why-us',
      description: 'Discover why clients trust us for their construction needs. We hold essential certifications and deliver superior quality products and services.',
    },
    {
      id: 3,
      image: pic7,
      label: 'Our Business',
      link: '/business',
      description: 'Explore our comprehensive range of services including windows, doors, glass, aluminum louvres, and curtain wall systems.',
    },
    {
      id: 4,
      image: pic8,
      label: 'Our Projects',
      link: '/projects',
      description: 'View our portfolio of completed projects showcasing our expertise in aluminum and glass construction across various sectors.',
    },
  ]

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => [...new Set([...prev, index])])
            } else {
              setVisibleCards((prev) => prev.filter((i) => i !== index))
            }
          })
        },
        {
          threshold: 0.2,
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

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {sections.map((section, index) => {
            const isVisible = visibleCards.includes(index)
            return (
              <div
                key={section.id}
                ref={(el) => (sectionRefs.current[index] = el)}
                className={`group relative overflow-hidden rounded-2xl bg-gray-50 border-2 border-primary transition-all duration-700 hover:shadow-xl hover:scale-[1.02] ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={section.image}
                    alt={`${section.label} - Wintech Project Sdn Bhd`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {section.label}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                    {section.description}
                  </p>
                  <Link
                    to={section.link}
                    className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HomeSections


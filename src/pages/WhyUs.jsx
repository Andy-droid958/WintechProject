import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import pic6 from '../statics/pic6.jpg'

const WhyUs = () => {
  const [visibleCards, setVisibleCards] = useState([])
  const [scrollY, setScrollY] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRefs = useRef([])
  const documentsRefs = useRef([])

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
    img.src = pic6
    img.onload = () => setImageLoaded(true)
  }, [])

  useEffect(() => {
    // Observer for Why Us cards
    const cardObservers = cardRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => [...new Set([...prev, `card-${index}`])])
            } else {
              setVisibleCards((prev) => prev.filter((id) => id !== `card-${index}`))
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

    // Observer for Documents
    const documentObservers = documentsRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => [...new Set([...prev, `doc-${index}`])])
            } else {
              setVisibleCards((prev) => prev.filter((id) => id !== `doc-${index}`))
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
      cardObservers.forEach((observer) => observer?.disconnect())
      documentObservers.forEach((observer) => observer?.disconnect())
    }
  }, [])
  
  return (
    <>
      <Navbar />
      {/* Title Section with Background Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div
          className={`absolute inset-0 transition-all duration-300 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${pic6})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Why Us
          </h1>
        </div>
      </div>
      
      <section className="bg-white py-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Description */}
          <div className="mb-16">
            <p className="text-lg text-gray-600 leading-relaxed w-full text-center max-w-4xl mx-auto">
              At Wintech Project Sdn Bhd, we are committed to delivering aluminium and construction solutions that stand out in quality, reliability, and long-term value. Whether for residential, commercial, or industrial projects, we combine technical expertise with industry-leading standards to ensure every client receives exceptional results.
            </p>
          </div>

          {/* Why Us Points */}
          <div className="space-y-6">
            {/* Point 1 */}
            <div 
              ref={(el) => (cardRefs.current[0] = el)}
              className={`bg-gray-50 p-5 rounded-xl border-2 border-primary transition-all duration-700 hover:shadow-xl hover:scale-[1.02] ${
                visibleCards.includes('card-0')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Certified & Fully Compliant</h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    We hold essential industry certifications including CIDB & CIDB-PPS, and the Product Certificate of Conformity (CREAM). These certifications confirm our compliance with national regulations, safety requirements, and product performance standards — giving clients full confidence in our workmanship.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 2 */}
            <div 
              ref={(el) => (cardRefs.current[1] = el)}
              className={`bg-gray-50 p-5 rounded-xl border-2 border-primary transition-all duration-700 hover:shadow-xl hover:scale-[1.02] ${
                visibleCards.includes('card-1')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">High-Quality Aluminium Products</h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    We offer durable, precision-engineered aluminium products designed for strength, performance, and aesthetic appeal. Every component is manufactured to meet strict quality benchmarks, ensuring long-lasting reliability and minimal maintenance.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 3 */}
            <div 
              ref={(el) => (cardRefs.current[2] = el)}
              className={`bg-gray-50 p-5 rounded-xl border-2 border-primary transition-all duration-700 hover:shadow-xl hover:scale-[1.02] ${
                visibleCards.includes('card-2')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Experienced & Skilled Team</h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Our team consists of trained professionals in aluminium fabrication, installation, design, and project coordination. With years of on-site experience, we understand practical requirements and deliver solutions that perform in real-world conditions.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 4 */}
            <div 
              ref={(el) => (cardRefs.current[3] = el)}
              className={`bg-gray-50 p-5 rounded-xl border-2 border-primary transition-all duration-700 hover:shadow-xl hover:scale-[1.02] ${
                visibleCards.includes('card-3')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tailored Solutions for Every Project</h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Every project is unique. We provide customised aluminium solutions based on your exact specifications — from structural framing and ACP works to windows, doors, and façade systems. We listen, plan carefully, and ensure you get exactly what you need.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 5 */}
            <div 
              ref={(el) => (cardRefs.current[4] = el)}
              className={`bg-gray-50 p-5 rounded-xl border-2 border-primary transition-all duration-700 hover:shadow-xl hover:scale-[1.02] ${
                visibleCards.includes('card-4')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Commitment to Safety & Professionalism</h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Safety is at the core of our operations. We adhere strictly to CIDB safety guidelines and industry best practices, ensuring clean, safe job sites and smooth project execution from start to finish.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 6 */}
            <div 
              ref={(el) => (cardRefs.current[5] = el)}
              className={`bg-gray-50 p-5 rounded-xl border-2 border-primary transition-all duration-700 hover:shadow-xl hover:scale-[1.02] ${
                visibleCards.includes('card-5')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">
                  6
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Reliable Delivery & Installation</h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    We prioritise punctuality. Our efficient planning and experienced installation team allow us to complete projects on schedule without compromising quality — whether it's a small renovation or a large commercial development.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 7 */}
            <div 
              ref={(el) => (cardRefs.current[6] = el)}
              className={`bg-gray-50 p-5 rounded-xl border-2 border-primary transition-all duration-700 hover:shadow-xl hover:scale-[1.02] ${
                visibleCards.includes('card-6')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">
                  7
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted by Homeowners, Businesses & Developers</h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    Over the years, we have built strong relationships with clients from various sectors. Our reputation is based on consistent quality, transparent communication, and dependable service.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting Documents Section */}
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Supporting Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* PDF Preview - CIDB */}
              <div 
                ref={(el) => (documentsRefs.current[0] = el)}
                className={`transition-all duration-700 ${
                  visibleCards.includes('doc-0')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">1</div>
                  <h3 className="text-xl font-bold text-gray-900">CIDB Certificate</h3>
                </div>
                <div className="bg-gray-50 rounded-xl border-2 border-primary overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <iframe
                    src="/CIDB.pdf"
                    className="w-full h-96"
                    title="CIDB Certificate"
                    style={{ border: 'none' }}
                  />
                </div>
                <a
                  href="/CIDB.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-center text-primary hover:text-primary-dark font-semibold transition-colors"
                >
                  View in new page →
                </a>
              </div>

              {/* PDF Preview - CIDB-PPS */}
              <div 
                ref={(el) => (documentsRefs.current[1] = el)}
                className={`transition-all duration-700 ${
                  visibleCards.includes('doc-1')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">2</div>
                  <h3 className="text-xl font-bold text-gray-900">CIDB-PPS</h3>
                </div>
                <div className="bg-gray-50 rounded-xl border-2 border-primary overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <iframe
                    src="/CIDB_PPS.pdf"
                    className="w-full h-96"
                    title="CIDB-PPS Certificate"
                    style={{ border: 'none' }}
                  />
                </div>
                <a
                  href="/CIDB_PPS.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-center text-primary hover:text-primary-dark font-semibold transition-colors"
                >
                  View in new page →
                </a>
              </div>

              {/* PDF Preview - CREAM */}
              <div 
                ref={(el) => (documentsRefs.current[2] = el)}
                className={`transition-all duration-700 ${
                  visibleCards.includes('doc-2')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">3</div>
                  <h3 className="text-xl font-bold text-gray-900">CREAM Certificate</h3>
                </div>
                <div className="bg-gray-50 rounded-xl border-2 border-primary overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <iframe
                    src="/CREAM.pdf"
                    className="w-full h-96"
                    title="CREAM Certificate"
                    style={{ border: 'none' }}
                  />
                </div>
                <a
                  href="/CREAM.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-center text-primary hover:text-primary-dark font-semibold transition-colors"
                >
                  View in new page →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default WhyUs


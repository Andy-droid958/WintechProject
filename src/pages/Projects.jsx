import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import pic8 from '../statics/pic8.jpg'

const Projects = () => {
  
  return (
    <>
      <Navbar />
      {/* Title Section with Background Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${pic8})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Shader/Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        {/* Title */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Our Projects
          </h1>
        </div>
      </div>
      
      <section className="bg-white py-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Content coming soon...
          </p>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Projects


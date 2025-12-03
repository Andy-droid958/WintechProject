import React from 'react'
import { Link } from 'react-router-dom'
import pic19 from '../statics/pic19.jpg'

const ContactSection = () => {
  return (
    <div className="w-full">
      <div 
        className="relative p-12 md:p-16 text-center overflow-hidden"
        style={{
          backgroundImage: `url(${pic19})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Shader Overlay */}
        <div className="shader-overlay"></div>
        
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Get In Touch
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto mb-8 drop-shadow-md">
            Have a project in mind? Contact us today to discuss your aluminum and glass construction needs.
          </p>
          <Link
            to="/contact"
            className="contact-now-button inline-block text-white px-8 py-4 rounded-lg font-semibold text-lg relative z-10"
          >
            <span className="relative z-10">Contact Now</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ContactSection


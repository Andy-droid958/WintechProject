import React, { useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import pic5 from '../statics/pic14.jpg'

const Contact = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const contactItems = [
    {
      icon: '🏢',
      label: 'Company',
      value: 'Wintech Project Sdn. Bhd.',
    },
    {
      icon: '📍',
      label: 'Address',
      value: 'No.24, Jalan Tago 11, Taman Perindustrian Tago, 52200 Kuala Lumpur.',
    },
    {
      icon: '📞',
      label: 'Telephone',
      value: '03-6277 3388 / 03-6277 8080 (Fax)',
    },
    {
      icon: '✉️',
      label: 'Email',
      value: 'wintechpsb@gmail.com',
    },
  ]

  return (
    <>
      {/* Title Section with Background Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `url(${pic5})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 75%',
            backgroundRepeat: 'no-repeat',
            transform: `scale(${Math.max(1.0, 1.2 - (scrollY / (typeof window !== 'undefined' ? window.innerHeight : 800)) * 0.2)})`,
          }}
        />
        {/* Shader/Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        {/* Title */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center">
            Get In Touch
          </h2>
        </div>
      </div>
      
    <section id="contact" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            {contactItems.map((item, index) => (
              <div key={index}>
                <div
                  className="flex gap-6 items-start p-8 bg-gray-50 rounded-2xl transition-all hover:shadow-md hover:translate-x-2"
                >
                  <div className="text-4xl flex-shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      {item.label}
                    </h3>
                    {item.label === 'Email' ? (
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors cursor-pointer"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg font-semibold text-gray-900">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
                {/* Map under Address */}
                {item.label === 'Address' && (
                  <div className="mt-4 rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.854!2d101.686!3d3.139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4b8c8c8c8c8d%3A0x0!2sNo.%2024%2C%20Jalan%20Tago%2011%2C%20Taman%20Perindustrian%20Tago%2C%2052200%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1234567890123!5m2!1sen!2smy"
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Wintech Project Sdn Bhd Location"
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Contact


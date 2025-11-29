import React from 'react'

const Footer = () => {

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left: Company Name */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2 text-red-600">Wintech Project Sdn Bhd</h3>
            <p className="text-sm opacity-70">
              201601029106 (1200047-H)
            </p>
          </div>

          {/* Center: Location */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-3">Address</h4>
            <p className="text-sm opacity-80">
              No.24, Jalan Tago 11, Taman Perindustrian Tago, 52200 Kuala Lumpur.
            </p>
          </div>

          {/* Right: Contact Us */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-3">Get In Touch</h4>
            <div className="text-sm opacity-80 space-y-1">
              <p>Telephone: 03-6277 3388</p>
              <p>Fax: 03-6277 8080</p>
              <p>Email: wintechpsb@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-sm opacity-70">
            © {new Date().getFullYear()} Wintech Project Sdn Bhd All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


import React, { useState } from 'react'

const FloatingEmailButton = () => {
  const [isHovered, setIsHovered] = useState(false)
  const emailAddress = 'wintechpsb@gmail.com'

  const handleClick = () => {
    // Open Gmail compose window in web browser (tf=0 forces web version, prevents app redirect)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=0&to=${emailAddress}`
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      aria-label="Send email to Wintech Project"
      title="Contact us via email"
    >
      {/* Email Icon */}
      <svg
        className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      
      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></span>
    </button>
  )
}

export default FloatingEmailButton


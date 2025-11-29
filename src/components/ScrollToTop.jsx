import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  useEffect(() => {
    // Scroll to top on route change
    scrollToTop()
  }, [pathname])

  useEffect(() => {
    // Scroll to top on initial page load/refresh
    scrollToTop()

    // Handle window load event (catches page refreshes)
    const handleLoad = () => {
      scrollToTop()
    }

    window.addEventListener('load', handleLoad)

    // Also try after render
    requestAnimationFrame(() => {
      scrollToTop()
    })

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  return null
}

export default ScrollToTop


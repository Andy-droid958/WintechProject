import React, { useState, useEffect, useRef, useMemo } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import pic8 from '../statics/pic8.jpg'

// Dynamically import all images from subdirectories in statics folder
const imageModules = import.meta.glob('../statics/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true })

const Projects = () => {
  const [scrollY, setScrollY] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [visibleAlbums, setVisibleAlbums] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [modalProject, setModalProject] = useState(null)
  const [modalImageIndex, setModalImageIndex] = useState(0)
  const albumsPerPage = 6
  const albumRefs = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Optional per-folder overrides (edit here to change album name or services)
  const albumOverrides = {
    album1: { title: '68 UNITS COMPOSITE PANEL', services: '', description: '' },
    album2: { title: 'CHERAS VISTA - 28 UNITS THREE STOREY', services: '', description: '' },
    album3: { title: 'CHERAS VISTA - 99 UNITS THREE STOREY', services: '', description: '' },
    album4: { title: ' D’LATOUR', services: '', description: '' },
    album5: { title: 'DENAI RESIDENCE - 228 UNITS', services: '', description: '' },
    album6: { title: 'ELMINA WEST - 129 & 149 UNITS', services: '', description: '' },
    album7: { title: 'ESTINA @ HILL PARK - 405 UNITS', services: '', description: '' },
    album8: { title: 'JADE HILL - 18 UNITS', services: '', description: '' },
    album9: { title: 'JADE HILL - 104 UNITS', services: '', description: '' },
    album10: { title: 'JADE HILL – 33 UNITS', services: '', description: '' },
    album11: { title: 'JADE HILL – 75 UNITS', services: '', description: '' },
    album12: { title: 'JADE HILL – 90 UNITS', services: '', description: '' },
    album13: { title: 'MAPLE RESIDENCE CLUBHOUSE', services: '', description: '' },
    album14: { title: 'MAPLE RESIDENCE - 194 UNITS', services: '', description: '' },
    album15: { title: 'MPPJ BUILDING', services: '', description: '' },
    album16: { title: 'NILAI – 63 UNITS & 64 UNITS', services: '', description: '' },
    album17: { title: 'PUCHONG - 134 UNITS', services: '', description: '' },
    album18: { title: 'PULAI - 307 UNITS', services: '', description: '' },
    album19: { title: 'RAWANG - 196 UNITS', services: '', description: '' },
    album20: { title: 'RAWANG - 196 UNITS GUARD HOUSE', services: '', description: '' },
    album21: { title: 'SANCTUARY MALL', services: '', description: '' },
    album22: { title: 'SEMENYIH - 162 UNITS', services: '', description: '' },
    album23: { title: 'SEMI-D FACTORY – 22UNITS', services: '', description: '' },
    album24: { title: 'SEREMBAN – 211 UNITS', services: '', description: '' },
    album25: { title: 'SHOP LOTS - DENAI ALAM', services: '', description: '' },
    album26: { title: 'SRI BINTANG BUNGALOW', services: '', description: '' },
    album27: { title: 'SYMPHONY HILL - 46 UNITS', services: '', description: '' },
    album28: { title: 'TAMAN SRI - 117 UNITS', services: '', description: '' },
    album29: { title: 'THE PALM @ HILL PARK - 364 & 301 UNITS', services: '', description: '' },
    album30: { title: 'TAMAN TUN SHELL PETROL STATION', services: '', description: '' },
  }

  // Group images by folder name (album name)
  const projects = useMemo(() => {
    const folderMap = new Map()

    // Process all imported images and group by folder
    Object.keys(imageModules).forEach((path) => {
      // Extract folder name from path: ../statics/FOLDER_NAME/image.jpg
      const match = path.match(/\.\.\/statics\/([^/]+)\//)
      if (match) {
        const folderName = match[1]
        if (!folderMap.has(folderName)) {
          folderMap.set(folderName, [])
        }
        // Handle different module formats (default export or direct value)
        const imageUrl = imageModules[path]?.default || imageModules[path]
        if (imageUrl) {
          folderMap.get(folderName).push(imageUrl)
        }
      }
    })

    // Convert to projects array
    return Array.from(folderMap.entries())
      .map(([folderName, images], index) => {
        // Base title from folder name
        const baseTitle = folderName
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase())

        // Apply overrides if provided
        const override = albumOverrides[folderName] || {}

        return {
          id: index + 1,
          title: override.title || baseTitle,
          images: images.sort(), // Sort images for consistent order
          description: override.description || '',
          services: override.services || '',
        }
      })
      .sort((a, b) => a.title.localeCompare(b.title)) // Sort alphabetically
  }, [])

  // Calculate pagination
  const totalPages = Math.ceil(projects.length / albumsPerPage)
  const startIndex = (currentPage - 1) * albumsPerPage
  const endIndex = startIndex + albumsPerPage
  const paginatedProjects = projects.slice(startIndex, endIndex)

  // Reset visible albums when page changes
  useEffect(() => {
    setVisibleAlbums([])
    // Scroll to top of albums section when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  // Preload header image
  useEffect(() => {
    const img = new Image()
    img.src = pic8
    img.onload = () => setImageLoaded(true)
  }, [])

  // Intersection Observer for album animations
  useEffect(() => {
    const observers = albumRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleAlbums((prev) => {
                if (!prev.includes(index)) {
                  return [...prev, index]
                }
                return prev
              })
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer && observer.disconnect())
    }
  }, [paginatedProjects])

  // Initialize current image index for each project
  useEffect(() => {
    const initialIndexes = {}
    projects.forEach((project) => {
      initialIndexes[project.id] = 0
    })
    setCurrentImageIndex(initialIndexes)
  }, [projects])

  const goToNextImage = (projectId, totalImages, e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) === totalImages - 1 ? 0 : (prev[projectId] || 0) + 1,
    }))
  }

  const goToPrevImage = (projectId, totalImages, e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) === 0 ? totalImages - 1 : (prev[projectId] || 0) - 1,
    }))
  }

  const goToImage = (projectId, index, e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectId]: index,
    }))
  }

  const openModal = (project, imageIndex = 0) => {
    if (!project) return
    setModalProject(project)
    setModalImageIndex(imageIndex)
  }

  const closeModal = () => {
    setModalProject(null)
    setModalImageIndex(0)
  }

  const goToNextModalImage = () => {
    if (!modalProject) return
    const total = modalProject.images.length
    setModalImageIndex((prev) => (prev === total - 1 ? 0 : prev + 1))
  }

  const goToPrevModalImage = () => {
    if (!modalProject) return
    const total = modalProject.images.length
    setModalImageIndex((prev) => (prev === 0 ? total - 1 : prev - 1))
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  
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
            backgroundImage: `url(${pic8})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 60%',
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
            Our Projects
          </h1>
        </div>
      </div>
      
      {/* Album Grid Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {paginatedProjects.map((project, index) => {
              const isVisible = visibleAlbums.includes(index)
              return (
                <div
                  key={project.id}
                  ref={(el) => (albumRefs.current[index] = el)}
                  onClick={() => openModal(project, currentImageIndex[project.id] || 0)}
                  className={`group relative bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                  }}
                >
                  {/* Album Cover Image with Carousel */}
                  <div className="relative h-64 md:h-72 overflow-hidden bg-gray-200">
                    {/* Carousel Container */}
                    <div className="relative w-full h-full">
                      {project.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`absolute inset-0 transition-opacity duration-500 ${
                            (currentImageIndex[project.id] || 0) === imgIndex
                              ? 'opacity-100 z-10'
                              : 'opacity-0 z-0'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${project.title} - Image ${imgIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            loading={imgIndex === 0 ? 'lazy' : 'lazy'}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Carousel Navigation Buttons */}
                    {project.images.length > 1 && (
                      <>
                        {/* Previous Button */}
                        <button
                          onClick={(e) => goToPrevImage(project.id, project.images.length, e)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                          aria-label="Previous image"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={(e) => goToNextImage(project.id, project.images.length, e)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                          aria-label="Next image"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {project.images.map((_, dotIndex) => (
                            <button
                              key={dotIndex}
                              onClick={(e) => goToImage(project.id, dotIndex, e)}
                              className={`h-2 rounded-full transition-all duration-300 ${
                                (currentImageIndex[project.id] || 0) === dotIndex
                                  ? 'w-6 bg-white'
                                  : 'w-2 bg-white/50 hover:bg-white/75'
                              }`}
                              aria-label={`Go to image ${dotIndex + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Image Counter */}
                    {project.images.length > 1 && (
                      <div className="absolute top-3 right-3 z-20 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {(currentImageIndex[project.id] || 0) + 1} / {project.images.length}
                      </div>
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Album Info */}
                  <div className="p-5 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">
                        {project.description}
                      </p>
                    )}
                    {project.services && (
                      <>
                        <p className="text-sm text-gray-700 font-semibold">
                          Services Provided:
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {project.services}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Album Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-600/30 rounded-lg transition-all duration-300 pointer-events-none" />
                </div>
              )
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center gap-4">
              {/* Page Info */}
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, projects.length)} of {projects.length} projects
              </div>

              {/* Pagination Buttons */}
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                  }`}
                  aria-label="Previous page"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage =
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)

                    if (!showPage) {
                      // Show ellipsis
                      const prevPage = page - 1
                      const nextPage = page + 1
                      if (
                        (prevPage === 1 || prevPage === currentPage - 2) &&
                        (nextPage === totalPages || nextPage === currentPage + 2)
                      ) {
                        return (
                          <span key={page} className="px-2 text-gray-400">
                            ...
                          </span>
                        )
                      }
                      return null
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`min-w-[40px] px-3 py-2 rounded-lg font-semibold transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95'
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    )
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                  }`}
                  aria-label="Next page"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal for zoomed images */}
      {modalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8"
          onClick={closeModal}
        >
          <div
            className="relative max-w-5xl w-full bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative bg-black">
              <img
                src={modalProject.images[modalImageIndex]}
                alt={`${modalProject.title} - Image ${modalImageIndex + 1}`}
                className="w-full max-h-[80vh] object-contain"
              />

              {/* Prev / Next */}
              {modalProject.images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevModalImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={goToNextModalImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Counter */}
              {modalProject.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded">
                  {modalImageIndex + 1} / {modalProject.images.length}
                </div>
              )}
            </div>

            {/* Info bar */}
            <div className="p-4 bg-black/70 text-white flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{modalProject.title}</div>
                {modalProject.services && (
                  <div className="text-sm text-white/80">
                    Services Provided: {modalProject.services}
                  </div>
                )}
              </div>
              {modalProject.description && (
                <div className="hidden sm:flex items-center gap-2 text-sm text-white/80">
                  <span>{modalProject.description}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default Projects


'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

const photos = [
  { src: '/images/gallery-1.jpg', alt: 'Атмосфера фестиваля' },
  { src: '/images/gallery-2.jpg', alt: 'Вечер на экоферме' },
  { src: '/images/gallery-3.jpg', alt: 'Природа и музыка' },
  { src: '/images/gallery-4.jpg', alt: 'Люди и танцы' },
  { src: '/images/gallery-5.jpg', alt: 'Концерт' },
  { src: '/images/gallery-6.jpg', alt: 'Закат на ферме' },
  { src: '/images/hero-desktop.jpg', alt: 'Воздушный шар и лошади' },
  { src: '/images/about.jpg', alt: 'Пространство фестиваля' },
  { src: '/images/gallery-7.jpg', alt: 'Вечерняя программа' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <section id="gallery" className="py-20 md:py-28" style={{ background: '#F5ECD8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xs tracking-[0.4em] uppercase mb-4 font-light"
          style={{ fontFamily: 'var(--font-montserrat)', color: '#A08060' }}
        >
          Галерея
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold italic text-center mb-4"
          style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A' }}
        >
          Атмосфера фестиваля
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="decorative-line mb-12"
        />

        {/* Masonry-like grid */}
        <div className="columns-2 sm:columns-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ scale: 1.02 }}
              className="relative mb-3 md:mb-4 overflow-hidden rounded-2xl cursor-pointer break-inside-avoid group"
              style={{ boxShadow: '0 8px 30px rgba(61,31,10,0.12)' }}
              onClick={() => setLightbox(photo.src)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={800}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: 'rgba(61,31,10,0.25)' }}
              >
                <span
                  className="text-white text-sm tracking-widest uppercase px-4 py-2 rounded-full"
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    background: 'rgba(210,135,68,0.8)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {photo.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <Image
              src={lightbox}
              alt="Фото фестиваля"
              width={1200}
              height={900}
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
            <button
              className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center text-xl hover:bg-white/40 transition-colors cursor-pointer"
              onClick={() => setLightbox(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

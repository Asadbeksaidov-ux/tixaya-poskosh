'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const faces = [
  {
    id: 1,
    name: 'АЛЕКСАНДР БРАТ',
    handle: '@aleksandrbrat',
    image: '/images/aleksandr.png',
    description:
      'Исследователь психологии и подсознания, проводник трансформационных программ, направленных на достижение баланса (186 тыс).',
  },
  {
    id: 2,
    name: 'ДМИТРИЙ ЛАПШИНОВ',
    handle: '@dmitriy_svarga',
    image: '/images/dmitriy.jpg',
    description:
      'Носитель традиций цигун и даосских практик. Основатель школы Svarga, обучающий звезд и спортсменов управлению ресурсом тела (142 тыс).',
  },
  {
    id: 3,
    name: 'ДАНИИЛ ТРОФИМОВ',
    handle: '@daniiltrofimov',
    image: '/images/daniil.jpg',
    description:
      'Квалифицированный аналитик Human Design и психотерапевт, помогающий раскрыть уникальную природу личности (72.6 тыс).',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Faces() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = current.clientWidth > 768 ? 400 : 300
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section
      id="faces"
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: '#fff' }}
    >
      {/* Decorative background elements */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#D28744 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-xs tracking-[0.4em] uppercase mb-4 font-light"
          style={{ fontFamily: 'var(--font-montserrat)', color: '#A08060' }}
        >
          Лица фестиваля
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold italic text-center mb-6"
          style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A' }}
        >
          Артисты, спикеры и мастера
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="decorative-line mb-16"
        />

        {/* Carousel controls (Desktop) */}
        <div className="hidden md:flex justify-end gap-4 mb-8">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(245,236,216,0.5)',
              border: '1px solid rgba(196,168,130,0.4)',
              color: '#3D1F0A',
            }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #D28744 0%, #E8A85C 100%)',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(210,135,68,0.3)',
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 md:gap-8 pb-12 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {faces.map((face, index) => (
              <motion.div
                key={face.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="relative flex-none w-[280px] md:w-[360px] snap-center group"
              >
                {/* Image Circle (overlapping top) */}
                <div className="relative z-20 flex justify-center -mb-16">
                  <div
                    className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden transition-transform duration-500 group-hover:scale-105"
                    style={{
                      border: '4px solid #fff',
                      boxShadow: '0 15px 35px rgba(61,31,10,0.15)',
                    }}
                  >
                    {/* Fallback color if image is missing */}
                    <div className="absolute inset-0 bg-[#EDD9BE] flex items-center justify-center">
                      <span className="text-[#A08060] font-light italic text-sm">Фото</span>
                    </div>
                    
                    <Image
                      src={face.image}
                      alt={face.name}
                      fill
                      className="object-cover relative z-10"
                      onError={(e) => {
                        // Hide image if not found to show fallback
                        e.currentTarget.style.opacity = '0';
                      }}
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div
                  className="relative z-10 pt-20 pb-8 px-6 md:px-8 rounded-3xl h-full flex flex-col transition-all duration-300 group-hover:-translate-y-2"
                  style={{
                    background: 'linear-gradient(145deg, #2D1505 0%, #1A0C02 100%)',
                    boxShadow: '0 20px 40px rgba(26,12,2,0.1)',
                    border: '1px solid rgba(210,135,68,0.2)',
                  }}
                >
                  <div className="text-center mb-4">
                    <h3
                      className="text-lg md:text-xl font-bold uppercase tracking-wider mb-2"
                      style={{ fontFamily: 'var(--font-montserrat)', color: '#E8D9C0' }}
                    >
                      {face.name}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-1.5 text-[#D28744]">
                      <a
                        href={`https://instagram.com/${face.handle.replace('@', '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium hover:text-[#E8A85C] transition-colors"
                        style={{ fontFamily: 'var(--font-montserrat)' }}
                      >
                        {face.handle}
                      </a>
                    </div>
                  </div>

                  <div
                    className="w-12 h-px mx-auto mb-5"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(210,135,68,0.5), transparent)' }}
                  />

                  <p
                    className="text-sm md:text-[15px] text-center leading-relaxed font-light flex-1"
                    style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-montserrat)' }}
                  >
                    {face.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}

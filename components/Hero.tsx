'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Music, Waves, Flame, Leaf, User, ChevronLeft, ChevronRight } from 'lucide-react'

const features = [
  { icon: Music, label: 'Живая и электронная музыка' },
  { icon: Waves, label: 'Конная фиерия' },
  { icon: Flame, label: 'Чайные церемонии и саундхилинг' },
  { icon: Leaf, label: 'Йога и телесные практики' },
]

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setSlide((s) => (s === 0 ? 1 : 0))
    }, 8000)
    return () => clearInterval(timer)
  }, [isHovered])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative w-full min-h-[800px] min-h-screen flex flex-col overflow-hidden pt-24 pb-8"
    >
      {/* Dynamic background */}
      <AnimatePresence>
        {slide === 0 && (
          <motion.div
            key="bg0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            {/* Desktop Background */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src="/images/IMG_0624.png"
                alt="Фестиваль Тихая Роскошь"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Mobile Background */}
            <div className="block md:hidden absolute inset-0">
              <Image
                src="/images/IMG_0617.jpg"
                alt="Фестиваль Тихая Роскошь (Mobile)"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        )}
        {slide === 1 && (
          <motion.div
            key="bg1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
            style={{
              background: 'linear-gradient(to bottom, #F5ECD8 0%, #E8D9C0 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Content Slider */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Arrow */}
        <button
          onClick={() => setSlide((s) => (s === 0 ? 1 : 0))}
          className="absolute left-1 sm:left-4 md:left-6 lg:left-12 top-1/2 -translate-y-1/2 z-30 p-1.5 md:p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
          style={{
            background: slide === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(210,135,68,0.1)',
            color: slide === 0 ? 'rgba(255,255,255,0.8)' : '#3D1F0A',
          }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="md:w-[28px] md:h-[28px]" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => setSlide((s) => (s === 0 ? 1 : 0))}
          className="absolute right-1 sm:right-4 md:right-6 lg:right-12 top-1/2 -translate-y-1/2 z-30 p-1.5 md:p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
          style={{
            background: slide === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(210,135,68,0.1)',
            color: slide === 0 ? 'rgba(255,255,255,0.8)' : '#3D1F0A',
          }}
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="md:w-[28px] md:h-[28px]" />
        </button>

        <div className="w-full max-w-5xl mx-auto h-[450px] md:h-[480px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {slide === 0 ? (
              <motion.div
                key="slide0"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex flex-col items-center justify-center text-center gap-4 text-white"
              >
                <div className="mb-2 w-full flex justify-center">
                  <Image
                    src="/images/logo-trimmed.png"
                    alt="Тихая Роскошь"
                    width={500}
                    height={340}
                    priority
                    className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain brightness-0 invert"
                  />
                </div>

                <div
                  className="decorative-line w-full max-w-xs"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(210,135,68,0.5), transparent)' }}
                />

                <p
                  className="text-base md:text-lg tracking-wider font-light"
                  style={{ fontFamily: 'var(--font-montserrat)', color: '#FFFFFF' }}
                >
                  26–27 сентября 2026
                </p>

                <p
                  className="text-sm tracking-widest uppercase font-light"
                  style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(255,255,255,0.8)' }}
                >
                  Сочи, Экоферма ЭКЗАРХО
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
                  <button
                    id="hero-ticket-btn"
                    onClick={() => scrollTo('#tickets')}
                    className="px-8 py-3.5 rounded-full font-medium tracking-wider text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #D28744 0%, #E8A85C 100%)',
                      color: '#fff',
                      boxShadow: '0 6px 25px rgba(210,135,68,0.3)',
                      fontFamily: 'var(--font-montserrat)',
                    }}
                  >
                    Мой билет
                  </button>
                  <button
                    id="hero-schedule-btn"
                    onClick={() => scrollTo('#schedule')}
                    className="px-8 py-3.5 rounded-full font-medium tracking-wider text-sm transition-all duration-300 hover:scale-105 cursor-pointer"
                    style={{
                      border: '1.5px solid rgba(255,255,255,0.5)',
                      color: '#FFFFFF',
                      background: 'rgba(255,255,255,0.1)',
                      fontFamily: 'var(--font-montserrat)',
                    }}
                  >
                    Программа
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="slide1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex flex-col items-center justify-center gap-6"
              >
                <div
                  className="w-64 h-64 md:w-72 md:h-72 rounded-full border-[3px] overflow-hidden flex flex-col items-center justify-center relative shadow-xl"
                  style={{ borderColor: 'rgba(210,135,68,0.5)', background: 'rgba(232,168,92,0.05)' }}
                >
                  <User size={80} strokeWidth={1} style={{ color: 'rgba(210,135,68,0.25)', marginBottom: '1rem' }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                    <p
                      className="text-sm tracking-widest uppercase mb-2"
                      style={{ fontFamily: 'var(--font-montserrat)', color: '#A08060' }}
                    >
                      Хедлайнер
                    </p>
                    <p
                      className="text-3xl font-light italic leading-snug"
                      style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A' }}
                    >
                      Желанный
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Slider Controls */}
        <div className="flex gap-4 mt-8 z-20">
          {[0, 1].map((idx) => (
            <button
              key={idx}
              onClick={() => setSlide(idx)}
              className="transition-all duration-300 cursor-pointer rounded-full"
              style={{
                width: slide === idx ? '24px' : '8px',
                height: '8px',
                background: slide === idx ? '#D28744' : 'rgba(210,135,68,0.3)',
              }}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom features row */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1 }}
        className="relative z-10 w-full px-4 mt-auto"
      >
        <p
          className="text-center text-xs tracking-widest uppercase mb-6 opacity-80 transition-colors duration-500"
          style={{ fontFamily: 'var(--font-montserrat)', color: slide === 0 ? '#FFFFFF' : '#3D1F0A' }}
        >
          Фестиваль празднования Жизни · 1000–1200 человек
        </p>
        <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="flex flex-col items-center gap-3 group max-w-[100px]"
            >
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                style={{
                  background: slide === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(210,135,68,0.05)',
                  border: slide === 0 ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(210,135,68,0.4)',
                }}
              >
                <f.icon size={20} className="transition-colors duration-500" style={{ color: slide === 0 ? '#FFFFFF' : '#D28744' }} />
              </div>
              <p
                className="text-[10px] sm:text-xs text-center leading-tight opacity-90 tracking-wide transition-colors duration-500"
                style={{ fontFamily: 'var(--font-montserrat)', color: slide === 0 ? '#FFFFFF' : '#3D1F0A' }}
              >
                {f.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X, Ticket } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#about', label: 'О фестивале' },
  { href: '#schedule', label: 'Программа' },
  { href: '#team', label: 'Команда' },
  { href: '#tickets', label: 'Билеты' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(196, 168, 130, 0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(210,135,68,0.15)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(61,31,10,0.08)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex-shrink-0"
              aria-label="На главную"
            >
              <Image
                src="/images/logo-transparent.png"
                alt="Тихая Роскошь"
                width={160}
                height={70}
                priority
                className="h-12 w-auto md:h-14 object-contain"
              />
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Главная навигация">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-[#3D1F0A] hover:text-[#D28744] transition-colors duration-300 font-montserrat font-[300] text-sm tracking-widest uppercase cursor-pointer relative group"
                  style={{ fontFamily: 'var(--font-montserrat)' }}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D28744] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <button
                id="header-ticket-btn"
                onClick={() => scrollTo('#tickets')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #D28744 0%, #E8A85C 100%)',
                  color: '#fff',
                  fontFamily: 'var(--font-montserrat)',
                  boxShadow: '0 4px 15px rgba(210,135,68,0.35)',
                }}
              >
                <Ticket size={16} />
                Мой билет
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-btn"
              className="md:hidden p-2 rounded-lg text-[#3D1F0A] hover:text-[#D28744] transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
            style={{
              background: 'rgba(245, 236, 216, 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(210,135,68,0.2)',
            }}
          >
            <nav className="flex flex-col p-6 gap-5">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-[#3D1F0A] hover:text-[#D28744] transition-colors font-[300] text-lg tracking-widest uppercase cursor-pointer"
                  style={{ fontFamily: 'var(--font-montserrat)' }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                onClick={() => scrollTo('#tickets')}
                className="mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-medium tracking-wider cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #D28744 0%, #E8A85C 100%)',
                  fontFamily: 'var(--font-montserrat)',
                }}
              >
                <Ticket size={18} />
                Мой билет
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X, Ticket } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Telegram icon SVG component
function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.18l-2.03 9.56c-.15.67-.54.83-1.08.52l-3-2.21-1.45 1.4c-.16.16-.3.3-.61.3l.21-3.06L16.24 9.3c.23-.2-.05-.32-.36-.12l-6.53 4.11-2.81-.88c-.61-.19-.62-.61.13-.9l10.96-4.23c.51-.19.96.12.8.9z" />
    </svg>
  )
}

// Instagram icon SVG component
function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  )
}

// Max generic icon (Letter M)
function MaxIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V4l8 8 8-8v16" />
    </svg>
  )
}

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

            {/* Desktop nav & socials */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Главная навигация">
              {/* Social icons */}
              <div className="flex items-center gap-3 mr-2">
                <a href="https://www.instagram.com/tihaya_roskosh_fest?igsh=bDgxcG00d3A2ZDc1" target="_blank" rel="noopener noreferrer" className="text-[#3D1F0A] hover:text-[#D28744] transition-colors" aria-label="Instagram">
                  <InstagramIcon size={16} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#3D1F0A] hover:text-[#D28744] transition-colors" aria-label="Telegram">
                  <TelegramIcon size={18} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#3D1F0A] hover:text-[#D28744] transition-colors" aria-label="Max">
                  <MaxIcon size={18} />
                </a>
              </div>
              {/* Divider */}
              <div className="w-px h-4 bg-[#D28744]/30 hidden lg:block" />
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

            {/* Mobile Actions (Socials + Hamburger) */}
            <div className="flex md:hidden items-center gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <a href="https://www.instagram.com/tihaya_roskosh_fest?igsh=bDgxcG00d3A2ZDc1" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-[rgba(210,135,68,0.3)] flex items-center justify-center text-[#3D1F0A] hover:bg-[rgba(210,135,68,0.1)] hover:text-[#D28744] transition-colors" aria-label="Instagram">
                  <InstagramIcon size={14} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-[rgba(210,135,68,0.3)] flex items-center justify-center text-[#3D1F0A] hover:bg-[rgba(210,135,68,0.1)] hover:text-[#D28744] transition-colors" aria-label="Telegram">
                  <TelegramIcon size={14} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-[rgba(210,135,68,0.3)] flex items-center justify-center text-[#3D1F0A] hover:bg-[rgba(210,135,68,0.1)] hover:text-[#D28744] transition-colors" aria-label="Max">
                  <MaxIcon size={14} />
                </a>
              </div>
              <button
                id="mobile-menu-btn"
                className="p-1.5 sm:p-2 rounded-lg text-[#3D1F0A] hover:text-[#D28744] transition-colors cursor-pointer"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
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

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Send, Camera } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'О фестивале' },
  { href: '#schedule', label: 'Программа' },
  { href: '#speakers', label: 'Спикеры' },
  { href: '#team', label: 'Команда' },
  { href: '#tickets', label: 'Билеты' },
]

// Telegram icon SVG component
function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.18l-2.03 9.56c-.15.67-.54.83-1.08.52l-3-2.21-1.45 1.4c-.16.16-.3.3-.61.3l.21-3.06L16.24 9.3c.23-.2-.05-.32-.36-.12l-6.53 4.11-2.81-.88c-.61-.19-.62-.61.13-.9l10.96-4.23c.51-.19.96.12.8.9z"/>
    </svg>
  )
}

// VK icon SVG component  
function VkIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.65c-.62 0-.81-.49-1.93-1.62-1-.93-1.43-.95-1.67-.95-.34 0-.44.1-.44.57v1.47c0 .41-.13.65-1.22.65-1.79 0-3.78-1.09-5.18-3.12C4.37 10.28 3.83 8.3 3.83 8c0-.24.1-.46.57-.46h1.65c.43 0 .59.2.75.65.83 2.4 2.22 4.5 2.79 4.5.21 0 .31-.1.31-.65V9.54c-.07-1.16-.68-1.26-.68-1.67 0-.2.16-.4.42-.4h2.6c.36 0 .49.19.49.61v3.27c0 .36.16.49.27.49.21 0 .4-.13.8-.53C14.72 10.52 15.88 8 15.88 8c.12-.23.34-.44.76-.44h1.65c.49 0 .6.25.49.61-.2 1-2.2 3.76-2.2 3.76-.17.28-.24.4 0 .71.17.23.74.73 1.12 1.17.69.78 1.22 1.43 1.36 1.88.15.44-.08.67-.51.67z"/>
    </svg>
  )
}

const socialLinks = [
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/tixaya_roskosh',
    icon: TelegramIcon,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/tixaya_roskosh',
    icon: Camera,
  },

  {
    id: 'vk',
    label: 'ВКонтакте',
    href: 'https://vk.com/tixaya_roskosh',
    icon: VkIcon,
  },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      id="footer"
      style={{ background: '#3D1F0A' }}
    >
      {/* Wave divider */}
      <div className="wave-divider" style={{ background: '#F5ECD8' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', height: 60 }}>
          <path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z"
            fill="#3D1F0A"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">

          {/* Column 1: Logo + Slogan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <Image
            src="/images/logo-transparent.png"
            alt="Тихая Роскошь"
            width={160}
            height={72}
            className="mb-4 object-contain opacity-90 brightness-[10] saturate-0"
          />
            <p
              className="text-base font-light italic leading-relaxed"
              style={{ fontFamily: 'var(--font-cormorant)', color: 'rgba(232,217,192,0.8)', fontSize: '1.05rem' }}
            >
              Два дня, наполненных смыслом, красотой и живой энергией
            </p>
            <div className="mt-4 h-px w-12" style={{ background: 'rgba(210,135,68,0.4)' }} />
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-5 font-medium"
              style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(210,135,68,0.8)' }}
            >
              Навигация
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm font-light hover:text-[#D28744] transition-colors duration-300 cursor-pointer relative group"
                    style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(232,217,192,0.7)' }}
                  >
                    <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: '#D28744' }}>
                      ·
                    </span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-5 font-medium"
              style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(210,135,68,0.8)' }}
            >
              Контакты
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#D28744' }} />
                <div>
                  <p
                    className="text-sm font-light leading-snug"
                    style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(232,217,192,0.7)' }}
                  >
                    Сочи, Экоферма ЭКЗАРХО
                  </p>
                  <p
                    className="text-xs mt-0.5 font-light"
                    style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(196,168,130,0.5)' }}
                  >
                    Краснодарский край
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#D28744' }} />
                <div>
                  <p
                    className="text-sm font-light"
                    style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(232,217,192,0.7)' }}
                  >
                    26–27 сентября 2026
                  </p>
                  <p
                    className="text-xs mt-0.5 font-light"
                    style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(196,168,130,0.5)' }}
                  >
                    Суббота и воскресенье
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Send size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#D28744' }} />
                <a
                  href="mailto:hello@tixaya-roskosh.ru"
                  className="text-sm font-light hover:text-[#D28744] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(232,217,192,0.7)' }}
                >
                  hello@tixaya-roskosh.ru
                </a>
              </div>
            </div>
          </motion.div>

          {/* Column 4: Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-5 font-medium"
              style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(210,135,68,0.8)' }}
            >
              Соцсети
            </h4>
            <div className="flex flex-col gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  id={`footer-${social.id}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                  aria-label={social.label}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(210,135,68,0.3)',
                      color: 'rgba(232,217,192,0.7)',
                    }}
                  >
                    <social.icon size={17} />
                  </div>
                  <span
                    className="text-sm font-light transition-colors duration-300 group-hover:text-[#D28744]"
                    style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(232,217,192,0.7)' }}
                  >
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p
            className="text-xs font-light text-center sm:text-left"
            style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(196,168,130,0.5)' }}
          >
            © 2026 Тихая Роскошь. Все права защищены.
          </p>
          <p
            className="text-xs font-light italic"
            style={{ fontFamily: 'var(--font-cormorant)', color: 'rgba(196,168,130,0.4)', fontSize: '1rem' }}
          >
            Сделано с любовью ♥
          </p>
        </div>
      </div>
    </footer>
  )
}

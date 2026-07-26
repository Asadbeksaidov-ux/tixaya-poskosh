'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Leaf, Music, Layers, Users, Sparkles } from 'lucide-react'

const values = [
  { icon: Leaf, label: 'Природа' },
  { icon: Music, label: 'Музыка' },
  { icon: Layers, label: 'Практики' },
  { icon: Users, label: 'Общение' },
  { icon: Sparkles, label: 'Праздник жизни' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  const scrollToTickets = () => {
    const el = document.querySelector('#tickets')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 md:py-32"
      style={{ background: '#F5ECD8' }}
    >
      {/* Decorative circle */}
      <div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #D28744, transparent)' }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #C4A882, transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Logo */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <Image
            src="/images/logo-transparent.png"
            alt="Тихая Роскошь"
            width={220}
            height={100}
            className="object-contain opacity-80"
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center text-xs tracking-[0.4em] uppercase mb-4 font-light"
          style={{ fontFamily: 'var(--font-montserrat)', color: '#A08060' }}
        >
          О фестивале
        </motion.p>

        {/* Headline */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold italic text-center leading-tight mb-6"
          style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A' }}
        >
          Пространство, где можно<br />быть собой
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="decorative-line mb-10"
        />

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <p
              className="text-lg md:text-xl leading-relaxed font-light"
              style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A', fontSize: '1.25rem' }}
            >
              Бутик-фестиваль для тех, кто выбирает осознанный отдых, эстетическую природную атмосферу.
              Здесь нет суеты мегаполиса — есть глубокое дыхание, осознанное движение,
              интеллектуальные разговоры и музыка, которая резонирует с сердечным ритмом.
            </p>
            <p
              className="mt-5 text-lg md:text-xl leading-relaxed font-light"
              style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A', fontSize: '1.25rem' }}
            >
              Пространство, где можно снять доспехи достижений и просто быть собой —
              как с друзьями и близкими, так и с новыми знакомыми.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToTickets}
              id="about-cta-btn"
              className="mt-8 px-8 py-4 rounded-full text-white font-medium tracking-wider text-sm cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #D28744 0%, #E8A85C 100%)',
                boxShadow: '0 6px 25px rgba(210,135,68,0.35)',
                fontFamily: 'var(--font-montserrat)',
              }}
            >
              Мой билет
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-2xl"
            style={{ boxShadow: '0 25px 60px rgba(61,31,10,0.18)' }}
          >
            <Image
              src="/images/about.jpg"
              alt="Атмосфера фестиваля Тихая Роскошь"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 rounded-3xl"
              style={{ background: 'linear-gradient(to top, rgba(61,31,10,0.25), transparent)' }}
            />
          </motion.div>
        </div>

        {/* Values row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 sm:gap-10"
        >
          {values.map((v, i) => (
            <motion.div
              key={v.label}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
              className="flex flex-col items-center gap-3 group"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(196,168,130,0.2)',
                  border: '1.5px solid rgba(210,135,68,0.35)',
                  boxShadow: '0 4px 15px rgba(210,135,68,0.12)',
                }}
              >
                <v.icon size={22} className="text-[#D28744]" />
              </div>
              <p
                className="text-sm tracking-wide text-center"
                style={{ fontFamily: 'var(--font-montserrat)', color: '#3D1F0A', fontWeight: 300 }}
              >
                {v.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

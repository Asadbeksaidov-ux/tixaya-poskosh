'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const speakers = [
  {
    id: 1,
    name: 'Анастасия Волкова',
    role: 'Хедлайнер · Живая музыка',
    image: '/images/speaker1.jpg',
  },
  {
    id: 2,
    name: 'Дмитрий Светлов',
    role: 'Духовный наставник · Медитации',
    image: '/images/speaker2.jpg',
  },
  {
    id: 3,
    name: 'Мария Синицына',
    role: 'Мастер йоги · Телесные практики',
    image: '/images/speaker3.jpg',
  },
  {
    id: 4,
    name: 'Алексей Миров',
    role: 'DJ · Электронная музыка',
    image: '/images/speaker4.jpg',
  },
  {
    id: 5,
    name: 'Ольга Нечаева',
    role: 'Лайф-коуч · Трансформационные игры',
    image: '/images/speaker5.jpg',
  },
  {
    id: 6,
    name: 'Роман Звонарёв',
    role: 'Саундхилинг · Кристальные чаши',
    image: '/images/speaker6.jpg',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
}

export default function Speakers() {
  return (
    <section
      id="speakers"
      className="py-20 md:py-32"
      style={{ background: '#F5ECD8' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          className="text-3xl md:text-4xl lg:text-5xl font-bold italic text-center mb-4"
          style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A' }}
        >
          Спикеры и артисты
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="decorative-line mb-14"
        />

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
          {speakers.map((speaker, i) => (
            <motion.div
              key={speaker.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }}
              className="flex flex-col items-center gap-4 group"
            >
              {/* Arch photo */}
              <div
                className="relative w-40 h-52 sm:w-48 sm:h-60 overflow-hidden transition-transform duration-500 group-hover:scale-105"
                style={{
                  borderRadius: '50% 50% 8px 8px / 40% 40% 8px 8px',
                  boxShadow: '0 15px 40px rgba(61,31,10,0.15)',
                  border: '2px solid rgba(210,135,68,0.25)',
                }}
              >
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 640px) 160px, 192px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Subtle overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(61,31,10,0.25), transparent)' }}
                />
              </div>

              {/* Name & role */}
              <div className="text-center">
                <h3
                  className="text-xl font-semibold italic mb-1"
                  style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A', fontSize: '1.3rem' }}
                >
                  {speaker.name}
                </h3>
                <p
                  className="text-xs tracking-wider font-light leading-snug"
                  style={{ fontFamily: 'var(--font-montserrat)', color: '#A08060' }}
                >
                  {speaker.role}
                </p>
              </div>

              {/* Gold accent line */}
              <div
                className="w-8 h-px opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-12"
                style={{ background: '#D28744' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

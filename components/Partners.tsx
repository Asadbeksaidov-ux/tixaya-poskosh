'use client'

import { motion } from 'framer-motion'

import Image from 'next/image'

const partners = [
  { name: 'ЭКЗАРХО', logo: '/images/Ekzerho_Logo-02.png', type: 'Партнёр фестиваля' },
  { name: 'Ваш бренд', logo: null, type: 'Партнёр фестиваля' },
  { name: 'Ваш бренд', logo: null, type: 'Партнёр фестиваля' },
  { name: 'Ваш бренд', logo: null, type: 'Партнёр фестиваля' },
  { name: 'Ваш бренд', logo: null, type: 'Партнёр фестиваля' },
  { name: 'Ваш бренд', logo: null, type: 'Партнёр фестиваля' },
]
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Partners() {
  return (
    <section
      id="partners"
      className="py-20 md:py-28"
      style={{ background: '#fff' }}
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
          Партнёры
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
          Благодарим тех, кто разделяет<br className="hidden sm:block" /> наши ценности
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="decorative-line mb-6"
        />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center text-sm font-light italic mb-12"
          style={{ fontFamily: 'var(--font-cormorant)', color: '#A08060', fontSize: '1.1rem' }}
        >
          Если ваш бренд ещё не утверждён, но вы хотите выбрать одно из красивых мест
        </motion.p>

        {/* Partner grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 md:gap-8">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.07 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="partner-card rounded-2xl h-28 sm:h-36 flex items-center justify-center cursor-pointer relative overflow-hidden"
            >
              {partner.logo ? (
                <div className="relative w-[80%] h-[80%] flex items-center justify-center p-4">
                  <Image 
                    src={partner.logo} 
                    alt={partner.name}
                    fill
                    className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300" 
                  />
                </div>
              ) : (
                <div className="text-center">
                  <p
                    className="text-lg font-light tracking-wider"
                    style={{ fontFamily: 'var(--font-cormorant)', color: '#A08060', fontSize: '1.2rem' }}
                  >
                    {partner.name}
                  </p>
                  <p
                    className="text-xs mt-1 tracking-widest uppercase"
                    style={{ fontFamily: 'var(--font-montserrat)', color: '#C4A882', fontWeight: 300 }}
                  >
                    {partner.type}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

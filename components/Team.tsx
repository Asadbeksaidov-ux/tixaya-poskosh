'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const team = [
  {
    id: 1,
    name: 'Руслан Исмагилов',
    description: 'Организовывает технические процессы и обеспечивает фестиваль светом, звуком и комфортом',
    image: '/images/org-1.jpg', 
  },
  {
    id: 2,
    name: 'Алина Циркина',
    description: 'Договаривается с амбасадорами и партнерами и организовывает медиаохват',
    image: '/images/org-2.webp',
  },
  {
    id: 3,
    name: 'Алмаз Исмагилов',
    description: 'Оформляет все договоренности в документы и управляет операционными процессами',
    image: '/images/org-3.jpg',
  },
  {
    id: 4,
    name: 'Евгения Тише',
    description: 'Создает уникальную творческую концепцию фестиваля и согласовывает артистов и мастеров',
    image: '/images/org-4.png',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
}

export default function Team() {
  return (
    <section
      id="team"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: '#F5ECD8' }}
    >
      {/* Decorative overlapping background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border-[1px] border-[#C4A882]" />
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border-[1px] border-[#C4A882]" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] rounded-full border-[1px] border-[#C4A882]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header row */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8 relative z-20">
          
          {/* Left: Cursive Title */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <h2 
              className="text-6xl md:text-7xl lg:text-[100px] leading-none" 
              style={{ fontFamily: 'var(--font-dancing)', color: '#3D1F0A', textShadow: '2px 2px 4px rgba(196,168,130,0.3)' }}
            >
              Организаторы
            </h2>
          </motion.div>

          {/* Center: Logo (Absolute so it can be huge) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hidden lg:flex flex-col items-center justify-center opacity-70 absolute left-[60%] xl:left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="relative w-[500px] h-[180px] xl:w-[700px] xl:h-[240px]">
              <Image
                src="/images/logo-trimmed.png"
                alt="Тихая Роскошь"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Right: Subtitle */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center md:text-right"
          >
            <p 
              className="text-xl md:text-[22px] leading-tight" 
              style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A' }}
            >
              Профессионалы создания<br/>
              культовых запоминающихся событий
            </p>
          </motion.div>
          
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mb-24">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Circular photo */}
              <div
                className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden mb-6 transition-transform duration-500 group-hover:scale-105"
                style={{
                  boxShadow: '0 0 0 6px rgba(255,255,255,0.7), 0 20px 40px rgba(61,31,10,0.1)',
                  backgroundColor: '#E8D9C0'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-[#A08060] italic" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  Фото
                </div>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 160px, (max-width: 1024px) 192px, 256px"
                  className="object-cover object-[center_20%] relative z-10"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                />
              </div>

              {/* Name */}
              <h3
                className="text-2xl md:text-[26px] mb-2"
                style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A' }}
              >
                {member.name}
              </h3>

              {/* Description */}
              <p
                className="text-[15px] md:text-base italic leading-relaxed max-w-[280px]"
                style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A' }}
              >
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p 
            className="text-4xl md:text-5xl" 
            style={{ fontFamily: 'var(--font-dancing)', color: '#3D1F0A' }}
          >
            ... мы сошлись по ценностям
          </p>
        </motion.div>

      </div>
    </section>
  )
}

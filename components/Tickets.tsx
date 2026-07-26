'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import TicketCard, { type TicketTier } from './TicketCard'
import ApplicationForm from './ApplicationForm'

const tickets: TicketTier[] = [
  {
    id: 'free',
    name: 'Входной',
    price: '0 ₽',
    spotsLeft: 'Осталось 300 мест',
    features: [
      'Вход на экоферму Экзархо 26.09',
      'Лекторий с 9:00 до 18:00',
      'Ярмарка с 10:00 до 20:00',
      'Малая сцена живой музыки',
      'Детская зона с активностями',
      'Зона детских мастер классов',
    ],
  },
  {
    id: 'full',
    name: 'Полный',
    price: '15 555 ₽',
    spotsLeft: 'Осталось 500 мест',
    features: [
      'Все зоны Входного билета',
      'Зона большого шатра Йоги и Телесны практик',
      'Зона главоной сцены с концертом с 19:00 до 23:00',
    ],
    isPopular: true,
  },
  {
    id: 'vip',
    name: 'VIP',
    price: '55 555 ₽',
    spotsLeft: 'Осталось 150 мест',
    features: [
      'Все зоны Полного билета',
      'Вход на экоферму Экзархо 27.09 и все зоны фестиваля',
      'Зона локации "Зимний сад"',
      'Шатры Индивидуальных практик',
      'Зона Трансформационных игр',
      'Зона Творческих мастер-классов',
      'Питание от Ресторана Экзархо',
    ],
    isVip: true,
  },
  {
    id: 'premium',
    name: 'ПРЕМИУМ',
    price: '111 111 ₽',
    spotsLeft: 'Осталось 25 мест',
    features: [
      'Все зоны VIP билета',
      'Места на пуфиках у главной сцены',
      'Нетворкинг на яхте с фотосессией на закате 25.09',
      'Проживание в отеле 4* с 25-27 сентября',
      'Трансфер на Фестиваль',
    ],
    isVip: true,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Tickets() {
  const [selectedTier, setSelectedTier] = useState<string>('full')

  const handleSelect = (id: string) => {
    setSelectedTier(id)
    // Scroll to form
    setTimeout(() => {
      const el = document.querySelector('#application-form')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <section
      id="tickets"
      className="py-20 md:py-32"
      style={{ background: '#F5ECD8' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          Билеты
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
          Выберите свой тариф
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="decorative-line mb-10"
        />

        {/* Invitation notice */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-14 text-center"
        >
          <p
            className="text-lg leading-relaxed font-light italic"
            style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A', fontSize: '1.2rem' }}
          >
            Милейшие гости, посещение фестиваля возможно только по приглашениям, даже на входной тариф.
            Чтобы получить приглашение, заполните, пожалуйста, форму заявки ниже.{' '}
            <span style={{ color: '#D28744' }}>С любовью и заботой, команда фестиваля ♥</span>
          </p>
        </motion.div>

        {/* Ticket cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-20">
          {tickets.map((ticket, i) => (
            <div
              key={ticket.id}
              className="relative h-full"
              style={{
                outline: selectedTier === ticket.id ? '2px solid #D28744' : '2px solid transparent',
                borderRadius: '24px',
                transition: 'outline 0.3s',
              }}
            >
              <TicketCard
                ticket={ticket}
                onSelect={handleSelect}
                delay={0.25 + i * 0.08}
              />
            </div>
          ))}
        </div>

        {/* Application form */}
        <div id="application-form" className="max-w-2xl mx-auto">
          <ApplicationForm selectedTier={selectedTier} />
        </div>
      </div>
    </section>
  )
}

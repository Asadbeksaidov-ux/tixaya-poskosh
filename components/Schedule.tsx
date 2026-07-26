'use client'

import { motion } from 'framer-motion'

const day1 = [
  { time: '10:00-20:00', activity: 'Вход на экоферму. Ярмарка мастеров, Выступление спикеров в лектории, саунд хилинг и чайные церемонии, творческие мастер-классы', emoji: '🎪' },
  { time: '10:00-22:00', activity: 'Работа семейного ресторана Экзархо', emoji: '🍽️' },
  { time: '12:00-18:00', activity: 'Программа для детей с аниматорами и мастер-классами', emoji: '👶' },
  { time: '11:00-18:00', activity: 'Йога и телесные практики на леваде, Трансформационные игры', emoji: '🧘' },
  { time: '18:30-20:30', activity: 'Подъем на воздушном шаре', emoji: '🎈' },
  { time: '19:00-23:00', activity: 'Основной концерт с хедлайнерами на главной сцене', emoji: '🎵' },
]

const day2 = [
  { time: '10:00-20:00', activity: 'Вход на экоферму. Ярмарка мастеров, Выступление спикеров в лектории, саунд хилинг и чайные церемонии, творческие мастер-классы', emoji: '🎪' },
  { time: '10:00-22:00', activity: 'Работа семейного ресторана Экзархо', emoji: '🍽️' },
  { time: '12:00-18:00', activity: 'Программа для детей с аниматорами и мастер-классами', emoji: '👶' },
  { time: '12:00-19:00', activity: 'Трансформационные тренинги на главной сцене', emoji: '⭐' },
  { time: '11:00-18:00', activity: 'Йога и телесные практики на леваде, Трансформационные игры', emoji: '🧘' },
  { time: '18:30-20:30', activity: 'Подъем на воздушном шаре', emoji: '🎈' },
  { time: '19:00-23:00', activity: 'Основной концерт с музыкантами и экстатик дэнс на главной сцене', emoji: '🎵' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

interface ScheduleItem {
  time: string
  activity: string
  emoji: string
}

function DayColumn({
  day,
  date,
  items,
  isVip,
  delay,
}: {
  day: string
  date: string
  items: ScheduleItem[]
  isVip?: boolean
  delay?: number
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: delay ?? 0 }}
      className="rounded-3xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(210,135,68,0.25)',
      }}
    >
      {/* Day header */}
      <div
        className="px-6 py-5 text-center"
        style={{
          background: isVip
            ? 'linear-gradient(135deg, rgba(210,135,68,0.3) 0%, rgba(232,168,92,0.15) 100%)'
            : 'rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(210,135,68,0.2)',
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <h3
            className="text-2xl md:text-3xl font-bold italic"
            style={{ fontFamily: 'var(--font-cormorant)', color: '#E8D9C0' }}
          >
            {day}
          </h3>
          {isVip && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #D28744, #E8A85C)',
                color: '#fff',
                fontFamily: 'var(--font-montserrat)',
              }}
            >
              VIP
            </span>
          )}
        </div>
        <p
          className="text-xs tracking-widest uppercase font-light"
          style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(232,168,92,0.7)' }}
        >
          {date}
        </p>
      </div>

      {/* Items */}
      <div className="p-4 sm:p-6 flex flex-col gap-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (delay ?? 0) + 0.05 * i }}
            className="flex items-start gap-3 p-3 rounded-xl group hover:bg-white/5 transition-colors duration-200"
          >
            <span className="text-xl flex-shrink-0 mt-0.5">{item.emoji}</span>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-medium mb-0.5"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  color: 'rgba(210,135,68,0.85)',
                  letterSpacing: '0.05em',
                }}
              >
                {item.time}
              </p>
              <p
                className="text-sm leading-snug font-light"
                style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(232,217,192,0.9)' }}
              >
                {item.activity}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Schedule() {
  return (
    <section
      id="schedule"
      className="relative py-20 md:py-32 grain-overlay"
      style={{ background: '#3D1F0A' }}
    >
      {/* Solid background only */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(61,31,10,0.9)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center text-xs tracking-[0.4em] uppercase mb-4 font-light"
          style={{ fontFamily: 'var(--font-montserrat)', color: 'rgba(210,135,68,0.75)' }}
        >
          Программа фестиваля
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold italic text-center mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-cormorant)', color: '#E8D9C0' }}
        >
          Два дня, наполненных смыслом,<br className="hidden sm:block" /> красотой и живой энергией
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="decorative-line mb-14"
        />

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <DayColumn
            day="26 сентября"
            date="Суббота"
            items={day1}
            delay={0.2}
          />
          <DayColumn
            day="27 сентября"
            date="Воскресенье"
            items={day2}
            isVip
            delay={0.35}
          />
        </div>
      </div>
    </section>
  )
}

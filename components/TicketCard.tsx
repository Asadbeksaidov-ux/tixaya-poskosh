'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export interface TicketTier {
  id: string
  name: string
  price: string
  spotsLeft: string
  features: string[]
  isPopular?: boolean
  isVip?: boolean
}

interface TicketCardProps {
  ticket: TicketTier
  onSelect: (id: string) => void
  delay?: number
}

export default function TicketCard({ ticket, onSelect, delay = 0 }: TicketCardProps) {
  const isSpecial = ticket.isPopular || ticket.isVip

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      whileHover={{ y: -8, scale: isSpecial ? 1.02 : 1.01 }}
      className="relative h-full rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: isSpecial
          ? 'linear-gradient(145deg, #3D1F0A 0%, #5C3019 100%)'
          : '#fff',
        border: isSpecial
          ? '1.5px solid rgba(210,135,68,0.5)'
          : '1.5px solid rgba(196,168,130,0.3)',
        boxShadow: isSpecial
          ? '0 20px 60px rgba(61,31,10,0.25)'
          : '0 8px 30px rgba(61,31,10,0.08)',
        cursor: 'pointer',
      }}
      onClick={() => onSelect(ticket.id)}
    >
      {/* Popular badge */}
      {ticket.isPopular && (
        <div
          className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-medium tracking-wider"
          style={{
            background: 'linear-gradient(135deg, #D28744, #E8A85C)',
            color: '#fff',
            fontFamily: 'var(--font-montserrat)',
          }}
        >
          Популярный
        </div>
      )}
      {ticket.isVip && (
        <div
          className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-medium tracking-wider"
          style={{
            background: 'linear-gradient(135deg, #D28744, #E8A85C)',
            color: '#fff',
            fontFamily: 'var(--font-montserrat)',
          }}
        >
          VIP
        </div>
      )}

      <div className="p-6 sm:p-8 flex flex-col flex-1">
        {/* Tier name */}
        <p
          className="text-xs tracking-[0.3em] uppercase mb-3 font-light"
          style={{
            fontFamily: 'var(--font-montserrat)',
            color: isSpecial ? 'rgba(232,168,92,0.8)' : '#A08060',
          }}
        >
          {ticket.name}
        </p>

        {/* Price */}
        <div className="mb-2">
          <span
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: 'var(--font-cormorant)',
              color: isSpecial ? '#E8D9C0' : '#3D1F0A',
            }}
          >
            {ticket.price}
          </span>
        </div>

        {/* Spots */}
        <p
          className="text-xs font-light mb-6"
          style={{
            fontFamily: 'var(--font-montserrat)',
            color: isSpecial ? 'rgba(232,168,92,0.65)' : '#A08060',
          }}
        >
          {ticket.spotsLeft}
        </p>

        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{
            background: isSpecial
              ? 'rgba(210,135,68,0.25)'
              : 'rgba(196,168,130,0.3)',
          }}
        />

        {/* Features */}
        <ul className="flex-1 flex flex-col gap-3 mb-8">
          {ticket.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check
                size={14}
                className="flex-shrink-0 mt-0.5"
                style={{ color: isSpecial ? '#D28744' : '#A08060' }}
              />
              <span
                className="text-sm leading-snug font-light"
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  color: isSpecial ? 'rgba(232,217,192,0.85)' : '#3D1F0A',
                }}
              >
                {feat}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          id={`ticket-btn-${ticket.id}`}
          className="w-full py-3.5 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:shadow-lg cursor-pointer"
          style={{
            background: isSpecial
              ? 'linear-gradient(135deg, #D28744 0%, #E8A85C 100%)'
              : 'transparent',
            color: isSpecial ? '#fff' : '#3D1F0A',
            border: isSpecial ? 'none' : '1.5px solid rgba(61,31,10,0.3)',
            fontFamily: 'var(--font-montserrat)',
            boxShadow: isSpecial ? '0 6px 20px rgba(210,135,68,0.35)' : 'none',
          }}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(ticket.id)
          }}
        >
          Выбрать тариф
        </button>
      </div>
    </motion.div>
  )
}

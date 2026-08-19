'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, Mail, Tag, Send, Loader2, AlertCircle } from 'lucide-react'
import Modal from './Modal'

interface FormData {
  name: string
  phone: string
  email: string
  promo: string
  tier: string
  wishes: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  promo?: string
}

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px 14px 44px',
  borderRadius: '12px',
  border: '1.5px solid rgba(196,168,130,0.4)',
  background: 'rgba(255,255,255,0.7)',
  fontFamily: 'var(--font-montserrat)',
  fontSize: '14px',
  color: '#3D1F0A',
  outline: 'none',
  transition: 'border-color 0.3s, box-shadow 0.3s',
}

const tierLabels: Record<string, string> = {
  free: 'Входной (0 ₽)',
  full: 'Полный (7 777 ₽)',
  vip: 'VIP (39 990 ₽)',
  premium: 'Премиум (88 888 ₽)',
}

const tierPrices: Record<string, number> = {
  free: 0,
  full: 7777,
  vip: 39990,
  premium: 88888,
}

export default function ApplicationForm({ selectedTier }: { selectedTier?: string }) {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    promo: '',
    tier: selectedTier ?? 'full',
    wishes: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    if (selectedTier) {
      setForm((prev) => ({ ...prev, tier: selectedTier }))
    }
  }, [selectedTier])

  const validate = (): boolean => {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = 'Введите имя'
    if (!form.phone.trim()) errs.phone = 'Введите телефон'
    else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(form.phone)) errs.phone = 'Неверный формат телефона'
    if (!form.email.trim()) errs.email = 'Введите email'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Неверный формат email'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setServerError('')

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        if (data.field === 'promo') {
          setErrors((prev) => ({ ...prev, promo: data.error || 'Неверный промокод' }))
        } else {
          setServerError(data.error || 'Произошла ошибка. Попробуйте позже.')
        }
        return
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        setShowModal(true)
        setForm({ name: '', phone: '', email: '', promo: '', tier: 'full', wishes: '' })
      }
    } catch {
      setServerError('Ошибка соединения. Проверьте интернет и попробуйте снова.')
    } finally {
      setLoading(false)
    }
  }

  const basePrice = tierPrices[form.tier]
  
  let discountType = ''
  const promoUpper = form.promo.trim().toUpperCase()
  if (['TEST15'].includes(promoUpper)) discountType = '15'
  if (['TEST30'].includes(promoUpper)) discountType = '30'
  
  let finalPrice = basePrice
  if (discountType === '15') {
    if (form.tier === 'full') finalPrice = 6660
    if (form.tier === 'vip') finalPrice = 33900
    if (form.tier === 'premium') finalPrice = 75555
  } else if (discountType === '30') {
    if (form.tier === 'full') finalPrice = 5555
    if (form.tier === 'vip') finalPrice = 27999
    if (form.tier === 'premium') finalPrice = 66666
  }

  const discountAmount = basePrice - finalPrice

  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit}
        className="rounded-3xl p-6 sm:p-8 md:p-10"
        style={{
          background: '#fff',
          boxShadow: '0 20px 60px rgba(61,31,10,0.1)',
          border: '1px solid rgba(196,168,130,0.2)',
        }}
        noValidate
      >
        <h3
          className="text-2xl md:text-3xl font-bold italic mb-2 text-center"
          style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A' }}
        >
          Заявка на участие
        </h3>
        <p
          className="text-center text-sm mb-8 font-light"
          style={{ fontFamily: 'var(--font-montserrat)', color: '#A08060' }}
        >
          Заполните форму — мы пришлём приглашение
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="relative">
            <User
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: errors.name ? '#c0392b' : '#A08060' }}
            />
            <input
              id="form-name"
              type="text"
              placeholder="Ваше имя *"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              style={{
                ...inputBase,
                borderColor: errors.name ? '#c0392b' : 'rgba(196,168,130,0.4)',
              }}
              aria-label="Имя"
            />
            {errors.name && (
              <p className="text-xs mt-1 ml-1 text-red-600" style={{ fontFamily: 'var(--font-montserrat)' }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: errors.phone ? '#c0392b' : '#A08060' }}
            />
            <input
              id="form-phone"
              type="tel"
              placeholder="Телефон *"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              style={{
                ...inputBase,
                borderColor: errors.phone ? '#c0392b' : 'rgba(196,168,130,0.4)',
              }}
              aria-label="Телефон"
            />
            {errors.phone && (
              <p className="text-xs mt-1 ml-1 text-red-600" style={{ fontFamily: 'var(--font-montserrat)' }}>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: errors.email ? '#c0392b' : '#A08060' }}
            />
            <input
              id="form-email"
              type="email"
              placeholder="Email *"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              style={{
                ...inputBase,
                borderColor: errors.email ? '#c0392b' : 'rgba(196,168,130,0.4)',
              }}
              aria-label="Email"
            />
            {errors.email && (
              <p className="text-xs mt-1 ml-1 text-red-600" style={{ fontFamily: 'var(--font-montserrat)' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Promo */}
          <div className="relative">
            <Tag
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: errors.promo ? '#c0392b' : '#A08060' }}
            />
            <input
              id="form-promo"
              type="text"
              placeholder="Промокод (необязательно)"
              value={form.promo}
              onChange={(e) => setForm((p) => ({ ...p, promo: e.target.value.toUpperCase() }))}
              style={{
                ...inputBase,
                borderColor: errors.promo ? '#c0392b' : 'rgba(196,168,130,0.4)',
              }}
              aria-label="Промокод"
            />
            {errors.promo && (
              <p className="text-xs mt-1 ml-1 text-red-600" style={{ fontFamily: 'var(--font-montserrat)' }}>
                {errors.promo}
              </p>
            )}
          </div>

          {/* Tier selector */}
          <div className="relative">
            <select
              id="form-tier"
              value={form.tier}
              onChange={(e) => setForm((p) => ({ ...p, tier: e.target.value }))}
              style={{
                ...inputBase,
                paddingLeft: '16px',
                appearance: 'none',
                cursor: 'pointer',
              }}
              aria-label="Выбранный тариф"
            >
              {Object.entries(tierLabels).map(([val, label]) => (
                <option key={val} value={val}>
                  {label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A08060]">
              ▼
            </div>
          </div>

          {/* Wishes field instead of quantity */}
          <div className="relative sm:col-span-2">
            <input
              id="form-wishes"
              type="text"
              placeholder="Пожелания (Если вы покупаете больше 1 билета, укажите это здесь)"
              value={form.wishes}
              onChange={(e) => setForm((p) => ({ ...p, wishes: e.target.value }))}
              style={{
                ...inputBase,
                paddingLeft: '16px',
              }}
              aria-label="Пожелания"
            />
            <p className="text-[11px] mt-1.5 ml-1 font-light opacity-80" style={{ fontFamily: 'var(--font-montserrat)', color: '#3D1F0A' }}>
              Если вы покупаете больше 1 билета, то укажите это в поле «пожелания» и наша служба заботы свяжется с вами.
            </p>
          </div>
        </div>

        {/* Price calculation */}
        {basePrice > 0 && (
          <div className="mt-4 p-4 rounded-xl flex flex-col gap-2" style={{ background: 'rgba(210,135,68,0.05)', border: '1px solid rgba(210,135,68,0.2)' }}>
            <div className="flex justify-between items-center text-[#3D1F0A]" style={{ fontFamily: 'var(--font-montserrat)' }}>
              <span className="text-sm">Стоимость билета (1 шт):</span>
              <span className="font-medium">{basePrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between items-center text-green-600" style={{ fontFamily: 'var(--font-montserrat)' }}>
                <span className="text-sm">Скидка по промокоду:</span>
                <span className="font-medium">-{discountAmount.toLocaleString('ru-RU')} ₽</span>
              </div>
            )}
            <div className="w-full h-px my-1" style={{ background: 'rgba(196,168,130,0.3)' }} />
            <div className="flex justify-between items-center text-[#3D1F0A]" style={{ fontFamily: 'var(--font-montserrat)' }}>
              <span className="font-bold">Итого:</span>
              <span className="font-bold text-lg text-[#D28744]">{finalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        )}

        {/* Server error */}
        {serverError && (
          <div
            className="mt-4 flex items-center gap-2 p-3 rounded-xl"
            style={{ background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)' }}
          >
            <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-600" style={{ fontFamily: 'var(--font-montserrat)' }}>
              {serverError}
            </p>
          </div>
        )}

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          id="form-submit-btn"
          disabled={loading}
          className="mt-6 w-full py-4 rounded-full font-medium tracking-wider text-sm text-white flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, #D28744 0%, #E8A85C 100%)',
            boxShadow: '0 8px 25px rgba(210,135,68,0.4)',
            fontFamily: 'var(--font-montserrat)',
          }}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Отправляем...
            </>
          ) : (
            <>
              <Send size={16} />
              Хочу на фестиваль
            </>
          )}
        </motion.button>
      </motion.form>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type="success"
        title="Благодарим сердечно! ♥"
        message="Благодарим сердечно за намерение присоединиться к фестивалю Тихая Роскошь. Наша служба заботы свяжется с вами в течение суток и вышлет приглашение. ♥"
      />
    </>
  )
}

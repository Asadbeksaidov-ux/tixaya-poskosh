'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X, Heart } from 'lucide-react'
import { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'success' | 'info'
  title?: string
  message?: string
}

export default function Modal({ isOpen, onClose, type, title, message }: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(61,31,10,0.7)', backdropFilter: 'blur(10px)' }}
            onClick={onClose}
          >
            {/* Modal card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-md rounded-3xl overflow-hidden"
              style={{
                background: '#F5ECD8',
                boxShadow: '0 30px 80px rgba(61,31,10,0.35)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold top border */}
              <div
                className="h-1 w-full"
                style={{ background: 'linear-gradient(90deg, #C4A882, #D28744, #E8A85C, #D28744, #C4A882)' }}
              />

              {/* Close button */}
              <button
                id="modal-close-btn"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full transition-all duration-200 hover:scale-110 cursor-pointer"
                style={{ background: 'rgba(196,168,130,0.2)', color: '#3D1F0A' }}
                aria-label="Закрыть"
              >
                <X size={18} />
              </button>

              <div className="px-8 py-10 text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #D28744, #E8A85C)',
                    boxShadow: '0 10px 30px rgba(210,135,68,0.35)',
                  }}
                >
                  <Heart size={28} className="text-white" fill="white" />
                </motion.div>

                {/* Title */}
                <h3
                  className="text-2xl md:text-3xl font-bold italic mb-4 leading-snug"
                  style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A' }}
                >
                  {title ?? 'Благодарим!'}
                </h3>

                {/* Divider */}
                <div className="decorative-line mb-5" />

                {/* Message */}
                <p
                  className="text-base leading-relaxed font-light"
                  style={{ fontFamily: 'var(--font-cormorant)', color: '#3D1F0A', fontSize: '1.15rem' }}
                >
                  {message ?? (
                    <>
                      Благодарим сердечно за намерение присоединиться к фестивалю{' '}
                      <em>Тихая Роскошь</em>. Наша служба заботы свяжется с вами в течение
                      суток и вышлет приглашение. ♥
                    </>
                  )}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  id="modal-ok-btn"
                  className="mt-8 px-8 py-3 rounded-full text-white font-medium tracking-wider text-sm cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #D28744 0%, #E8A85C 100%)',
                    fontFamily: 'var(--font-montserrat)',
                    boxShadow: '0 6px 20px rgba(210,135,68,0.35)',
                  }}
                >
                  Хорошо, жду ♥
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

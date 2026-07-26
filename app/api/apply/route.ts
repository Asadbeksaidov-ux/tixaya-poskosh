import { NextRequest, NextResponse } from 'next/server'
import { sendApplicationEmail } from '@/lib/sendEmail'

// Validate promo code against env variable list
function isValidPromo(code: string): boolean {
  if (!code) return true // empty promo is fine
  const validCodes = (process.env.VALID_PROMOCODES ?? 'ФЕСТИВАЛЬ20')
    .split(',')
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean)
  return validCodes.includes(code.toUpperCase()) || code.toUpperCase() === 'ФЕСТИВАЛЬ20'
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, promo, tier } = body

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Введите корректное имя' }, { status: 400 })
    }
    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ error: 'Введите телефон' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Введите корректный email' }, { status: 400 })
    }

    // Promo code validation
    if (promo && !isValidPromo(promo)) {
      return NextResponse.json(
        { error: 'Промокод не найден или устарел', field: 'promo' },
        { status: 400 }
      )
    }

    // Send email
    await sendApplicationEmail({ name: name.trim(), phone, email, promo, tier })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Application error:', err)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера. Попробуйте позже.' },
      { status: 500 }
    )
  }
}

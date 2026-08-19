import { NextRequest, NextResponse } from 'next/server'
import { sendApplicationEmail } from '@/lib/sendEmail'
import { sendToAmoCRM } from '@/lib/amocrm'

const paymentLinks: Record<string, Record<string, string>> = {
  full: {
    base: 'https://checkout.tochka.com/0385f66a-139c-4c58-a4db-cef0310011cf',
    discount15: 'https://checkout.tochka.com/86a938b1-3895-4d62-9e6a-b547faa4b12c',
    discount30: 'https://checkout.tochka.com/d9baf6d2-b5a9-4779-888c-a353dc8fc198'
  },
  vip: {
    base: 'https://checkout.tochka.com/dfd41c93-2567-4693-9a52-4d4022e30075',
    discount15: 'https://checkout.tochka.com/02140a73-ec3d-4d20-8bf9-c34216f161f7',
    discount30: 'https://checkout.tochka.com/5a67c404-1e79-4cd2-b8ee-0e2bb98f424c'
  },
  premium: {
    base: 'https://checkout.tochka.com/66344ce0-837b-40b2-acbe-ca837abda7fb',
    discount15: 'https://checkout.tochka.com/4647b7c9-eadd-4522-a8aa-93b3824ac94a',
    discount30: 'https://checkout.tochka.com/ff150ea3-b97f-413e-831f-83484742167e'
  }
}

// Temporary promo code validation logic until the actual table is provided.
async function getDiscountLevel(code: string): Promise<'base' | 'discount15' | 'discount30' | 'invalid'> {
  if (!code || code.trim() === '') return 'base'
  const c = code.trim().toUpperCase()
  
  // Dynamically fetch promo codes from Google Sheets CSV
  // Column 2 (index 2) is 15% promo codes, Column 3 (index 3) is 30% promo codes
  let isDiscount15 = false
  let isDiscount30 = false
  
  try {
    const csvResponse = await fetch('https://docs.google.com/spreadsheets/d/1pxxZ4dnjKhBHPCTxfJLTrAj7CQXJy0ssSUdkgcDMN98/export?format=csv&gid=0', { cache: 'no-store' })
    if (csvResponse.ok) {
      const csvText = await csvResponse.text()
      // Skip the first header row and parse the rest
      const rows = csvText.split('\n').slice(1)
      for (const row of rows) {
        // Use a simple split by comma. This might break if there are quotes with commas, but for promo codes it's fine.
        const cols = row.split(',')
        if (cols.length >= 4) {
          const promo15 = (cols[2] || '').replace(/"/g, '').trim().toUpperCase()
          const promo30 = (cols[3] || '').replace(/"/g, '').trim().toUpperCase()
          
          if (promo15 && promo15 === c) {
            isDiscount15 = true
            break
          }
          if (promo30 && promo30 === c) {
            isDiscount30 = true
            break
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching promo codes:', error)
  }

  if (isDiscount15) return 'discount15'
  if (isDiscount30) return 'discount30'
  
  return 'invalid'
}

const tierPrices: Record<string, number> = {
  free: 0,
  full: 7777,
  vip: 39990,
  premium: 88888,
}

function getFinalPrice(tier: string, discountLevel: string): number {
  const base = tierPrices[tier] || 0
  if (discountLevel === 'discount15') {
    if (tier === 'full') return 6660
    if (tier === 'vip') return 33900
    if (tier === 'premium') return 75555
  } else if (discountLevel === 'discount30') {
    if (tier === 'full') return 5555
    if (tier === 'vip') return 27999
    if (tier === 'premium') return 66666
  }
  return base
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, promo, tier, wishes } = body

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
    const discountLevel = await getDiscountLevel(promo)
    if (discountLevel === 'invalid') {
      return NextResponse.json(
        { error: 'Промокод не найден или устарел', field: 'promo' },
        { status: 400 }
      )
    }

    // Send email (we can append wishes to the email later, or update sendEmail)
    try {
      await sendApplicationEmail({ name: name.trim(), phone, email, promo, tier, wishes })
    } catch (emailErr) {
      console.error('Email error:', emailErr)
      // Non-fatal for the user, but maybe we should log it
    }

    // Return the payment URL if not free
    let paymentUrl = null
    if (tier !== 'free' && paymentLinks[tier]) {
      paymentUrl = paymentLinks[tier][discountLevel]
    }

    // Send to amoCRM
    const finalPrice = getFinalPrice(tier, discountLevel)
    try {
      await sendToAmoCRM({
        name: name.trim(),
        phone,
        email,
        promo,
        tier,
        wishes,
        paymentUrl,
        finalPrice
      })
    } catch (amoErr) {
      console.error('amoCRM error:', amoErr)
    }

    return NextResponse.json({ success: true, paymentUrl }, { status: 200 })
  } catch (err) {
    console.error('Application error:', err)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера. Попробуйте позже.' },
      { status: 500 }
    )
  }
}

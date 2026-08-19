import { NextRequest } from 'next/server'

interface AmoCRMData {
  name: string
  phone: string
  email: string
  tier: string
  wishes: string
  promo: string
  paymentUrl: string | null
  finalPrice: number
}

const tierLabels: Record<string, string> = {
  free: 'Входной',
  full: 'Полный',
  vip: 'VIP',
  premium: 'Премиум',
}

export async function sendToAmoCRM(data: AmoCRMData) {
  const subdomain = process.env.AMOCRM_SUBDOMAIN
  const token = process.env.AMOCRM_ACCESS_TOKEN

  if (!subdomain || !token) {
    console.error('amoCRM credentials not configured')
    return false
  }

  const baseUrl = `https://${subdomain}.amocrm.ru/api/v4`
  
  const leadName = `Заявка с сайта: ${data.name}`
  const price = data.finalPrice || 0
  
  // 1. Create a complex lead (lead + contact)
  const complexLeadPayload = [
    {
      name: leadName,
      price: price,
      _embedded: {
        contacts: [
          {
            first_name: data.name,
            custom_fields_values: [
              {
                field_code: 'PHONE',
                values: [
                  {
                    value: data.phone,
                    enum_code: 'WORK'
                  }
                ]
              },
              {
                field_code: 'EMAIL',
                values: [
                  {
                    value: data.email,
                    enum_code: 'WORK'
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ]

  try {
    const leadRes = await fetch(`${baseUrl}/leads/complex`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(complexLeadPayload)
    })

    if (!leadRes.ok) {
      const err = await leadRes.text()
      console.error('amoCRM lead creation failed:', leadRes.status, err)
      return false
    }

    const leadData = await leadRes.json()
    const leadId = leadData[0]?.id
    
    if (leadId) {
      // 2. Create a note with all the extra details
      const tierLabel = tierLabels[data.tier] || data.tier
      
      const noteText = `
Новая заявка с сайта tihayaroskosh.ru
Тариф: ${tierLabel}
Цена: ${price} ₽
Промокод: ${data.promo || 'Нет'}
Пожелания: ${data.wishes || 'Нет'}
Ссылка на оплату: ${data.paymentUrl ? data.paymentUrl : 'Бесплатный вход'}
      `.trim()

      const notesPayload = [
        {
          note_type: 'common',
          params: {
            text: noteText
          }
        }
      ]

      await fetch(`${baseUrl}/leads/${leadId}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notesPayload)
      })
    }

    return true
  } catch (err) {
    console.error('amoCRM integration error:', err)
    return false
  }
}

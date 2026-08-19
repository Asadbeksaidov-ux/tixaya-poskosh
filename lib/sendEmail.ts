interface EmailPayload {
  name: string
  phone: string
  email: string
  promo?: string
  tier?: string
  wishes?: string
}

const tierLabels: Record<string, string> = {
  free: 'Входной (0 ₽)',
  full: 'Полный (7 777 ₽)',
  vip: 'VIP (39 990 ₽)',
  premium: 'Премиум (88 888 ₽)',
}

function buildHtmlEmail(payload: EmailPayload): string {
  const tierLabel = tierLabels[payload.tier ?? ''] ?? payload.tier ?? 'Не указан'
  return `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Новая заявка — Тихая Роскошь</title>
</head>
<body style="margin:0;padding:0;background:#F5ECD8;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5ECD8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#3D1F0A,#5C3019);border-radius:16px 16px 0 0;padding:40px;text-align:center;">
            <p style="color:rgba(210,135,68,0.85);font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 8px;">Фестиваль</p>
            <h1 style="color:#E8D9C0;font-size:36px;font-style:italic;margin:0;font-weight:700;">Тихая Роскошь</h1>
            <p style="color:rgba(232,168,92,0.7);font-size:12px;margin:8px 0 0;letter-spacing:0.2em;">26–27 сентября 2026 · Сочи, ЭКЗАРХО</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="background:#fff;padding:40px;border-radius:0 0 16px 16px;border:1px solid rgba(196,168,130,0.2);">
            <h2 style="color:#3D1F0A;font-size:22px;margin:0 0 24px;font-style:italic;">Новая заявка на участие</h2>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(196,168,130,0.2);">
                  <p style="margin:0;color:#A08060;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;">Имя</p>
                  <p style="margin:4px 0 0;color:#3D1F0A;font-size:16px;">${payload.name}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(196,168,130,0.2);">
                  <p style="margin:0;color:#A08060;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;">Телефон</p>
                  <p style="margin:4px 0 0;color:#3D1F0A;font-size:16px;">${payload.phone}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(196,168,130,0.2);">
                  <p style="margin:0;color:#A08060;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;">Email</p>
                  <p style="margin:4px 0 0;color:#3D1F0A;font-size:16px;"><a href="mailto:${payload.email}" style="color:#D28744;">${payload.email}</a></p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(196,168,130,0.2);">
                  <p style="margin:0;color:#A08060;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;">Тариф</p>
                  <p style="margin:4px 0 0;color:#3D1F0A;font-size:16px;">${tierLabel}</p>
                </td>
              </tr>
              ${
                payload.promo
                  ? `<tr><td style="padding:10px 0;">
                      <p style="margin:0;color:#A08060;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;">Промокод</p>
                      <p style="margin:4px 0 0;color:#D28744;font-size:16px;font-weight:600;">${payload.promo}</p>
                     </td></tr>`
                  : ''
              }
              ${
                payload.wishes
                  ? `<tr><td style="padding:10px 0;border-top:1px solid rgba(196,168,130,0.2);">
                      <p style="margin:0;color:#A08060;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;">Пожелания</p>
                      <p style="margin:4px 0 0;color:#3D1F0A;font-size:14px;line-height:1.5;">${payload.wishes}</p>
                     </td></tr>`
                  : ''
              }
            </table>
            <p style="margin:32px 0 0;color:#A08060;font-size:13px;font-style:italic;text-align:center;">
              Пожалуйста, свяжитесь с гостем в течение 24 часов ♥
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px;text-align:center;">
            <p style="color:#A08060;font-size:11px;margin:0;">© 2026 Тихая Роскошь · Сочи, Экоферма ЭКЗАРХО</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `
}

export async function sendApplicationEmail(payload: EmailPayload): Promise<void> {
  const recipientEmail = process.env.RECIPIENT_EMAIL
  const resendApiKey = process.env.RESEND_API_KEY

  // If not configured, log and continue (graceful degradation)
  if (!resendApiKey || !recipientEmail) {
    console.log('[sendEmail] Email not configured — logging payload instead:')
    console.log(JSON.stringify(payload, null, 2))
    return
  }

  const { Resend } = await import('resend')
  const resend = new Resend(resendApiKey)

  const { error } = await resend.emails.send({
    from: 'Тихая Роскошь <noreply@tixaya-roskosh.ru>',
    to: [recipientEmail],
    replyTo: payload.email,
    subject: `Новая заявка: ${payload.name} — ${tierLabels[payload.tier ?? ''] ?? payload.tier}`,
    html: buildHtmlEmail(payload),
  })

  if (error) {
    console.error('[sendEmail] Resend error:', error)
    throw new Error('Email send failed')
  }
}

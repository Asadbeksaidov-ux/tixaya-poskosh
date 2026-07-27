import Link from 'next/link'

export const metadata = {
  title: 'Публичная оферта | Тихая Роскошь',
  description: 'Публичная оферта на оказание услуг по организации фестиваля "Тихая Роскошь".',
}

export default function OfferPage() {
  return (
    <div style={{ background: '#3D1F0A', color: 'rgba(232,217,192,0.9)', minHeight: '100vh', fontFamily: 'var(--font-montserrat)' }} className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-black/20 p-8 md:p-12 rounded-2xl border border-white/5 shadow-xl">
        
        <Link href="/" className="inline-flex items-center text-sm mb-8 hover:text-[#D28744] transition-colors" style={{ color: 'rgba(210,135,68,0.8)' }}>
          ← Вернуться на главную
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-normal mb-8" style={{ fontFamily: 'var(--font-cormorant)' }}>
          Публичная оферта
        </h1>

        <div className="space-y-6 text-sm font-light leading-relaxed opacity-80">
          <p>
            Настоящий документ представляет собой официальное предложение (Публичную оферту) ООО "АИР МЕДИА", в дальнейшем именуемого «Исполнитель», адресованное любому физическому или юридическому лицу, в дальнейшем именуемому «Заказчик», заключить договор на оказание услуг по организации и проведению фестиваля «Тихая Роскошь» на изложенных ниже условиях.
          </p>

          <h2 className="text-xl font-medium mt-8 mb-4 opacity-100" style={{ fontFamily: 'var(--font-cormorant)' }}>1. Общие положения</h2>
          <p>1.1. В соответствии со статьей 437 Гражданского кодекса Российской Федерации данный документ является публичной офертой.</p>
          <p>1.2. Оплата услуг Исполнителя означает полное и безоговорочное согласие Заказчика с условиями настоящей оферты (акцепт).</p>

          <h2 className="text-xl font-medium mt-8 mb-4 opacity-100" style={{ fontFamily: 'var(--font-cormorant)' }}>2. Предмет договора</h2>
          <p>2.1. Исполнитель обязуется оказать Заказчику услуги по обеспечению участия Заказчика в мероприятии «Тихая Роскошь», а Заказчик обязуется оплатить эти услуги в порядке и на условиях, установленных настоящей Офертой.</p>
          
          <h2 className="text-xl font-medium mt-8 mb-4 opacity-100" style={{ fontFamily: 'var(--font-cormorant)' }}>3. Права и обязанности сторон</h2>
          <p>3.1. Исполнитель обязуется: оказать услуги надлежащего качества, своевременно информировать Заказчика об изменениях в программе.</p>
          <p>3.2. Заказчик обязуется: оплатить услуги, соблюдать правила посещения мероприятия, бережно относиться к имуществу Исполнителя и других участников.</p>

          <h2 className="text-xl font-medium mt-8 mb-4 opacity-100" style={{ fontFamily: 'var(--font-cormorant)' }}>4. Стоимость услуг и порядок расчетов</h2>
          <p>4.1. Стоимость услуг определяется в соответствии с тарифами, указанными на сайте tixaya-roskosh.ru.</p>
          <p>4.2. Оплата производится безналичным путем (банковской картой) на сайте Исполнителя через платежный шлюз.</p>

          <h2 className="text-xl font-medium mt-8 mb-4 opacity-100" style={{ fontFamily: 'var(--font-cormorant)' }}>5. Возврат денежных средств</h2>
          <p>5.1. Возврат средств осуществляется в соответствии с действующим законодательством РФ. В случае отказа Заказчика от участия менее чем за 14 дней до начала мероприятия, Исполнитель имеет право удержать фактически понесенные расходы.</p>
          
          <div className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-xl font-medium mb-4 opacity-100" style={{ fontFamily: 'var(--font-cormorant)' }}>6. Реквизиты Исполнителя</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-90">
              <div>
                <p className="font-medium mb-2 text-[#D28744]">ООО "АИР МЕДИА"</p>
                <p>Юридический адрес: 450112, РОССИЯ, Респ БАШКОРТОСТАН, г УФА, ул МАЯКОВСКОГО, ДОМ 10/2, оф КВ. 20</p>
                <p>ИНН: 0278993841</p>
                <p>КПП: 027801001</p>
                <p>ОГРН: 1260200010784</p>
              </div>
              <div>
                <p className="font-medium mb-2 text-[#D28744]">Банковские реквизиты</p>
                <p>Банк: ООО "Банк Точка"</p>
                <p>Расчётный счёт: 40702810220000310906</p>
                <p>БИК: 044525104</p>
                <p>Корреспондентский счёт: 30101810745374525104</p>
                <p>Email: hello@tixaya-roskosh.ru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

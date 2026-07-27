import Link from 'next/link'

export const metadata = {
  title: 'Политика конфиденциальности | Тихая Роскошь',
  description: 'Политика обработки персональных данных участников фестиваля "Тихая Роскошь".',
}

export default function PrivacyPage() {
  return (
    <div style={{ background: '#3D1F0A', color: 'rgba(232,217,192,0.9)', minHeight: '100vh', fontFamily: 'var(--font-montserrat)' }} className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-black/20 p-8 md:p-12 rounded-2xl border border-white/5 shadow-xl">
        
        <Link href="/" className="inline-flex items-center text-sm mb-8 hover:text-[#D28744] transition-colors" style={{ color: 'rgba(210,135,68,0.8)' }}>
          ← Вернуться на главную
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-normal mb-8" style={{ fontFamily: 'var(--font-cormorant)' }}>
          Политика конфиденциальности
        </h1>

        <div className="space-y-6 text-sm font-light leading-relaxed opacity-80">
          <p>
            Настоящая Политика обработки персональных данных (далее — Политика) действует в отношении всей информации, которую ООО "АИР МЕДИА" (далее — Оператор) может получить о пользователе во время использования сайта tixaya-roskosh.ru.
          </p>

          <h2 className="text-xl font-medium mt-8 mb-4 opacity-100" style={{ fontFamily: 'var(--font-cormorant)' }}>1. Общие положения</h2>
          <p>1.1. Использование Сайта означает безоговорочное согласие Пользователя с настоящей Политикой и указанными в ней условиями обработки его персональных данных.</p>
          <p>1.2. В случае несогласия с этими условиями Пользователь должен воздержаться от использования Сайта.</p>

          <h2 className="text-xl font-medium mt-8 mb-4 opacity-100" style={{ fontFamily: 'var(--font-cormorant)' }}>2. Персональные данные Пользователей</h2>
          <p>2.1. В рамках настоящей Политики под персональными данными понимаются: Фамилия, Имя, Отчество, контактный телефон, адрес электронной почты (e-mail).</p>
          <p>2.2. Оператор собирает только те данные, которые необходимы для оказания услуг (оформления билета на фестиваль).</p>
          
          <h2 className="text-xl font-medium mt-8 mb-4 opacity-100" style={{ fontFamily: 'var(--font-cormorant)' }}>3. Цели обработки персональных данных</h2>
          <p>3.1. Идентификация стороны в рамках соглашений и договоров с Оператором.</p>
          <p>3.2. Предоставление Пользователю персонализированных услуг (билетов, рассылок, уведомлений).</p>
          <p>3.3. Улучшение качества Сайта, удобства его использования.</p>

          <h2 className="text-xl font-medium mt-8 mb-4 opacity-100" style={{ fontFamily: 'var(--font-cormorant)' }}>4. Защита информации</h2>
          <p>4.1. Оператор предпринимает необходимые организационные и технические меры для защиты персональной информации Пользователя от неправомерного доступа, уничтожения, изменения, блокирования, копирования, распространения.</p>

          <h2 className="text-xl font-medium mt-8 mb-4 opacity-100" style={{ fontFamily: 'var(--font-cormorant)' }}>5. Контакты и реквизиты</h2>
          <p>По любым вопросам, связанным с обработкой персональных данных, Вы можете обратиться по адресу:</p>
          
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-90">
              <div>
                <p className="font-medium mb-2 text-[#D28744]">Оператор: ООО "АИР МЕДИА"</p>
                <p>Юридический адрес: 450112, РОССИЯ, Респ БАШКОРТОСТАН, г УФА, ул МАЯКОВСКОГО, ДОМ 10/2, оф КВ. 20</p>
                <p>ИНН: 0278993841</p>
                <p>ОГРН: 1260200010784</p>
              </div>
              <div>
                <p className="font-medium mb-2 text-[#D28744]">Связь с нами</p>
                <p>Email: hello@tixaya-roskosh.ru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat, Dancing_Script } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dancing',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Тихая Роскошь — Бутик-фестиваль | 26-27 сентября 2026, Сочи',
  description:
    'Бутик-фестиваль "Тихая Роскошь" — пространство осознанного отдыха, живой музыки, телесных практик и природной красоты. 26-27 сентября 2026, Сочи, экоферма ЭКЗАРХО.',
  keywords: ['фестиваль', 'Тихая Роскошь', 'Сочи', 'бутик-фестиваль', 'медитация', 'йога', 'музыка', 'ЭКЗАРХО'],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://tixaya-roskosh.ru',
    title: 'Тихая Роскошь — Бутик-фестиваль',
    description: 'Пространство, где можно быть собой. 26-27 сентября 2026, Сочи, экоферма ЭКЗАРХО.',
    siteName: 'Тихая Роскошь',
    images: [
      {
        url: '/images/hero-desktop.jpg',
        width: 1200,
        height: 630,
        alt: 'Фестиваль Тихая Роскошь',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Тихая Роскошь — Бутик-фестиваль',
    description: 'Пространство, где можно быть собой. 26-27 сентября 2026.',
    images: ['/images/hero-desktop.jpg'],
  },
}

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Тихая Роскошь',
  description:
    'Бутик-фестиваль для тех, кто выбирает осознанный отдых, эстетическую природную атмосферу.',
  startDate: '2026-09-26T10:00:00+03:00',
  endDate: '2026-09-27T23:00:00+03:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Экоферма ЭКЗАРХО',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Сочи',
      addressCountry: 'RU',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Тихая Роскошь',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Входной',
      price: '0',
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Полный',
      price: '15555',
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${montserrat.variable} ${dancing.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}

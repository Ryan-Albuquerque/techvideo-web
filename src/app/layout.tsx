"use client"

import Header from '@/components/common/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import ThemeAppProvider from '../components/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <html lang="en" className='dark'>
          <head>
            <title>TechVideo.AI</title>
            <meta name="description" content="Optimize people time with medias using AI" />
          </head>
          <body className={inter.className} suppressHydrationWarning={true}>
            <ThemeAppProvider>
              <Header/>
              {children}
            </ThemeAppProvider>
          </body>
        </html>
    </>
  )
}

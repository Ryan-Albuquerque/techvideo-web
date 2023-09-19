"use client"

import Header from '@/components/common/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ThemeAppProvider from '../components/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TechVideo.AI',
  description: 'Optimize people time with medias using AI ',
  icons: ['./icon.svg']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <html lang="en" className='dark'>
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

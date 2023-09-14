import Header from '@/components/native/common/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
    <html lang="en" className='dark'>
      <Header/>
      <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}

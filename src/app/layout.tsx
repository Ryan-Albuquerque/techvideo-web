"use client"

import Header from '@/components/common/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import ThemeAppProvider from '../components/providers/theme-provider'

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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
              <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </ThemeAppProvider>
          </body>
        </html>
    </>
  )
}

import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your App',
  description: 'Your app description'
}


export default function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
      <body className={inter.className + ' w-screen overflow-x-hidden'}>
      <div className="w-full px-[5%]">
        {children}
      </div>
      </body>
      </html>
    </Providers>
  )
}

import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/providers'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jedel Jardem',
  description: 'Zhadyra and Akbota`s website for mental and not only health'
}


export default function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.5" />
        <meta name="description" content="This is my awesome website" />
      </Head>
      <body className={inter.className + ' w-screen overflow-x-hidden'}>
      <div className="w-full px-[5%]">
        {children}
      </div>
      </body>
      </html>
    </Providers>
  )
}

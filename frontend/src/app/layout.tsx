'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Footer from './components/footer'
import { ReduxProvider } from '@/redux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <div className="home-logo-container">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="/"
              rel="noopener noreferrer"
            >
              {/* Add padding to the container element */}
              <div className="p-6">
                <Image
                  src="/home.svg"
                  alt="Vercel Logo"
                  className="dark:invert w-full h-auto"
                  width={40}
                  height={9}
                  priority
                />
                <h2>Home</h2>
              </div>
            </a>
          </div>
          <div className="main-container">
            <ReduxProvider>
            {children}
            </ReduxProvider>
            <Footer />
          </div>
        </body>
      </html>
  )
}

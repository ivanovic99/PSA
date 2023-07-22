import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'

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
      <body className={inter.className}>{
         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
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
               className="dark:invert"
               width={40}
               height={9}
               priority
             />
             <h2>Home</h2>
           </div>
         </a>
       </div>       
         }
         {children}
      </body>
    </html>
  )
}

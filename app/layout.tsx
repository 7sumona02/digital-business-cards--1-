import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import {ClerkProvider} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'tapfolio',
  description: 'developed by sumona',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <Header />
        {children}</body>
    </html>
    </ClerkProvider>
  )
}

import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'BallPicker — 专业捡球器',
  description: '网球、乒乓球捡球器，高效训练必备',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

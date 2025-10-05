import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WHOOP Demo App',
  description: 'A demo app for WHOOP OAuth2 integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

const displayFont = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
})

const bodyFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
})

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'StreamVibe — Watch, Share, Create',
  description: 'The next generation video platform with the best player experience',
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#080808' }],
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} font-body antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex flex-col min-h-screen bg-surface-950 dark:bg-surface-950 text-white">
            <Navbar />
            <div className="flex flex-1 pt-16">
              <Sidebar />
              <main className="flex-1 min-w-0">
                {children}
              </main>
            </div>
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #2a2a2a',
                borderRadius: '12px',
                fontFamily: 'var(--font-body)',
              },
              success: { iconTheme: { primary: '#ff3b3b', secondary: '#fff' } },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}

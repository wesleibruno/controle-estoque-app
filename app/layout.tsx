import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { ThemeProvider } from './components/ThemeProvider'
import { ProductProvider } from './contexts/ProductContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sistema de Controle de Estoque',
  description: 'Sistema moderno para controle de estoque e geração de relatórios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider>
          <ProductProvider>
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-800 p-6">
                  {children}
                </main>
              </div>
            </div>
          </ProductProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


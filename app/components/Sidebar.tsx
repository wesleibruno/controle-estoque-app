'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Package, BarChart2, Users, Settings, ChevronLeft, ChevronRight, Layers } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from './ThemeProvider'

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Package, label: 'Produtos', href: '/produtos' },
  { icon: BarChart2, label: 'Relatórios', href: '/relatorios' },
  { icon: Users, label: 'Usuários', href: '/usuarios' },
  { icon: Layers, label: 'Categorias', href: '/categorias' },
  { icon: Settings, label: 'Configurações', href: '/configuracoes' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { theme } = useTheme()

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      <motion.aside
        initial={{ x: 0 }}
        animate={{ x: isCollapsed ? -240 : 0 }}
        transition={{ duration: 0.3 }}
        className={`w-60 bg-white dark:bg-gray-800 shadow-lg flex flex-col h-screen fixed left-0 top-0 z-50`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold text-gray-800 dark:text-white ${isCollapsed ? 'hidden' : ''}`}>Controle de Estoque</h1>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
        <nav className="mt-8 flex-grow">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-4 py-3 ${
                  pathname === item.href ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {!isCollapsed && item.label}
              </motion.div>
            </Link>
          ))}
        </nav>
      </motion.aside>
      {isCollapsed ? (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="fixed left-0 top-4 z-50"
        >
          <ChevronRight />
        </Button>
      ) : null}
      <div className={`flex-shrink-0 ${isCollapsed ? 'w-0' : 'w-60'} transition-all duration-300`} />
    </>
  )
}


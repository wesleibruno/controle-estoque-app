'use client'

import { motion } from 'framer-motion'
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown } from 'lucide-react'

const data = [
  { name: 'Jan', vendas: 4000, estoque: 2400 },
  { name: 'Fev', vendas: 3000, estoque: 1398 },
  { name: 'Mar', vendas: 2000, estoque: 9800 },
  { name: 'Abr', vendas: 2780, estoque: 3908 },
  { name: 'Mai', vendas: 1890, estoque: 4800 },
  { name: 'Jun', vendas: 2390, estoque: 3800 },
]

export default function Relatorios() {
  const exportPDF = () => {
    // Implementar exportação para PDF
    console.log('Exportando para PDF...')
  }

  const exportExcel = () => {
    // Implementar exportação para Excel
    console.log('Exportando para Excel...')
  }

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        Relatórios
      </motion.h1>
      <div className="mb-6 flex space-x-4">
        <Button onClick={exportPDF} className="flex items-center">
          <FileDown className="mr-2 h-4 w-4" /> Exportar PDF
        </Button>
        <Button onClick={exportExcel} className="flex items-center">
          <FileDown className="mr-2 h-4 w-4" /> Exportar Excel
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Vendas e Estoque</CardTitle>
          <CardDescription>Comparativo mensal de vendas e estoque</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="vendas" fill="#8884d8" />
              <Bar dataKey="estoque" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}


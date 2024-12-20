'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Category, Brand, Supplier } from '../types'
import { useProducts } from '../contexts/ProductContext'

const mockCategories: Category[] = [
  { id: 1, nome: 'Eletrônicos' },
  { id: 2, nome: 'Roupas' },
  { id: 3, nome: 'Alimentos' },
]

const mockBrands: Brand[] = [
  { id: 1, name: 'Marca A' },
  { id: 2, name: 'Marca B' },
  { id: 3, name: 'Marca C' },
]

const mockSuppliers: Supplier[] = [
  { id: 1, name: 'Fornecedor X' },
  { id: 2, name: 'Fornecedor Y' },
  { id: 3, name: 'Fornecedor Z' },
]

export default function ProdutosEstoqueBaixo() {
  const { products } = useProducts()
  const [categories] = useState<Category[]>(mockCategories)
  const [brands] = useState<Brand[]>(mockBrands)
  const [suppliers] = useState<Supplier[]>(mockSuppliers)

  const lowStockProducts = products.filter(p => p.quantity <= p.minStock)

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center"
      >
        <AlertTriangle className="mr-2 h-8 w-8 text-yellow-500" />
        Produtos com Estoque Baixo (Igual ou Abaixo do Mínimo)
      </motion.h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lowStockProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * product.id }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">Quantidade: {product.quantity}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Estoque Mínimo: {product.minStock}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Preço: R$ {product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Categoria: {categories.find(c => c.id === product.categoryId)?.nome}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Marca: {brands.find(b => b.id === product.brandId)?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Fornecedor: {suppliers.find(s => s.id === product.supplierId)?.name}
                </p>
                <div className="mt-4">
                  <Button className="w-full">Reabastecer</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


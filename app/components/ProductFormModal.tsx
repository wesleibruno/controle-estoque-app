'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Product, Category, Brand, Supplier } from '../types'

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (product: Omit<Product, 'id'>) => void
  editProduct?: Product
  categories: Category[]
  brands: Brand[]
  suppliers: Supplier[]
}

export default function ProductFormModal({ isOpen, onClose, onSubmit, editProduct, categories, brands, suppliers }: ProductFormModalProps) {
  const [product, setProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    quantity: 0,
    price: 0,
    categoryId: 0,
    brandId: 0,
    supplierId: 0,
    minStock: 0
  })

  useEffect(() => {
    if (editProduct) {
      setProduct(editProduct)
    } else {
      setProduct({ name: '', quantity: 0, price: 0, categoryId: 0, brandId: 0, supplierId: 0, minStock: 0 })
    }
  }, [editProduct])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(product)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editProduct ? 'Editar Produto' : 'Adicionar Produto'}</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={product.quantity}
                  onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Preço</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="minStock">Estoque Mínimo</Label>
                <Input
                  id="minStock"
                  type="number"
                  value={product.minStock}
                  onChange={(e) => setProduct({ ...product, minStock: Number(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={product.categoryId.toString()}
                  onValueChange={(value) => setProduct({ ...product, categoryId: Number(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="brand">Marca</Label>
                <Select
                  value={product.brandId.toString()}
                  onValueChange={(value) => setProduct({ ...product, brandId: Number(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id.toString()}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="supplier">Fornecedor</Label>
                <Select
                  value={product.supplierId.toString()}
                  onValueChange={(value) => setProduct({ ...product, supplierId: Number(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id.toString()}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                {editProduct ? 'Atualizar' : 'Adicionar'}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


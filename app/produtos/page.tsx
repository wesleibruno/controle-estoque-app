'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ProductFormModal from '../components/ProductFormModal'
import { useNotification } from '../components/Notification'
import { Toaster } from "@/components/ui/toaster"
import { Product, Category, Brand, Supplier } from '../types'
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

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [categories] = useState<Category[]>(mockCategories)
  const [brands] = useState<Brand[]>(mockBrands)
  const [suppliers] = useState<Supplier[]>(mockSuppliers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined)
  const showNotification = useNotification()

  const handleDelete = (id: number) => {
    const deletedProduct = products.find(p => p.id === id)
    deleteProduct(id)
    showNotification(
      "Produto excluído",
      `${deletedProduct?.name} foi removido do estoque.`,
      () => {
        if (deletedProduct) {
          addProduct(deletedProduct)
        }
      }
    )
  }

  const handleAddOrUpdateProduct = (product: Omit<Product, 'id'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, product)
      showNotification("Produto atualizado", `${product.name} foi atualizado com sucesso.`)
    } else {
      addProduct(product)
      showNotification("Produto adicionado", `${product.name} foi adicionado ao estoque.`)
    }
    setEditingProduct(undefined)
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 dark:text-white mb-6"
      >
        Produtos
      </motion.h1>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 flex items-center"
      >
        <Plus className="mr-2" /> Adicionar Produto
      </Button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden"
      >
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantidade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Marca</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fornecedor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estoque Mínimo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
            {products.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{product.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">R$ {product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                  {categories.find(c => c.id === product.categoryId)?.nome || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                  {brands.find(b => b.id === product.brandId)?.name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                  {suppliers.find(s => s.id === product.supplierId)?.name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">{product.minStock}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditModal(product)}
                    className="mr-2"
                  >
                    <Edit className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProduct(undefined)
        }}
        onSubmit={handleAddOrUpdateProduct}
        editProduct={editingProduct}
        categories={categories}
        brands={brands}
        suppliers={suppliers}
      />
      <Toaster />
    </div>
  )
}


'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '../types'

type ProductContextType = {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: number, updatedProduct: Omit<Product, 'id'>) => void
  deleteProduct: (id: number) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

const mockProducts: Product[] = [
  { id: 1, name: 'Produto 1', quantity: 3, price: 19.99, categoryId: 1, brandId: 1, supplierId: 1, minStock: 5 },
  { id: 2, name: 'Produto 2', quantity: 2, price: 29.99, categoryId: 2, brandId: 2, supplierId: 2, minStock: 3 },
  { id: 3, name: 'Produto 3', quantity: 15, price: 9.99, categoryId: 3, brandId: 3, supplierId: 3, minStock: 8 },
]

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts)

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1
    setProducts(prevProducts => [...prevProducts, { ...product, id: newId }])
  }

  const updateProduct = (id: number, updatedProduct: Omit<Product, 'id'>) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...updatedProduct, id } : product
      )
    )
  }

  const deleteProduct = (id: number) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id))
  }

  return (
    <ProductContext.Provider value={{ products, setProducts, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  return context
}


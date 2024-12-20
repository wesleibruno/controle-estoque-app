export interface Product {
    id: number
    name: string
    quantity: number
    price: number
    categoryId: number
    brandId: number
    supplierId: number
    minStock: number
  }
  
  export interface Category {
    id: number
    nome: string
  }
  
  export interface Brand {
    id: number
    name: string
  }
  
  export interface Supplier {
    id: number
    name: string
  }
  
  
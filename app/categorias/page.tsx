'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNotification } from '../components/Notification'
import { Toaster } from "@/components/ui/toaster"

interface Categoria {
  id: number
  nome: string
  descricao: string
}

const mockCategorias: Categoria[] = [
  { id: 1, nome: 'Eletrônicos', descricao: 'Produtos eletrônicos e gadgets' },
  { id: 2, nome: 'Roupas', descricao: 'Vestuário e acessórios' },
  { id: 3, nome: 'Alimentos', descricao: 'Produtos alimentícios' },
]

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>(mockCategorias)
  const [editingCategory, setEditingCategory] = useState<Categoria | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const showNotification = useNotification()

  const handleAddOrUpdateCategory = (category: Omit<Categoria, 'id'>) => {
    if (editingCategory) {
      setCategorias(categorias.map(c => c.id === editingCategory.id ? { ...category, id: editingCategory.id } : c))
      showNotification("Categoria atualizada", `${category.nome} foi atualizada com sucesso.`)
    } else {
      const newId = Math.max(...categorias.map(c => c.id), 0) + 1
      setCategorias([...categorias, { ...category, id: newId }])
      showNotification("Categoria adicionada", `${category.nome} foi adicionada com sucesso.`)
    }
    setIsDialogOpen(false)
    setEditingCategory(null)
  }

  const handleDeleteCategory = (id: number) => {
    const deletedCategory = categorias.find(c => c.id === id)
    setCategorias(categorias.filter(category => category.id !== id))
    showNotification(
      "Categoria excluída",
      `${deletedCategory?.nome} foi removida do sistema.`,
      () => {
        if (deletedCategory) {
          setCategorias(prev => [...prev, deletedCategory])
        }
      }
    )
  }

  const openEditDialog = (category: Categoria) => {
    setEditingCategory(category)
    setIsDialogOpen(true)
  }

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 dark:text-white mb-6"
      >
        Categorias
      </motion.h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6 flex items-center">
            <Plus className="mr-2" /> Adicionar Categoria
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Editar Categoria' : 'Adicionar Categoria'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            handleAddOrUpdateCategory({
              nome: formData.get('nome') as string,
              descricao: formData.get('descricao') as string,
            })
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome
                </Label>
                <Input id="nome" name="nome" defaultValue={editingCategory?.nome} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descricao" className="text-right">
                  Descrição
                </Label>
                <Input id="descricao" name="descricao" defaultValue={editingCategory?.descricao} className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">{editingCategory ? 'Atualizar' : 'Adicionar'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categorias.map((categoria) => (
          <Card key={categoria.id}>
            <CardHeader>
              <CardTitle>{categoria.nome}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">{categoria.descricao}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="icon" onClick={() => openEditDialog(categoria)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDeleteCategory(categoria.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Toaster />
    </div>
  )
}


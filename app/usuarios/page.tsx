'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Edit, Trash2, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNotification } from '../components/Notification'
import { Toaster } from "@/components/ui/toaster"

interface Usuario {
  id: number
  nome: string
  email: string
  cargo: string
  foto: string
}

const mockUsuarios: Usuario[] = [
  { id: 1, nome: 'João Silva', email: 'joao@exemplo.com', cargo: 'Gerente', foto: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, nome: 'Maria Santos', email: 'maria@exemplo.com', cargo: 'Vendedor', foto: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, nome: 'Carlos Oliveira', email: 'carlos@exemplo.com', cargo: 'Estoquista', foto: 'https://i.pravatar.cc/150?img=3' },
]

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>(mockUsuarios)
  const [editingUser, setEditingUser] = useState<Usuario | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const showNotification = useNotification()

  const handleAddOrUpdateUser = (user: Omit<Usuario, 'id'>) => {
    if (editingUser) {
      setUsuarios(usuarios.map(u => u.id === editingUser.id ? { ...user, id: editingUser.id } : u))
      showNotification("Usuário atualizado", `${user.nome} foi atualizado com sucesso.`)
    } else {
      const newId = Math.max(...usuarios.map(u => u.id), 0) + 1
      setUsuarios([...usuarios, { ...user, id: newId }])
      showNotification("Usuário adicionado", `${user.nome} foi adicionado com sucesso.`)
    }
    setIsDialogOpen(false)
    setEditingUser(null)
  }

  const handleDeleteUser = (id: number) => {
    const deletedUser = usuarios.find(u => u.id === id)
    setUsuarios(usuarios.filter(user => user.id !== id))
    showNotification(
      "Usuário excluído",
      `${deletedUser?.nome} foi removido do sistema.`,
      () => {
        if (deletedUser) {
          setUsuarios(prev => [...prev, deletedUser])
        }
      }
    )
  }

  const openEditDialog = (user: Usuario) => {
    setEditingUser(user)
    setIsDialogOpen(true)
  }

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        Usuários
      </motion.h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6 flex items-center">
            <Plus className="mr-2" /> Adicionar Usuário
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Editar Usuário' : 'Adicionar Usuário'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            handleAddOrUpdateUser({
              nome: formData.get('nome') as string,
              email: formData.get('email') as string,
              cargo: formData.get('cargo') as string,
              foto: formData.get('foto') as string,
            })
          }}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome
                </Label>
                <Input id="nome" name="nome" defaultValue={editingUser?.nome} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" name="email" defaultValue={editingUser?.email} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cargo" className="text-right">
                  Cargo
                </Label>
                <Input id="cargo" name="cargo" defaultValue={editingUser?.cargo} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="foto" className="text-right">
                  URL da Foto
                </Label>
                <Input id="foto" name="foto" defaultValue={editingUser?.foto} className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">{editingUser ? 'Atualizar' : 'Adicionar'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {usuarios.map((usuario) => (
          <Card key={usuario.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={usuario.foto} alt={usuario.nome} />
                  <AvatarFallback>{usuario.nome.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{usuario.nome}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{usuario.email}</p>
              <p className="text-sm font-medium mt-2">{usuario.cargo}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="icon" onClick={() => openEditDialog(usuario)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDeleteUser(usuario.id)}>
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


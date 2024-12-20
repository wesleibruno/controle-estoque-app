'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useTheme } from '../components/ThemeProvider'
import { useNotification } from '../components/Notification'
import { Toaster } from "@/components/ui/toaster"

export default function Configuracoes() {
  const [nomeEmpresa, setNomeEmpresa] = useState('Minha Empresa')
  const [emailContato, setEmailContato] = useState('contato@minhaempresa.com')
  const [notificacoesEmail, setNotificacoesEmail] = useState(true)
  const { theme, toggleTheme } = useTheme()
  const showNotification = useNotification()

  const handleSalvar = () => {
    // Implementar lógica para salvar configurações
    showNotification('Configurações salvas', 'Suas configurações foram atualizadas com sucesso.')
  }

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6"
      >
        Configurações
      </motion.h1>
      <Card>
        <CardHeader>
          <CardTitle>Configurações Gerais</CardTitle>
          <CardDescription>Gerencie as configurações do seu sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nomeEmpresa">Nome da Empresa</Label>
            <Input
              id="nomeEmpresa"
              value={nomeEmpresa}
              onChange={(e) => setNomeEmpresa(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emailContato">E-mail de Contato</Label>
            <Input
              id="emailContato"
              type="email"
              value={emailContato}
              onChange={(e) => setEmailContato(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="notificacoesEmail"
              checked={notificacoesEmail}
              onCheckedChange={setNotificacoesEmail}
            />
            <Label htmlFor="notificacoesEmail">Receber notificações por e-mail</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="temaEscuro"
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
            <Label htmlFor="temaEscuro">Ativar tema escuro</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSalvar}>Salvar Configurações</Button>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}


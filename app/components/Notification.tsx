'use client'

// import { useToast } from "@/components/ui/use-toast"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

export function useNotification() {
  const { toast } = useToast()

  const showNotification = (title: string, description: string, action?: () => void) => {
    toast({
      title,
      description,
      action: action ? <ToastAction altText="Desfazer" onClick={action}>Desfazer</ToastAction> : undefined,
    })
  }

  return showNotification
}


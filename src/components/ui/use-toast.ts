import * as React from "react"
import { toast as toastManager } from "@/components/ui/toast"

type ToastOptions = {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive" | "form"
}

export function toast({ title, description, variant = "default" }: ToastOptions) {
  return toastManager.add({ title, description, type: variant })
}

export function useToast() {
  return {
    toasts: [],
    toast,
    dismiss: (toastId?: string) => toastManager.close(toastId),
  }
}

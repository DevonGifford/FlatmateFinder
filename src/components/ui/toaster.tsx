import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  toast,
  useToastManager,
} from "@/components/ui/toast"

function ToastList() {
  const { toasts } = useToastManager()

  return (
    <>
      {toasts.map((toastItem) => (
        <Toast key={toastItem.id} toast={toastItem}>
          <div className="grid gap-1">
            {toastItem.title && <ToastTitle>{toastItem.title}</ToastTitle>}
            {toastItem.description && (
              <ToastDescription>{toastItem.description}</ToastDescription>
            )}
          </div>
          <ToastClose />
        </Toast>
      ))}
    </>
  )
}

export function Toaster() {
  return (
    <ToastProvider toastManager={toast}>
      <ToastList />
      <ToastPortal>
        <ToastViewport />
      </ToastPortal>
    </ToastProvider>
  )
}

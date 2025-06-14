
import { X, CheckCircle, AlertCircle, XCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button.jsx"
import { cn } from "@/lib/utils.js"

export function Toast({ toast, onDismiss }) {
  const icons = {
    default: Info,
    success: CheckCircle,
    destructive: XCircle,
    warning: AlertCircle,
  }

  const colors = {
    default: "bg-white border-gray-200 text-gray-900",
    success: "bg-green-50 border-green-200 text-green-900",
    destructive: "bg-red-50 border-red-200 text-red-900",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
  }

  const Icon = icons[toast.variant] || icons.default

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 w-96 rounded-lg border p-4 shadow-lg transition-all duration-300",
        colors[toast.variant],
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold">{toast.title}</h4>
          {toast.description && <p className="text-sm opacity-90 mt-1">{toast.description}</p>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-70 hover:opacity-100"
          onClick={() => onDismiss(toast.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

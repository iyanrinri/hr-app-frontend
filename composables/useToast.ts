import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export interface Toast {
  id: string
  title?: string
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

const toasts = ref<Toast[]>([])

export const useToast = () => {
  const add = (toast: Omit<Toast, 'id'>) => {
    const id = uuidv4()
    const newToast: Toast = {
      id,
      duration: 5000, // default 5s
      type: 'info',
      ...toast
    }
    
    toasts.value.push(newToast)

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, newToast.duration)
    }
    
    return id
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message: string, title?: string) => {
    add({ message, title, type: 'success' })
  }

  const error = (message: string, title?: string) => {
    add({ message, title, type: 'error' })
  }

  const info = (message: string, title?: string) => {
    add({ message, title, type: 'info' })
  }

  const warning = (message: string, title?: string) => {
    add({ message, title, type: 'warning' })
  }

  return {
    toasts,
    add,
    remove,
    success,
    error,
    info,
    warning
  }
}

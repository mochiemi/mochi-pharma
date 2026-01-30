import { reactive } from 'vue'

const notifications = reactive([])

let idCounter = 0

export function useNotification() {
  const show = (options) => {
    const id = ++idCounter
    const notification = {
      id,
      type: options.type || 'info',
      title: options.title || '',
      message: options.message,
      duration: options.duration !== undefined ? options.duration : 3000
    }

    notifications.push(notification)

    // Auto-remove após a duração
    if (notification.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, notification.duration + 300) // +300ms para animação
    }

    return id
  }

  const remove = (id) => {
    const index = notifications.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.splice(index, 1)
    }
  }

  // Helpers
  const success = (message, title = '') => show({ type: 'success', title, message })
  const error = (message, title = '') => show({ type: 'error', title, message })
  const warning = (message, title = '') => show({ type: 'warning', title, message })
  const info = (message, title = '') => show({ type: 'info', title, message })

  return {
    notifications,
    show,
    remove,
    success,
    error,
    warning,
    info
  }
}

// Exporta as notificações para uso global
export { notifications }

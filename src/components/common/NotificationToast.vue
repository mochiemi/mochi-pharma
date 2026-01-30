<template>
  <transition name="slide-fade">
    <div v-if="visible" class="notification" :class="typeClass">
      <div class="notification-icon">
        <i :class="iconClass"></i>
      </div>
      <div class="notification-content">
        <h4 v-if="title" class="notification-title">{{ title }}</h4>
        <p class="notification-message">{{ message }}</p>
      </div>
      <button class="notification-close" @click="close">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </transition>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'NotificationToast',
  props: {
    type: {
      type: String,
      default: 'success',
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const visible = ref(false)

    const typeClass = computed(() => `notification-${props.type}`)

    const iconClass = computed(() => {
      const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
      }
      return icons[props.type]
    })

    const close = () => {
      visible.value = false
      setTimeout(() => emit('close'), 300)
    }

    onMounted(() => {
      visible.value = true
      if (props.duration > 0) {
        setTimeout(close, props.duration)
      }
    })

    return {
      visible,
      typeClass,
      iconClass,
      close
    }
  }
}
</script>

<style scoped>
.notification {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 16px 20px;
  border-radius: var(--border-radius);
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 400px;
  position: relative;
}

.notification-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.notification-message {
  font-size: 14px;
  margin: 0;
  line-height: 1.4;
}

.notification-close {
  background: none;
  border: none;
  color: inherit;
  opacity: 0.5;
  cursor: pointer;
  padding: 4px;
  font-size: 14px;
  transition: opacity 0.2s;
}

.notification-close:hover {
  opacity: 1;
}

/* Types */
.notification-success {
  border-left: 4px solid #66bb6a;
}
.notification-success .notification-icon {
  color: #66bb6a;
}

.notification-error {
  border-left: 4px solid #ef5350;
}
.notification-error .notification-icon {
  color: #ef5350;
}

.notification-warning {
  border-left: 4px solid #ffa726;
}
.notification-warning .notification-icon {
  color: #ffa726;
}

.notification-info {
  border-left: 4px solid #42a5f5;
}
.notification-info .notification-icon {
  color: #42a5f5;
}

/* Animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>

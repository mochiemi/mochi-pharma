<template>
  <div class="alert-box" :class="alertClass">
    <div class="alert-icon">
      <i :class="icon || defaultIcon"></i>
    </div>
    <div class="alert-content">
      <div v-if="title" class="alert-title">{{ title }}</div>
      <div class="alert-message">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertBox',
  props: {
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['info', 'warning', 'danger', 'success'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    alertClass() {
      return `alert-${this.type}`
    },
    defaultIcon() {
      const icons = {
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle',
        danger: 'fas fa-exclamation-circle',
        success: 'fas fa-check-circle'
      }
      return icons[this.type] || 'fas fa-info-circle'
    }
  }
}
</script>

<style scoped>
.alert-box {
  padding: 16px 20px;
  border-radius: var(--border-radius);
  margin: 20px 0;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  border-left: 5px solid;
}

.alert-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.alert-content {
  flex: 1;
}

.alert-title {
  font-weight: 700;
  margin-bottom: 5px;
  font-size: 16px;
}

.alert-message {
  line-height: 1.6;
}

.alert-info {
  background-color: rgba(139, 65, 153, 0.1);
  border-left-color: var(--secondary);
  color: var(--text);
}

.alert-info .alert-icon {
  color: var(--secondary);
}

.alert-warning {
  background-color: rgba(238, 182, 150, 0.2);
  border-left-color: var(--accent-light2);
  color: var(--text);
}

.alert-warning .alert-icon {
  color: var(--accent-light2);
}

.alert-danger {
  background-color: rgba(187, 102, 139, 0.15);
  border-left-color: var(--accent);
  color: var(--text);
}

.alert-danger .alert-icon {
  color: var(--accent);
}

.alert-success {
  background-color: rgba(102, 187, 106, 0.15);
  border-left-color: #66bb6a;
  color: var(--text);
}

.alert-success .alert-icon {
  color: #66bb6a;
}
</style>
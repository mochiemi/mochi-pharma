<template>
  <button
    class="base-button"
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <i v-if="icon" :class="icon" class="button-icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline', 'text'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClasses() {
      return [
        `button-${this.variant}`,
        `button-${this.size}`,
        { 'full-width': this.fullWidth, 'disabled': this.disabled }
      ]
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 16px;
  transition: var(--transition);
  font-family: inherit;
}

.button-primary {
  background-color: var(--accent);
  color: white;
}

.button-primary:hover:not(.disabled) {
  background-color: var(--secondary);
  transform: translateY(-3px);
}

.button-secondary {
  background-color: var(--accent-light2);
  color: var(--primary-dark);
}

.button-secondary:hover:not(.disabled) {
  background-color: var(--accent-light);
  color: white;
}

.button-outline {
  background-color: transparent;
  color: var(--accent);
  border: 2px solid var(--accent);
}

.button-outline:hover:not(.disabled) {
  background-color: var(--accent);
  color: white;
}

.button-text {
  background-color: transparent;
  color: var(--accent);
  border: none;
}

.button-text:hover:not(.disabled) {
  background-color: var(--shadow);
}

.button-small {
  padding: 8px 16px;
  font-size: 14px;
}

.button-large {
  padding: 16px 32px;
  font-size: 18px;
}

.full-width {
  width: 100%;
}

.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.disabled:hover {
  transform: none !important;
}

.button-icon {
  font-size: 18px;
}
</style>
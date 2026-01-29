<template>
  <div 
    class="base-card" 
    :class="{ 'hoverable': hoverable, 'clickable': clickable }"
    :style="cardStyle"
    @click="handleClick"
  >
    <div v-if="title || $slots.icon" class="card-header">
      <div v-if="$slots.icon" class="card-icon">
        <slot name="icon"></slot>
      </div>
      <h2 v-if="title" class="card-title">{{ title }}</h2>
    </div>
    
    <div class="card-content">
      <slot></slot>
    </div>
    
    <div v-if="$slots.actions" class="card-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    hoverable: {
      type: Boolean,
      default: true
    },
    clickable: {
      type: Boolean,
      default: false
    },
    borderColor: {
      type: String,
      default: 'var(--accent)'
    }
  },
  computed: {
    cardStyle() {
      return {
        'border-left-color': this.borderColor
      }
    }
  },
  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style scoped>
.base-card {
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: var(--card-padding);
  box-shadow: 0 8px 16px var(--shadow);
  margin-bottom: 25px;
  border-left: 6px solid var(--accent);
}

.hoverable:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px var(--shadow);
}

.clickable {
  cursor: pointer;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.card-icon {
  background-color: var(--accent-light);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-title {
  color: var(--primary);
  font-size: 22px;
  font-weight: 600;
}

.card-actions {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>
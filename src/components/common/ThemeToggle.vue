<template>
  <div class="theme-toggle">
    <span class="toggle-label">{{ isDarkMode ? $t('theme.dark') : $t('theme.light') }}</span>
    <label class="toggle-switch">
      <input type="checkbox" v-model="isDarkMode" @change="toggleTheme">
      <span class="slider"></span>
    </label>
    <span class="toggle-label">{{ isDarkMode ? $t('theme.light') : $t('theme.dark') }}</span>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ThemeToggle',
  setup() {
    const isDarkMode = ref(false)
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
    const currentTheme = localStorage.getItem('theme')
    
    onMounted(() => {
      if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        isDarkMode.value = true
        document.body.classList.add('dark-mode')
      }
    })
    
    const toggleTheme = () => {
      if (isDarkMode.value) {
        document.body.classList.add('dark-mode')
        localStorage.setItem('theme', 'dark')
      } else {
        document.body.classList.remove('dark-mode')
        localStorage.setItem('theme', 'light')
      }
    }
    
    return {
      isDarkMode,
      toggleTheme
    }
  }
}
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toggle-label {
  font-weight: 600;
  color: var(--text-light);
  font-size: 14px;
  min-width: 45px;
  text-align: center;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--card-bg);
  border-radius: 34px;
  transition: var(--transition);
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: var(--accent-light2);
  border-radius: 50%;
  transition: var(--transition);
}

input:checked + .slider {
  background-color: var(--accent);
}

input:checked + .slider:before {
  transform: translateX(30px);
  background-color: var(--background);
}
</style>
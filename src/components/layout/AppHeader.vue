<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <div class="logo" @click="$router.push('/')">
          <div class="logo-icon">
            <i class="fas fa-pills"></i>
          </div>
          <h1>{{ $t('app.name') }}</h1>
        </div>
        
        <div class="header-actions">
          <ThemeToggle />
          
          <select v-model="currentLocale" @change="changeLocale" class="locale-select">
            <option value="en">EN</option>
            <option value="pt">PT</option>
            <option value="es">ES</option>
          </select>
        </div>
      </div>
      
      <nav class="main-nav">
        <router-link 
          v-for="route in navRoutes" 
          :key="route.path" 
          :to="route.path"
          class="nav-link"
        >
          <i :class="route.icon"></i>
          {{ $t(`navigation.${route.name}`) }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import ThemeToggle from '../common/ThemeToggle.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'AppHeader',
  components: {
    ThemeToggle
  },
  setup() {
    const { locale } = useI18n()
    
    const navRoutes = [
      { path: '/', name: 'home', icon: 'fas fa-home' },
      { path: '/medicaments', name: 'medicaments', icon: 'fas fa-capsules' },
      { path: '/notes', name: 'notes', icon: 'fas fa-book-medical' },
      { path: '/articles', name: 'articles', icon: 'fas fa-newspaper' },
      { path: '/references', name: 'references', icon: 'fas fa-heartbeat' }
    ]
    
    return {
      navRoutes,
      locale
    }
  },
  data() {
    return {
      currentLocale: this.locale
    }
  },
  methods: {
    changeLocale() {
      this.$i18n.locale = this.currentLocale
      localStorage.setItem('locale', this.currentLocale)
    }
  }
}
</script>

<style scoped>
.app-header {
  background-color: var(--card-bg);
  padding: 20px 0;
  margin-bottom: 30px;
  border-bottom: 2px dashed var(--border);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
}

.logo-icon {
  background-color: var(--accent);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.logo h1 {
  color: var(--primary);
  font-size: 32px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.locale-select {
  padding: 8px 12px;
  border: 2px solid var(--border);
  border-radius: 8px;
  background-color: var(--background);
  color: var(--text);
  font-weight: 600;
  cursor: pointer;
}

.main-nav {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  color: var(--text-light);
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;
}

.nav-link:hover {
  background-color: var(--accent-light2);
  color: var(--primary-dark);
}

.nav-link.router-link-active {
  background-color: var(--accent);
  color: white;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 20px;
  }
  
  .main-nav {
    justify-content: flex-start;
  }
}
</style>
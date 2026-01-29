<template>
  <aside class="sidebar" :class="{ 'sidebar-collapsed': collapsed }">
    <div class="sidebar-header">
      <button class="toggle-btn" @click="toggleSidebar">
        <i :class="toggleIcon"></i>
      </button>
      <h3 v-if="!collapsed">{{ $t('app.name') }}</h3>
    </div>
    
    <nav class="sidebar-nav">
      <router-link 
        v-for="item in menuItems" 
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :title="item.label"
      >
        <div class="nav-icon">
          <i :class="item.icon"></i>
        </div>
        <span v-if="!collapsed" class="nav-label">{{ item.label }}</span>
        <span v-if="item.badge && !collapsed" class="nav-badge">{{ item.badge }}</span>
      </router-link>
    </nav>
    
    <div class="sidebar-footer" v-if="!collapsed">
      <div class="user-info">
        <div class="user-avatar">
          <i class="fas fa-user-md"></i>
        </div>
        <div class="user-details">
          <div class="user-name">Dr. User</div>
          <div class="user-role">Pharmacologist</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'Sidebar',
  setup() {
    const { t } = useI18n()
    const collapsed = ref(false)
    
    const menuItems = computed(() => [
      { 
        path: '/', 
        label: t('navigation.home'), 
        icon: 'fas fa-home',
        badge: null
      },
      { 
        path: '/medicaments', 
        label: t('navigation.medicaments'), 
        icon: 'fas fa-capsules',
        badge: '12'
      },
      { 
        path: '/notes', 
        label: t('navigation.notes'), 
        icon: 'fas fa-book-medical',
        badge: '24'
      },
      { 
        path: '/articles', 
        label: t('navigation.articles'), 
        icon: 'fas fa-newspaper',
        badge: '8'
      },
      { 
        path: '/references', 
        label: t('navigation.references'), 
        icon: 'fas fa-heartbeat',
        badge: '15'
      },
      { 
        path: '/settings', 
        label: t('common.settings'), 
        icon: 'fas fa-cog',
        badge: null
      }
    ])
    
    const toggleIcon = computed(() => 
      collapsed.value ? 'fas fa-chevron-right' : 'fas fa-chevron-left'
    )
    
    const toggleSidebar = () => {
      collapsed.value = !collapsed.value
      localStorage.setItem('sidebarCollapsed', collapsed.value)
    }
    
    // Load saved state
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState !== null) {
      collapsed.value = savedState === 'true'
    }
    
    return {
      collapsed,
      menuItems,
      toggleIcon,
      toggleSidebar
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: var(--card-bg);
  border-right: 2px solid var(--border);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  transition: var(--transition);
  z-index: 100;
  overflow-y: auto;
}

.sidebar-collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 25px 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 15px;
}

.sidebar-header h3 {
  color: var(--primary);
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  transition: var(--transition);
}

.sidebar-collapsed .sidebar-header h3 {
  opacity: 0;
  width: 0;
}

.toggle-btn {
  background-color: var(--accent);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: var(--transition);
}

.toggle-btn:hover {
  background-color: var(--secondary);
  transform: scale(1.1);
}

.sidebar-nav {
  flex: 1;
  padding: 20px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: var(--text-light);
  text-decoration: none;
  transition: var(--transition);
  position: relative;
  white-space: nowrap;
}

.nav-item:hover {
  background-color: var(--background);
  color: var(--accent);
}

.nav-item.router-link-active {
  background-color: var(--accent);
  color: white;
}

.nav-item.router-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: var(--accent-light2);
}

.nav-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
}

.nav-label {
  margin-left: 15px;
  font-weight: 500;
  transition: var(--transition);
  overflow: hidden;
}

.sidebar-collapsed .nav-label {
  opacity: 0;
  width: 0;
  margin: 0;
}

.nav-badge {
  margin-left: auto;
  background-color: var(--accent-light);
  color: white;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  min-width: 24px;
  text-align: center;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid var(--border);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--accent), var(--secondary));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  flex-shrink: 0;
}

.user-details {
  overflow: hidden;
  transition: var(--transition);
}

.sidebar-collapsed .user-details {
  opacity: 0;
  width: 0;
}

.user-name {
  font-weight: 600;
  color: var(--text);
  margin-bottom: 2px;
}

.user-role {
  font-size: 12px;
  color: var(--text-light);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar-collapsed {
    transform: translateX(0);
    width: 250px;
  }
  
  .sidebar-collapsed .sidebar-header h3,
  .sidebar-collapsed .nav-label,
  .sidebar-collapsed .user-details {
    opacity: 1;
    width: auto;
  }
}
</style>
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

// Import global styles
import './assets/global.css'

// Import components
import BaseCard from './components/common/BaseCard.vue'
import BaseButton from './components/common/BaseButton.vue'

// Import views
import HomeView from './views/HomeView.vue'
import MedicamentsView from './views/MedicamentsView.vue'
import NotesView from './views/NotesView.vue'
import ArticlesView from './views/ArticlesView.vue'
import ReferencesView from './views/ReferencesView.vue'

// Import locales
import en from './locales/en.json'
import pt from './locales/pt.json'
import es from './locales/es.json'


// Router configuration
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/medicaments', name: 'medicaments', component: MedicamentsView },
  { path: '/notes', name: 'notes', component: NotesView },
  { path: '/articles', name: 'articles', component: ArticlesView },
  { path: '/references', name: 'references', component: ReferencesView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// i18n configuration
const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages: { en, pt, es }
})

// Create app
const app = createApp(App)

// Global components
app.component('BaseCard', BaseCard)
app.component('BaseButton', BaseButton)

// Use plugins
app.use(router)
app.use(i18n)

// Mount app
app.mount('#app')
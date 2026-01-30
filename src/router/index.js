import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
        {
      path: '/',
      name: 'home',
      component: HomeView
    },
        {
      path: '/medicaments',
      name: 'medicamentos',
      component: () => import('../views/MedicamentsView.vue')
    },



  ],
})

export default router

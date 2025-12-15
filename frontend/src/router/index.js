import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Detail from '../views/Detail.vue'
import PropertiesView from '../views/PropertiesView.vue'

// Optional: About placeholder
const About = { template: '<div class="max-w-2xl mx-auto py-20 text-center text-xl">Acerca de este portal...</div>' }

const routes = [
  { path: '/', name: 'homeview', component: HomeView },
  { path: '/properties', name: 'properties', component: PropertiesView },
  { path: '/apartments/:id', name: 'property-detail', component: Detail, props: true },
  { path: '/about', name: 'about', component: About },
  { path: '/:catchAll(.*)', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router

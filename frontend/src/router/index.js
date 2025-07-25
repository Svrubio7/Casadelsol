import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'

// Optional: About placeholder
const About = { template: '<div class="max-w-2xl mx-auto py-20 text-center text-xl">Acerca de este portal...</div>' }

const routes = [
  { path: '/', name: 'homeview', component: HomeView },
  { path: '/apartments/:id', name: 'property-detail', component: Detail, props: true },
  { path: '/about', name: 'about', component: About },
  { path: '/:catchAll(.*)', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 
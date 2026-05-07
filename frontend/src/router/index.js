import { createRouter, createWebHistory } from 'vue-router'

import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import PlaylistsView from '../views/PlaylistsView.vue'
import PlaylistDetailView from '../views/PlaylistDetailView.vue'
import Layout from '../components/Layout.vue'

const routes = [
  // Routes publiques
  { path: '/', component: LandingView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },

  // Routes protégées (avec Layout)
  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      { path: 'home', component: HomeView },
      { path: 'playlists', component: PlaylistsView },
      { path: 'playlists/:id', component: PlaylistDetailView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard d'authentification
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !token) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/home')
  } else {
    next()
  }
})

export default router
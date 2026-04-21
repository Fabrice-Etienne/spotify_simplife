import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import LandingView from '../views/LandingView.vue'
import Layout from '../components/Layout.vue'

const routes = [
  {
    path: '/',
    component: LandingView
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/register',
    component: RegisterView
  },
  {
    path: '/home',
    component: HomeView
  },
  {
    path: '/',
    component: Layout,
    children: [
      { path: 'home', component: HomeView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
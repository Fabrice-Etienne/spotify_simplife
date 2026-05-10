<template>
  <div class="sidebar">

    <!-- Logo -->
    <div class="sidebar-logo">🎧 SpotifyLight</div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <router-link to="/home" class="nav-link" :class="{ active: route.path === '/home' }">
        🎵 Accueil
      </router-link>
      <router-link to="/playlists" class="nav-link" :class="{ active: route.path.startsWith('/playlists') }">
        📋 Playlists
      </router-link>
      <router-link to="/account" class="nav-link" :class="{ active: route.path === '/account' }">
        👤 Mon compte
      </router-link>
      <router-link to="/privacy" class="nav-link" :class="{ active: route.path === '/privacy' }">
        🔐 Confidentialité
      </router-link>
    </nav>

    <!-- User connecté -->
    <div class="sidebar-user" v-if="user">
      <div class="user-avatar">{{ user.username.charAt(0).toUpperCase() }}</div>
      <div class="user-info">
        <p class="user-name">{{ user.username }}</p>
        <p class="user-email">{{ user.email }}</p>
      </div>
    </div>

    <!-- Logout -->
    <button class="btn-logout" @click="logout">⏻ Déconnexion</button>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Récupère le user depuis le localStorage
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>
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

<style scoped>
.sidebar {
  width: 220px;
  height: 100vh;
  background: #0f172a;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-right: 1px solid #2d3b55;
  z-index: 50;
}

.sidebar-logo {
  font-size: 18px;
  font-weight: bold;
  color: #00aef9;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #2d3b55;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #9ca3af;
  text-decoration: none;
  font-size: 14px;
  transition: 0.2s;
}

.nav-link:hover {
  background: #1f2a40;
  color: white;
}

.nav-link.active {
  background: #1f2a40;
  color: #00aef9;
  font-weight: bold;
}

/* USER */
.sidebar-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #1f2a40;
  border-radius: 10px;
  border: 1px solid #2d3b55;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #00aef9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  color: white;
  flex-shrink: 0;
}

.user-name {
  font-size: 13px;
  font-weight: bold;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 11px;
  color: #9ca3af;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-logout {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: 1px solid #2d3b55;
  border-radius: 8px;
  color: #9ca3af;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;
  margin: 0;
}

.btn-logout:hover {
  background: #e53e3e;
  border-color: #e53e3e;
  color: white;
}
</style>
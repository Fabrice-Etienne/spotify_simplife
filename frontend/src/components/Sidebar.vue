<template>
  <div class="sidebar">
    <h2>🎧 Spotify</h2>

    <router-link to="/home">Home</router-link>
    <router-link to="/playlists">Playlists</router-link>

    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  height: 100vh;
  background: #0f172a;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

a {
  color: white;
}

button {
  margin-top: auto;
}
</style>
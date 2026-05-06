<template>
  <div>
    <h1 style="margin-bottom: 20px;">🎵 Tous les morceaux</h1>

    <div v-if="loading" style="color: var(--text-secondary);">Chargement...</div>
    <div v-if="error" style="color: red;">{{ error }}</div>

    <div class="grid">
      <div class="track-card" v-for="track in tracks" :key="track.id">
        <img
          :src="track.image || 'https://via.placeholder.com/150'"
          :alt="track.title"
        />
        <h3 style="margin-top: 8px;">{{ track.title }}</h3>
        <p style="color: var(--text-secondary); font-size: 13px;">{{ track.artist }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'

const tracks = ref([])
const loading = ref(true)
const error = ref('')
const router = useRouter()

onMounted(async () => {
  try {
    const res = await api.get('/tracks')
    tracks.value = res.data
  } catch (err) {
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      error.value = 'Erreur lors du chargement des morceaux'
    }
  } finally {
    loading.value = false
  }
})
</script>
<template>
  <div>
    <h1 style="margin-bottom: 20px;">🎵 Tous les morceaux</h1>

    <div v-if="loading" style="color: var(--text-secondary);">Chargement...</div>
    <div v-if="error" style="color: red;">{{ error }}</div>

    <div class="grid">
      <div
        class="track-card"
        v-for="track in tracks"
        :key="track.id"
        @click="playerStore.play(track, tracks)"
        :style="playerStore.currentTrack?.id === track.id ? 'border: 2px solid var(--primary);' : ''"
      >
        <div style="position: relative;">
          <img
            :src="track.image || 'https://via.placeholder.com/150'"
            :alt="track.title"
          />
          <div
            v-if="playerStore.currentTrack?.id === track.id && playerStore.isPlaying"
            style="position: absolute; top: 5px; right: 5px; background: var(--primary); border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 10px;"
          >
            ▶
          </div>
        </div>
        <h3 style="margin-top: 8px; font-size: 14px;">{{ track.title }}</h3>
        <p style="color: var(--text-secondary); font-size: 12px;">{{ track.artist }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'
import { playerStore } from '../store/player'

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
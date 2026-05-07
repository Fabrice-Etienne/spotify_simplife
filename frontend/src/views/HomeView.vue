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
        :style="playerStore.currentTrack?.id === track.id ? 'border: 2px solid var(--primary);' : ''"
      >
        <!-- Image + lecture au clic -->
        <div style="position: relative;" @click="playerStore.play(track, tracks)">
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

        <!-- Bouton ajout playlist -->
        <div style="position: relative;">
          <button
            style="margin-top: 8px; padding: 6px; font-size: 12px; background: #1f2a40; border: 1px solid var(--border);"
            @click.stop="toggleMenu(track.id)"
          >
            ➕ Ajouter à une playlist
          </button>

          <!-- Menu déroulant -->
          <div
            v-if="openMenuTrackId === track.id"
            style="position: absolute; bottom: 110%; left: 0; background: #1f2a40; border: 1px solid var(--border); border-radius: 8px; z-index: 50; min-width: 180px; padding: 8px 0;"
          >
            <div
              v-if="playlists.length === 0"
              style="padding: 10px; color: var(--text-secondary); font-size: 13px;"
            >
              Aucune playlist
            </div>
            <div
              v-for="playlist in playlists"
              :key="playlist.id"
              @click="addToPlaylist(track.id, playlist.id)"
              style="padding: 10px 15px; cursor: pointer; font-size: 13px; transition: 0.2s;"
              @mouseover="e => e.target.style.background='#2d3b55'"
              @mouseleave="e => e.target.style.background='transparent'"
            >
              🎵 {{ playlist.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification succès -->
    <div
      v-if="notification"
      style="position: fixed; bottom: 100px; right: 20px; background: #00aef9; color: white; padding: 12px 20px; border-radius: 8px; font-size: 14px; z-index: 200; transition: 0.3s;"
    >
      {{ notification }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'
import { playerStore } from '../store/player'

const tracks = ref([])
const playlists = ref([])
const loading = ref(true)
const error = ref('')
const openMenuTrackId = ref(null)
const notification = ref('')
const router = useRouter()

// Ferme le menu si on clique ailleurs
const handleClickOutside = () => {
  openMenuTrackId.value = null
}

onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  try {
    const [tracksRes, playlistsRes] = await Promise.all([
      api.get('/tracks'),
      api.get('/playlists')
    ])
    tracks.value = tracksRes.data
    playlists.value = playlistsRes.data
  } catch (err) {
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      error.value = 'Erreur lors du chargement'
    }
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const toggleMenu = (trackId) => {
  openMenuTrackId.value = openMenuTrackId.value === trackId ? null : trackId
}

const addToPlaylist = async (trackId, playlistId) => {
  openMenuTrackId.value = null
  try {
    await api.post(`/playlists/${playlistId}/tracks/${trackId}`)
    showNotification('✅ Morceau ajouté à la playlist !')
  } catch (err) {
    showNotification('❌ ' + (err.response?.data?.message || 'Erreur'))
  }
}

const showNotification = (msg) => {
  notification.value = msg
  setTimeout(() => {
    notification.value = ''
  }, 3000)
}
</script>
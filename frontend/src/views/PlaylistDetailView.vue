<template>
  <div>
    <button
      @click="router.push('/playlists')"
      style="width: auto; padding: 8px 16px; background: transparent; border: 1px solid var(--border); margin-bottom: 20px;"
    >
      ← Retour
    </button>

    <div v-if="loading" style="color: var(--text-secondary);">Chargement...</div>
    <div v-if="error" style="color: red;">{{ error }}</div>

    <div v-if="playlist">
      <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 30px;">
        <div style="width: 120px; height: 120px; background: var(--bg-card); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 50px;">
          🎵
        </div>
        <div>
          <h1>{{ playlist.name }}</h1>
          <p style="color: var(--text-secondary); margin-top: 8px;">
            {{ playlist.Tracks.length }} morceau(x)
          </p>
          <button
            v-if="playlist.Tracks.length > 0"
            @click="playAll"
            style="width: auto; padding: 10px 24px; margin-top: 12px;"
          >
            ▶ Tout lire
          </button>
        </div>
      </div>

      <!-- Liste des tracks -->
      <div v-if="playlist.Tracks.length === 0" style="color: var(--text-secondary);">
        Aucun morceau dans cette playlist.
      </div>

      <div
        v-for="(track, index) in playlist.Tracks"
        :key="track.id"
        class="track-row"
        :style="playerStore.currentTrack?.id === track.id ? 'border-left: 3px solid var(--primary);' : 'border-left: 3px solid transparent;'"
        @click="playerStore.play(track, playlist.Tracks)"
      >
        <span style="color: var(--text-secondary); min-width: 24px;">
          {{ playerStore.currentTrack?.id === track.id && playerStore.isPlaying ? '▶' : index + 1 }}
        </span>

        <img
          :src="track.image || 'https://via.placeholder.com/40'"
          style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover;"
        />

        <div style="flex: 1;">
          <p style="font-size: 14px; font-weight: bold;">{{ track.title }}</p>
          <p style="font-size: 12px; color: var(--text-secondary);">{{ track.artist }}</p>
        </div>

        <button
          @click.stop="removeTrack(track.id)"
          style="width: auto; padding: 6px 12px; background: #e53e3e; font-size: 12px;"
        >
          Retirer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api/axios'
import { playerStore } from '../store/player'

const route = useRoute()
const router = useRouter()
const playlist = ref(null)
const loading = ref(true)
const error = ref('')

const fetchPlaylist = async () => {
  try {
    const res = await api.get(`/playlists/${route.params.id}`)
    playlist.value = res.data
  } catch (err) {
    error.value = 'Erreur lors du chargement de la playlist'
  } finally {
    loading.value = false
  }
}

const playAll = () => {
  if (playlist.value.Tracks.length > 0) {
    playerStore.play(playlist.value.Tracks[0], playlist.value.Tracks)
  }
}

const removeTrack = async (trackId) => {
  if (!confirm('Retirer ce morceau de la playlist ?')) return
  try {
    await api.delete(`/playlists/${playlist.value.id}/tracks/${trackId}`)
    await fetchPlaylist()
  } catch (err) {
    alert(err.response?.data?.message || 'Erreur')
  }
}

onMounted(fetchPlaylist)
</script>
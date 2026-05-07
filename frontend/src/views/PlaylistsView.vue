<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h1>Mes Playlists</h1>
      <button style="width: auto; padding: 10px 20px;" @click="showForm = !showForm">
        + Nouvelle playlist
      </button>
    </div>

    <!-- Formulaire création -->
    <div v-if="showForm" class="card" style="margin-bottom: 20px;">
      <form @submit.prevent="createPlaylist">
        <input v-model="newPlaylistName" placeholder="Nom de la playlist" required />
        <button type="submit">Créer</button>
      </form>
    </div>

    <!-- Liste des playlists -->
    <div v-if="playlists.length === 0" style="color: var(--text-secondary);">
      Aucune playlist pour l'instant.
    </div>

    <div class="grid">
        <div
            class="track-card"
            v-for="playlist in playlists"
            :key="playlist.id"
            @click="router.push(`/playlists/${playlist.id}`)"
            style="cursor: pointer;"
        >
            <div style="font-size: 40px; text-align: center; padding: 20px;">🎵</div>
            <h3>{{ playlist.name }}</h3>
            <p style="color: var(--text-secondary); font-size: 13px;">
            {{ playlist.Tracks.length }} morceau(x)
            </p>
            <button
            style="background: #e53e3e; margin-top: 10px; padding: 6px; font-size: 12px;"
            @click.stop="deletePlaylist(playlist.id)"
            >
            Supprimer
            </button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const playlists = ref([])
const newPlaylistName = ref('')
const showForm = ref(false)

const fetchPlaylists = async () => {
  const res = await api.get('/playlists')
  playlists.value = res.data
}

const createPlaylist = async () => {
  try {
    await api.post('/playlists', { name: newPlaylistName.value })
    newPlaylistName.value = ''
    showForm.value = false
    await fetchPlaylists()
  } catch (err) {
    alert(err.response?.data?.message || 'Erreur')
  }
}

const deletePlaylist = async (id) => {
  if (!confirm('Supprimer cette playlist ?')) return
  try {
    await api.delete(`/playlists/${id}`)
    await fetchPlaylists()
  } catch (err) {
    alert(err.response?.data?.message || 'Erreur')
  }
}

onMounted(fetchPlaylists)
</script>
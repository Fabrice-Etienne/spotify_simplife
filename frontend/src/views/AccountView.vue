<template>
  <div class="account">
    <h1 style="margin-bottom: 30px;">👤 Mon compte</h1>

    <!-- Infos utilisateur -->
    <div class="account-card" v-if="user">
      <h2>Informations personnelles</h2>
      <div class="info-row">
        <span class="info-label">Nom d'utilisateur</span>
        <span class="info-value">{{ user.username }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Email</span>
        <span class="info-value">{{ user.email }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Membre depuis</span>
        <span class="info-value">{{ formatDate(user.createdAt) }}</span>
      </div>
    </div>

    <!-- RGPD -->
    <div class="account-card danger-zone">
      <h2>⚠️ Zone de danger</h2>
      <p>La suppression de votre compte est <strong>irréversible</strong>. Toutes vos données (playlists, etc.) seront définitivement supprimées.</p>

      <router-link to="/privacy" style="display: block; margin-bottom: 15px;">
        <button style="background: transparent; border: 1px solid var(--border); color: var(--text-secondary); font-size: 13px; padding: 8px;">
          📄 Voir la politique de confidentialité
        </button>
      </router-link>

      <button
        class="btn-danger"
        @click="showConfirm = true"
        v-if="!showConfirm"
      >
        🗑 Supprimer mon compte
      </button>

      <!-- Confirmation -->
      <div v-if="showConfirm" class="confirm-box">
        <p>⚠️ Êtes-vous sûr ? Cette action est irréversible.</p>
        <div style="display: flex; gap: 10px; margin-top: 10px;">
          <button class="btn-danger" @click="deleteAccount">
            Oui, supprimer définitivement
          </button>
          <button
            style="background: transparent; border: 1px solid var(--border);"
            @click="showConfirm = false"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
const showConfirm = ref(false)

onMounted(async () => {
  try {
    const res = await api.get('/users/me')
    user.value = res.data
  } catch (err) {
    console.error(err)
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const deleteAccount = async () => {
  try {
    await api.delete('/users/me')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  } catch (err) {
    alert(err.response?.data?.message || 'Erreur lors de la suppression')
  }
}
</script>

<style scoped>
.account {
  max-width: 600px;
  margin: 0 auto;
}

.account-card {
  background: var(--bg-card);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 20px;
  border: 1px solid var(--border);
}

.danger-zone {
  border-color: #e53e3e44;
}

h2 {
  font-size: 16px;
  margin-bottom: 20px;
  color: white;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}

.info-label {
  color: var(--text-secondary);
}

.info-value {
  color: white;
  font-weight: bold;
}

p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
}

.btn-danger {
  background: #e53e3e;
  width: auto;
  padding: 10px 20px;
}

.confirm-box {
  background: #e53e3e22;
  border: 1px solid #e53e3e;
  border-radius: 10px;
  padding: 15px;
}
</style>
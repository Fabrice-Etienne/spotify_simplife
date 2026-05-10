<template>
  <div class="container">
    <div class="card">
      <h2 class="center">Créer un compte</h2>

      <form @submit.prevent="handleRegister">
        <input v-model="username" placeholder="Nom d'utilisateur" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />

        <p v-if="error" style="color: red; margin-top: 10px; text-align: center;">
          {{ error }}
        </p>

        <button type="submit">S'inscrire</button>
      </form>

      <p class="center" style="margin-top: 15px;">
        Déjà un compte ?
        <router-link to="/login">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleRegister = async () => {
  error.value = ''
  try {
    await api.post('/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value
    })

    router.push('/login')
  } catch (err) {
    error.value = err.response?.data?.message || "Erreur lors de l'inscription"
  }
}

useHead({
  title: 'Créer un compte — SpotifyLight',
  meta: [
    { name: 'description', content: 'Crée ton compte SpotifyLight gratuitement.' }
  ]
})
</script>
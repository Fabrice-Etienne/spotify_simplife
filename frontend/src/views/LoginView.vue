<template>
  <div class="container">
    <div class="card">
      <h2 class="center">Se connecter</h2>

      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />

        <p v-if="error" style="color: red; margin-top: 10px; text-align: center;">
          {{ error }}
        </p>

        <button type="submit">Se connecter</button>
      </form>

      <p class="center" style="margin-top: 15px;">
        Pas encore de compte ?
        <router-link to="/register">Créer un compte</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  try {
    const res = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })

    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))

    router.push('/home')
  } catch (err) {
    error.value = err.response?.data?.message || 'Erreur lors de la connexion'
  }
}

useHead({
  title: 'Connexion — SpotifyLight',
  meta: [
    { name: 'description', content: 'Connecte-toi à ton compte SpotifyLight.' }
  ]
})
</script>
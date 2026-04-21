<template>
  <div class="container">
    <div class="card">
      <h2 class="center">Connexion</h2>

      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />

      <button @click="login">Se connecter</button>

      <p class="center">
        Pas de compte ?
        <router-link to="/register">Créer un compte</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api/axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    console.log("LOGIN CLICKED")

    const res = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })

    console.log("LOGIN SUCCESS", res.data)
    console.log("RESPONSE", res.data)
    localStorage.setItem('token', res.data.token)

    router.push('/home')

  } catch (err) {
    console.log("LOGIN ERROR:", err.response?.data || err.message)
  }
}
</script>
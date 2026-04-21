<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Se connecter</button>
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
  const res = await api.post('/auth/login', {
    email: email.value,
    password: password.value
  })

  localStorage.setItem('token', res.data.token)
  router.push('/home')
}
</script>
<template>
  <div class="cookie-banner" v-if="!accepted">
    <div class="cookie-content">
      <p>
        🍪 Cette application utilise un token JWT stocké localement pour maintenir votre session.
        Aucun cookie publicitaire n'est utilisé.
        <router-link to="/privacy" style="color: #00aef9;">En savoir plus</router-link>
      </p>
      <button class="cookie-btn" @click="accept">Accepter</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const accepted = ref(localStorage.getItem('cookieAccepted') === 'true')

const accept = () => {
  localStorage.setItem('cookieAccepted', 'true')
  accepted.value = true
}
</script>
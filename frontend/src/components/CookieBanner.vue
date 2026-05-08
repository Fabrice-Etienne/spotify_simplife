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

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 85px;
  left: 220px;
  right: 0;
  background: #1f2a40;
  border-top: 1px solid var(--border);
  padding: 15px 20px;
  z-index: 150;
}

.cookie-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

p {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
}

.cookie-btn {
  width: auto;
  padding: 8px 20px;
  font-size: 13px;
  white-space: nowrap;
  margin: 0;
}

@media (max-width: 768px) {
  .cookie-banner {
    left: 0;
  }

  .cookie-content {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
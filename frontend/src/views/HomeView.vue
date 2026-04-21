<template>
  <div>
    <h1>Tracks</h1>

    <div class="grid">
      <div class="track-card" v-for="track in tracks" :key="track.id">
        <img :src="track.image" alt="" />
        <h3>{{ track.title }}</h3>
        <p>{{ track.artist }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.card {
  background: #1f2a40;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}

img {
  width: 100%;
  border-radius: 8px;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'

const tracks = ref([])

onMounted(async () => {
  const res = await api.get('/tracks')
  tracks.value = res.data
})
</script>
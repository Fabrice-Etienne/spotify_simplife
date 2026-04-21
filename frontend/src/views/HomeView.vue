<template>
  <div>
    <h1>Tracks</h1>
    <div v-for="track in tracks" :key="track.id">
      <p>{{ track.title }} - {{ track.artist }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'

const tracks = ref([])

onMounted(async () => {
  const res = await api.get('/tracks')
  tracks.value = res.data
})
</script>
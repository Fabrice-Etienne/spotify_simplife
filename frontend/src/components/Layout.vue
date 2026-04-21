<template>
  <div class="layout">
    <Sidebar />

    <div class="content">
      <router-view />
    </div>

    <Player />
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Player from './Player.vue'
</script>

<style scoped>
.layout {
  display: flex;
}

.content {
  margin-left: 220px;
  width: 100%;
  padding: 20px;
  padding-bottom: 90px;
}
</style>
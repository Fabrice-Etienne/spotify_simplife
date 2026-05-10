<template>
  <div class="layout">
    <Sidebar />
    <div class="content">
      <router-view />
    </div>
    <Player />
    <CookieBanner />
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Player from './Player.vue'
import CookieBanner from './CookieBanner.vue'
</script>
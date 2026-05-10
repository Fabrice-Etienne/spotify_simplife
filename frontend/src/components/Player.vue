<template>
  <!-- Player actif -->
  <div class="player" v-if="playerStore.currentTrack">

    <!-- Infos morceau -->
    <div class="player-info">
      <img
        :src="playerStore.currentTrack.image || 'https://via.placeholder.com/50'"
        class="player-thumb"
      />
      <div class="player-meta">
        <p class="player-title">{{ playerStore.currentTrack.title }}</p>
        <p class="player-artist">{{ playerStore.currentTrack.artist }}</p>
      </div>
    </div>

    <!-- Contrôles centraux -->
    <div class="player-center">
      <div class="player-controls">
        <button class="ctrl-btn" @click="playerStore.prev()">⏮</button>
        <button class="ctrl-btn play-btn" @click="playerStore.play(playerStore.currentTrack)">
          {{ playerStore.isPlaying ? '⏸' : '▶' }}
        </button>
        <button class="ctrl-btn" @click="playerStore.next()">⏭</button>
        <button class="ctrl-btn stop-btn" @click="playerStore.stop()">⏹</button>
      </div>

      <!-- Barre de progression -->
      <div class="player-progress">
        <span class="player-time">{{ playerStore.formatTime(playerStore.currentTime) }}</span>
        <div class="progress-bar" @click="onSeek">
          <div class="progress-fill" :style="{ width: playerStore.progress + '%' }"></div>
        </div>
        <span class="player-time">{{ playerStore.formatTime(playerStore.duration) }}</span>
      </div>
    </div>

    <!-- Volume -->
    <div class="player-volume">
      <span>🔈</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        :value="playerStore.volume"
        @input="e => playerStore.setVolume(parseFloat(e.target.value))"
        class="volume-slider"
      />
      <span>🔊</span>
    </div>

  </div>

  <!-- Player inactif -->
  <div class="player player-empty" v-else>
    <p>🎵 Clique sur un morceau pour lancer la lecture</p>
  </div>
</template>

<script setup>
import { playerStore } from '../store/player'

const onSeek = (e) => {
  const bar = e.currentTarget
  const rect = bar.getBoundingClientRect()
  const percent = ((e.clientX - rect.left) / rect.width) * 100
  playerStore.seek(percent)
}
</script>
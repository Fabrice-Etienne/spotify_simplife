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

<style scoped>
.player {
  position: fixed;
  bottom: 0;
  left: 220px;
  right: 0;
  height: 80px;
  background: #0f172a;
  border-top: 1px solid #2d3b55;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 20px;
  z-index: 100;
}

.player-empty {
  justify-content: center;
  color: #9ca3af;
}

.player-info {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;
}

.player-thumb {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
}

.player-title {
  font-weight: bold;
  font-size: 14px;
  color: white;
}

.player-artist {
  font-size: 12px;
  color: #9ca3af;
}

.player-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ctrl-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  width: auto;
  padding: 4px 8px;
  margin: 0;
  transition: 0.2s;
}

.ctrl-btn:hover {
  opacity: 0.7;
  transform: scale(1.1);
}

.play-btn {
  font-size: 22px;
  background: #00aef9;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.stop-btn {
  color: #e53e3e;
}

.player-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 400px;
}

.player-time {
  font-size: 11px;
  color: #9ca3af;
  min-width: 35px;
  text-align: center;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: #2d3b55;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: #00aef9;
  border-radius: 2px;
  transition: width 0.1s linear;
}

.player-volume {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 150px;
}

.volume-slider {
  width: 80px;
  height: 4px;
  accent-color: #00aef9;
  cursor: pointer;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
}
</style>
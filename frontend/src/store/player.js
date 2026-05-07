import { reactive } from 'vue'

export const playerStore = reactive({
  currentTrack: null,
  isPlaying: false,
  audio: null,

  play(track) {
    if (this.currentTrack?.id === track.id) {
      if (this.isPlaying) {
        this.audio.pause()
        this.isPlaying = false
      } else {
        this.audio.play()
        this.isPlaying = true
      }
      return
    }

    if (this.audio) {
      this.audio.pause()
    }

    this.currentTrack = track
    this.audio = new Audio(track.url)
    this.audio.play()
    this.isPlaying = true

    this.audio.onended = () => {
      this.isPlaying = false
    }
  },

  stop() {
    if (this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
    }
    this.isPlaying = false
    this.currentTrack = null
  }
})

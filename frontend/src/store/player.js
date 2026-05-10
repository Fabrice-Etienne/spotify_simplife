import { reactive } from 'vue'

export const playerStore = reactive({
  currentTrack: null,
  isPlaying: false,
  audio: null,
  progress: 0,
  currentTime: 0,
  duration: 0,
  volume: 1,
  queue: [],

  play(track, queue = null) {
    if (queue) this.queue = queue

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
    this.audio.volume = this.volume
    this.audio.play()
    this.isPlaying = true
    this.progress = 0
    this.currentTime = 0
    this.duration = 0

    this.audio.ontimeupdate = () => {
      this.currentTime = this.audio.currentTime
      this.duration = this.audio.duration || 0
      this.progress = this.duration ? (this.currentTime / this.duration) * 100 : 0
    }

    this.audio.onended = () => {
      this.isPlaying = false
      this.next()
    }
  },

  stop() {
    if (this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
    }
    this.isPlaying = false
    this.currentTrack = null
    this.progress = 0
    this.currentTime = 0
    this.duration = 0
  },

  next() {
    if (!this.queue.length || !this.currentTrack) return
    const idx = this.queue.findIndex(t => t.id === this.currentTrack.id)
    const nextTrack = this.queue[idx + 1]
    if (nextTrack) this.play(nextTrack)
  },

  prev() {
    if (!this.queue.length || !this.currentTrack) return
    const idx = this.queue.findIndex(t => t.id === this.currentTrack.id)
    const prevTrack = this.queue[idx - 1]
    if (prevTrack) this.play(prevTrack)
  },

  seek(percent) {
    if (this.audio && this.duration) {
      this.audio.currentTime = (percent / 100) * this.duration
    }
  },

  setVolume(val) {
    this.volume = val
    if (this.audio) this.audio.volume = val
  },

  formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')
    return m + ':' + s
  }
})

const express = require('express')
const router = express.Router()

const Playlist = require('../models/Playlist')
const Track = require('../models/Track')

// CREATE PLAYLIST
router.post('/', async (req, res) => {
  const playlist = await Playlist.create(req.body)
  res.json(playlist)
})

// ADD TRACK TO PLAYLIST
router.post('/:playlistId/tracks/:trackId', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.playlistId)
  const track = await Track.findByPk(req.params.trackId)

  await playlist.addTrack(track)

  res.json({ message: 'Track added to playlist' })
})

// GET PLAYLIST WITH TRACKS
router.get('/:id', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.id, {
    include: Track
  })

  res.json(playlist)
})

module.exports = router
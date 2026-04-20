const express = require('express')
const router = express.Router()

const Playlist = require('../models/Playlist')
const Track = require('../models/Track')
const auth = require('../middlewares/auth.middleware')

router.post('/', auth, async (req, res) => {
  const playlist = await Playlist.create({
    ...req.body,
    UserId: req.user.id
  })

  res.json(playlist)
})

router.get('/', auth, async (req, res) => {
  const playlists = await Playlist.findAll({
    where: { UserId: req.user.id },
    include: Track
  })

  res.json(playlists)
})

router.post('/:playlistId/tracks/:trackId', auth, async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.playlistId)
  const track = await Track.findByPk(req.params.trackId)

  await playlist.addTrack(track)

  res.json({ message: 'Track ajoutée' })
})

module.exports = router
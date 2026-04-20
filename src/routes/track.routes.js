const express = require('express')
const router = express.Router()

const Track = require('../models/Track')
const auth = require('../middlewares/auth.middleware')

router.get('/', auth, async (req, res) => {
  const tracks = await Track.findAll()
  res.json(tracks)
})

router.post('/', auth, async (req, res) => {
  const track = await Track.create(req.body)
  res.json(track)
})

module.exports = router
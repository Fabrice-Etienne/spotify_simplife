const express = require('express')
const router = express.Router()

const Track = require('../models/Track')

// CREATE
router.post('/', async (req, res) => {
  const track = await Track.create(req.body)
  res.json(track)
})

// GET ALL
router.get('/', async (req, res) => {
  const tracks = await Track.findAll()
  res.json(tracks)
})

module.exports = router
const express = require('express')
const router = express.Router()
const { Playlist, Track } = require('../models') // Importation propre via index.js
const auth = require('../middlewares/auth.middleware')

// CRÉER une playlist
router.post('/', auth, async (req, res) => {
  try {
    const playlist = await Playlist.create({
      name: req.body.name,
      userId: req.user.id // Utilise le nom de colonne défini dans ton modèle/MCD
    })
    res.status(201).json(playlist)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// RÉCUPÉRER ses playlists
router.get('/', auth, async (req, res) => {
  try {
    const playlists = await Playlist.findAll({
      where: { userId: req.user.id },
      include: Track
    })
    res.json(playlists)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// AJOUTER un morceau à une playlist
router.post('/:playlistId/tracks/:trackId', auth, async (req, res) => {
  try {
    const { playlistId, trackId } = req.params
    
    const playlist = await Playlist.findByPk(playlistId)
    const track = await Track.findByPk(trackId)

    if (!playlist || !track) {
      return res.status(404).json({ message: 'Playlist ou Track introuvable' })
    }

    // Vérification de propriété (Crucial pour le bonus Cyber)
    if (playlist.userId !== req.user.id) {
      return res.status(403).json({ message: 'Interdit : Ce n\'est pas votre playlist' })
    }

    await playlist.addTrack(track)
    res.json({ message: 'Track ajoutée avec succès' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
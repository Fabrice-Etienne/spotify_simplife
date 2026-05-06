const express = require('express')
const router = express.Router()
const { Playlist, Track } = require('../models')
const auth = require('../middlewares/auth.middleware')

// POST /api/playlists — Créer une playlist
router.post('/', auth, async (req, res) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Le nom de la playlist est requis' })
    }

    const playlist = await Playlist.create({
      name,
      userId: req.user.id
    })
    res.status(201).json(playlist)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/playlists — Récupérer toutes ses playlists
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

// GET /api/playlists/:id — Récupérer une playlist spécifique
router.get('/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id, {
      include: Track
    })

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist introuvable' })
    }

    if (playlist.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès interdit' })
    }

    res.json(playlist)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/playlists/:playlistId/tracks/:trackId — Ajouter un morceau
router.post('/:playlistId/tracks/:trackId', auth, async (req, res) => {
  try {
    const { playlistId, trackId } = req.params

    const playlist = await Playlist.findByPk(playlistId)
    const track = await Track.findByPk(trackId)

    if (!playlist) return res.status(404).json({ message: 'Playlist introuvable' })
    if (!track) return res.status(404).json({ message: 'Track introuvable' })

    if (playlist.userId !== req.user.id) {
      return res.status(403).json({ message: 'Interdit : ce n\'est pas votre playlist' })
    }

    await playlist.addTrack(track)
    res.json({ message: 'Track ajoutée avec succès' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE /api/playlists/:id — Supprimer une playlist
router.delete('/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id)

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist introuvable' })
    }

    if (playlist.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès interdit' })
    }

    await playlist.destroy()
    res.json({ message: 'Playlist supprimée avec succès' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE /api/playlists/:playlistId/tracks/:trackId — Retirer un morceau
router.delete('/:playlistId/tracks/:trackId', auth, async (req, res) => {
  try {
    const { playlistId, trackId } = req.params

    const playlist = await Playlist.findByPk(playlistId)
    const track = await Track.findByPk(trackId)

    if (!playlist || !track) {
      return res.status(404).json({ message: 'Ressource introuvable' })
    }

    if (playlist.userId !== req.user.id) {
      return res.status(403).json({ message: 'Accès interdit' })
    }

    await playlist.removeTrack(track)
    res.json({ message: 'Track retirée de la playlist' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
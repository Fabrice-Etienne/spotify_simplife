const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { Playlist, PlaylistTrack } = require('../models')
const auth = require('../middlewares/auth.middleware')

// GET /api/users/me — profil de l'utilisateur connecté
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email', 'createdAt']
    })

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' })
    }

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE /api/users/me — suppression du compte (RGPD)
router.delete('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id)

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' })
    }

    // Suppression des PlaylistTracks liées aux playlists du user
    const playlists = await Playlist.findAll({ where: { userId: req.user.id } })
    for (const playlist of playlists) {
      await PlaylistTrack.destroy({ where: { PlaylistId: playlist.id } })
    }

    // Suppression des playlists
    await Playlist.destroy({ where: { userId: req.user.id } })

    // Suppression du compte
    await user.destroy()

    res.json({ message: 'Compte et données supprimés avec succès' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
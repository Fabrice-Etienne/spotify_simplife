const express = require('express')
const router = express.Router()
const User = require('../models/User')
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

module.exports = router
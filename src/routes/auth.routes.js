const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })

  if (!user) {
    return res.status(401).json({ message: 'Utilisateur introuvable' })
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    return res.status(401).json({ message: 'Mot de passe incorrect' })
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )

  res.json({
    message: 'Connexion réussie',
    token
  })
})

module.exports = router
const sequelize = require('../config/database')
const bcrypt = require('bcrypt')
require('../models')

const User = require('../models/User')
const Track = require('../models/Track')
const Playlist = require('../models/Playlist')

const seed = async () => {
  try {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    await sequelize.sync({ force: true })
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')

    const hashedPassword = await bcrypt.hash('123456', 10)

    const user = await User.create({
      username: 'testuser',
      email: 'test@mail.com',
      password: hashedPassword
    })

    const track1 = await Track.create({
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      url: 'https://example.com/1'
    })

    const track2 = await Track.create({
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      url: 'https://example.com/2'
    })

    const playlist = await Playlist.create({
      name: 'My Playlist',
      UserId: user.id
    })

    await playlist.addTrack(track1)
    await playlist.addTrack(track2)

    console.log('Seed terminé avec succès 🚀')

    process.exit()

  } catch (err) {
    console.error('Erreur seed :', err)
  }
}

seed()
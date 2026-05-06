const bcrypt = require('bcrypt')
const { User, Track, Playlist, PlaylistTrack } = require('../models')
const sequelize = require('../config/database')

const seed = async () => {
  try {
    await sequelize.sync({ force: true })
    console.log('🗑️  Tables réinitialisées')

    // Création des utilisateurs
    const hashedPassword = await bcrypt.hash('password123', 10)

    const alice = await User.create({
      username: 'alice',
      email: 'alice@test.com',
      password: hashedPassword
    })

    const bob = await User.create({
      username: 'bob',
      email: 'bob@test.com',
      password: hashedPassword
    })

    console.log('👤 Utilisateurs créés')

    // Création des tracks
    const tracks = await Track.bulkCreate([
      {
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        image: 'https://picsum.photos/seed/queen/150'
      },
      {
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        image: 'https://picsum.photos/seed/weeknd/150'
      },
      {
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        image: 'https://picsum.photos/seed/sheeran/150'
      },
      {
        title: 'Lose Yourself',
        artist: 'Eminem',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        image: 'https://picsum.photos/seed/eminem/150'
      },
      {
        title: 'Smells Like Teen Spirit',
        artist: 'Nirvana',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        image: 'https://picsum.photos/seed/nirvana/150'
      }
    ])

    console.log('🎵 Tracks créées')

    // Création des playlists
    const playlist1 = await Playlist.create({
      name: 'Mes classiques',
      userId: alice.id
    })

    const playlist2 = await Playlist.create({
      name: 'Workout 🔥',
      userId: alice.id
    })

    const playlist3 = await Playlist.create({
      name: 'Chill vibes',
      userId: bob.id
    })

    console.log('📋 Playlists créées')

    // Association tracks ↔ playlists
    await playlist1.addTracks([tracks[0], tracks[4]]) // Queen + Nirvana
    await playlist2.addTracks([tracks[1], tracks[2], tracks[3]]) // Weeknd + Sheeran + Eminem
    await playlist3.addTracks([tracks[0], tracks[2]]) // Queen + Sheeran

    console.log('🔗 Tracks associées aux playlists')

    console.log('✅ Seed terminé avec succès !')
    console.log('---')
    console.log('👤 Comptes de test :')
    console.log('   alice@test.com / password123')
    console.log('   bob@test.com   / password123')

    process.exit(0)
  } catch (err) {
    console.error('❌ Erreur seed:', err.message)
    process.exit(1)
  }
}

seed()
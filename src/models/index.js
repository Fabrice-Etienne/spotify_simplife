const User = require('./User')
const Track = require('./Track')
const Playlist = require('./Playlist')
const PlaylistTrack = require('./PlaylistTrack')

// User → Playlist
User.hasMany(Playlist)
Playlist.belongsTo(User)

// Playlist ↔ Track (many-to-many)
Playlist.belongsToMany(Track, { through: PlaylistTrack })
Track.belongsToMany(Playlist, { through: PlaylistTrack })

module.exports = {
  User,
  Track,
  Playlist,
  PlaylistTrack
};
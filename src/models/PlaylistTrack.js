const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const PlaylistTrack = sequelize.define('PlaylistTrack', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})

module.exports = PlaylistTrack
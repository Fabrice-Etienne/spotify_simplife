const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Playlist = sequelize.define('Playlist', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

module.exports = Playlist
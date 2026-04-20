const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Track = sequelize.define('Track', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },

  url: {
    type: DataTypes.STRING,
    allowNull: false
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

module.exports = Track
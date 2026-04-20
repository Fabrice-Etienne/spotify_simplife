const express = require('express')
const cors = require('cors')
require('dotenv').config()

const sequelize = require('./config/database')
require('./models')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'SpotifySimplifee API OK 🚀' })
})

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/user.routes'))
app.use('/api/tracks', require('./routes/track.routes'))
app.use('/api/playlists', require('./routes/playlist.routes'))

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database connected')

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`)
    })
  })
  .catch(err => {
    console.error('Database error:', err)
  })
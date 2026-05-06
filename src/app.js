const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
require('./models');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.url)
  next()
})

app.get('/', (req, res) => {
  res.json({ message: 'SpotifySimplifee API OK 🚀' });
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/tracks', require('./routes/track.routes'));
app.use('/api/playlists', require('./routes/playlist.routes'));

// Export pour les tests
module.exports = { app, sequelize };

// Démarre le serveur uniquement si exécuté directement
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  sequelize.sync({ alter: true })
    .then(() => {
      console.log('✅ Database connected & synced');
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    })
    .catch(err => {
      console.error('❌ Database error:', err);
    });
}
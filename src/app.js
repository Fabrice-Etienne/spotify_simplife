const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
// On importe les modèles pour s'assurer que les associations sont chargées
require('./models');

const app = express();

app.use(cors());
app.use(express.json());

// Route de santé (Healthcheck)
app.get('/', (req, res) => {
  res.json({ message: 'SpotifySimplifee API OK 🚀' });
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/tracks', require('./routes/track.routes'));
app.use('/api/playlists', require('./routes/playlist.routes'));

// Synchronisation DB et lancement
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database connected & synced');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Database error:', err);
  });
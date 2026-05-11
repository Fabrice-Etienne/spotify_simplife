const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const sequelize = require('./config/database');
require('./models');

const app = express();

// ─── SÉCURITÉ ─────────────────────────────────────────────

// Helmet — sécurise les headers HTTP
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// Rate limiting global — 100 requêtes / 15 min par IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Trop de requêtes, veuillez réessayer dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
})

// Rate limiting strict sur l'auth — 10 tentatives / 15 min
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Trop de tentatives de connexion, veuillez réessayer dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
})

app.use(globalLimiter);

// ─── MIDDLEWARES ───────────────────────────────────────────

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://spotify-simplife.vercel.app'
  ],
  credentials: true
}));
app.use(express.json({ limit: '10kb' })); // Limite la taille du body

app.use((req, res, next) => {
  console.log("➡️ REQUEST:", req.method, req.url)
  next()
})

// ─── ROUTES ───────────────────────────────────────────────

app.get('/', (req, res) => {
  res.json({ message: 'SpotifySimplifee API OK 🚀' });
});

app.use('/api/auth', authLimiter, require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/tracks', require('./routes/track.routes'));
app.use('/api/playlists', require('./routes/playlist.routes'));

// ─── GESTION DES ERREURS ──────────────────────────────────

// Route inexistante
app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

// Erreur globale
app.use((err, req, res, next) => {
  console.error('❌ Erreur:', err.message);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

// Export pour les tests
module.exports = { app, sequelize };

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
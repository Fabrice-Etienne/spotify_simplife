const express = require('express');
const router = express.Router();
const Track = require('../models/Track');
const auth = require('../middlewares/auth.middleware');

// GET all tracks
router.get('/', auth, async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des tracks", error: error.message });
  }
});

// POST a new track
router.post('/', auth, async (req, res) => {
  try {
    const { title, artist, duration, url } = req.body;
    
    if (!title || !artist) {
      return res.status(400).json({ message: "Le titre et l'artiste sont requis" });
    }

    const track = await Track.create({ title, artist, duration, url });
    res.status(201).json(track);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du track", error: error.message });
  }
});

module.exports = router;
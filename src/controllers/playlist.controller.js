const { Playlist, Track } = require('../models');

// CRÉER une playlist
exports.createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const playlist = await Playlist.create({
      name,
      userId: req.user.id // On récupère l'ID via le middleware auth
    });
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// RÉCUPÉRER toutes les playlists de l'utilisateur connecté
exports.getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.findAll({
      where: { userId: req.user.id },
      include: [Track] // Inclut les morceaux directement
    });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// AJOUTER un morceau à une playlist (Relation Many-to-Many)
exports.addTrackToPlaylist = async (req, res) => {
  try {
    const { id } = req.params; // ID de la playlist
    const { trackId } = req.body; // ID du morceau

    const playlist = await Playlist.findByPk(id);
    const track = await Track.findByPk(trackId);

    if (!playlist) return res.status(404).json({ message: "Playlist introuvable" });
    if (!track) return res.status(404).json({ message: "Morceau introuvable" });

    // SÉCURITÉ : On vérifie que la playlist appartient bien au user
    if (playlist.userId !== req.user.id) {
      return res.status(403).json({ message: "Action non autorisée sur cette playlist" });
    }

    // Utilisation de la méthode magique générée par belongsToMany
    await playlist.addTrack(track);

    res.json({ message: "Morceau ajouté à la playlist !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SUPPRIMER un morceau d'une playlist
exports.removeTrackFromPlaylist = async (req, res) => {
  try {
    const { id, trackId } = req.params;
    const playlist = await Playlist.findByPk(id);
    const track = await Track.findByPk(trackId);

    if (!playlist || !track) return res.status(404).json({ message: "Ressource introuvable" });

    if (playlist.userId !== req.user.id) {
      return res.status(403).json({ message: "Action non autorisée" });
    }

    await playlist.removeTrack(track);
    res.json({ message: "Morceau retiré de la playlist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
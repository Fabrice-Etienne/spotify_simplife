router.post('/:playlistId/tracks/:trackId', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      where: {
        id: req.params.playlistId,
        UserId: req.user.id
      }
    })

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist introuvable' })
    }

    const track = await Track.findByPk(req.params.trackId)

    if (!track) {
      return res.status(404).json({ message: 'Track introuvable' })
    }

    await playlist.addTrack(track)

    res.json({ message: 'Track ajoutée à la playlist' })

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})
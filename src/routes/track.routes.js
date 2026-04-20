router.post('/', auth, async (req, res) => {
  try {
    const { title, artist, url } = req.body

    if (!title || !artist || !url) {
      return res.status(400).json({ message: 'Champs manquants' })
    }

    const track = await Track.create({
      title,
      artist,
      url
    })

    res.status(201).json(track)

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})
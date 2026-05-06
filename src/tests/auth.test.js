const request = require('supertest')
const { app, sequelize } = require('../app')

beforeAll(async () => {
  await sequelize.sync({ force: true })
})

afterAll(async () => {
  await sequelize.close()
})

// ─── TESTS UNITAIRES ───────────────────────────────────────

describe('🔐 Auth — Tests unitaires', () => {

  describe('POST /api/auth/register', () => {

    it('✅ Doit créer un utilisateur avec des données valides', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@test.com',
          password: 'password123'
        })

      expect(res.statusCode).toBe(201)
      expect(res.body).toHaveProperty('message', 'Utilisateur créé avec succès')
      expect(res.body.user).toHaveProperty('id')
      expect(res.body.user).toHaveProperty('username', 'testuser')
      expect(res.body.user).toHaveProperty('email', 'test@test.com')
      expect(res.body.user).not.toHaveProperty('password')
    })

    it('❌ Doit refuser si email déjà utilisé', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser2',
          email: 'test@test.com',
          password: 'password123'
        })

      expect(res.statusCode).toBe(400)
      expect(res.body).toHaveProperty('message', 'Email déjà utilisé')
    })

    it('❌ Doit refuser si champs manquants', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({})

      expect(res.statusCode).toBe(400)
      expect(res.body).toHaveProperty('message', 'Tous les champs sont requis')
    })
  })

  describe('POST /api/auth/login', () => {

    it('✅ Doit retourner un token JWT avec des identifiants valides', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'password123'
        })

      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('token')
      expect(res.body).toHaveProperty('message', 'Connexion réussie')
      expect(res.body.user).not.toHaveProperty('password')
    })

    it('❌ Doit refuser avec un mauvais mot de passe', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'mauvaismdp'
        })

      expect(res.statusCode).toBe(401)
      expect(res.body).toHaveProperty('message', 'Identifiants invalides')
    })

    it('❌ Doit refuser avec un email inexistant', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'inexistant@test.com',
          password: 'password123'
        })

      expect(res.statusCode).toBe(401)
      expect(res.body).toHaveProperty('message', 'Identifiants invalides')
    })
  })
})

// ─── TESTS FONCTIONNELS ────────────────────────────────────

describe('🎵 Playlists — Tests fonctionnels', () => {
  let token

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password123'
      })
    token = res.body.token
  })

  it('✅ Doit créer une playlist pour l\'utilisateur connecté', async () => {
    const res = await request(app)
      .post('/api/playlists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Ma playlist de test' })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('name', 'Ma playlist de test')
    expect(res.body).toHaveProperty('userId')
  })

  it('✅ Doit récupérer les playlists de l\'utilisateur connecté', async () => {
    const res = await request(app)
      .get('/api/playlists')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('❌ Doit refuser l\'accès sans token', async () => {
    const res = await request(app)
      .get('/api/playlists')

    expect(res.statusCode).toBe(401)
  })
})
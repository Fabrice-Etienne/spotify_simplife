<template>
  <div class="landing">

    <!-- Navbar -->
    <nav class="landing-nav">
      <div class="landing-logo">🎧 SpotifyLight</div>
      <div class="landing-nav-links">
        <router-link to="/login">Se connecter</router-link>
        <router-link to="/register" class="btn-primary">Créer un compte</router-link>
      </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Ta musique,<br />
          <span class="hero-highlight">sans limites.</span>
        </h1>
        <p class="hero-subtitle">
          Écoute tes morceaux préférés, crée tes playlists et profite de ta musique partout.
        </p>
        <div class="hero-actions">
          <router-link to="/register">
            <button class="btn-large">Commencer gratuitement</button>
          </router-link>
          <router-link to="/login">
            <button class="btn-large btn-outline">Se connecter</button>
          </router-link>
        </div>
      </div>

      <div class="hero-visual">
        <div class="vinyl" :class="{ spinning: isSpinning }" @click="isSpinning = !isSpinning">
          <div class="vinyl-center">🎵</div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="feature-card">
        <div class="feature-icon">🎵</div>
        <h3>Bibliothèque complète</h3>
        <p>Accède à tous tes morceaux en un seul endroit.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📋</div>
        <h3>Playlists personnalisées</h3>
        <p>Crée et gère tes playlists selon tes envies.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔐</div>
        <h3>Compte sécurisé</h3>
        <p>Tes données protégées avec une authentification JWT.</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="landing-footer">
      <p>© 2026 SpotifyLight — Hackathon Full Stack</p>
    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue'
const isSpinning = ref(true)
</script>

<style scoped>
.landing {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #141E30 60%, #1a2a4a 100%);
  color: white;
  display: flex;
  flex-direction: column;
}

/* NAV */
.landing-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  border-bottom: 1px solid #2d3b55;
}

.landing-logo {
  font-size: 22px;
  font-weight: bold;
  color: #00aef9;
}

.landing-nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.landing-nav-links a {
  color: white;
  text-decoration: none;
  font-size: 14px;
  transition: 0.2s;
}

.landing-nav-links a:hover {
  color: #00aef9;
}

.btn-primary {
  background: #00aef9;
  padding: 8px 18px;
  border-radius: 20px;
  color: white !important;
}

/* HERO */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 60px;
  flex: 1;
  gap: 40px;
}

.hero-content {
  max-width: 500px;
}

.hero-title {
  font-size: 52px;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 20px;
}

.hero-highlight {
  color: #00aef9;
}

.hero-subtitle {
  font-size: 18px;
  color: #9ca3af;
  line-height: 1.6;
  margin-bottom: 35px;
}

.hero-actions {
  display: flex;
  gap: 15px;
}

.btn-large {
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background: #00aef9;
  color: white;
  width: auto;
  margin: 0;
  transition: 0.3s;
}

.btn-large:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 174, 249, 0.3);
}

.btn-outline {
  background: transparent;
  border: 2px solid #00aef9;
  color: #00aef9;
}

.btn-outline:hover {
  background: #00aef9;
  color: white;
}

/* VINYL */
.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vinyl {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, #1f2a40 30%, #0f172a 31%, #1f2a40 45%, #0f172a 46%, #1f2a40 60%, #0f172a 61%, #2d3b55 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 40px rgba(0, 174, 249, 0.2);
  transition: box-shadow 0.3s;
}

.vinyl:hover {
  box-shadow: 0 0 60px rgba(0, 174, 249, 0.4);
}

.spinning {
  animation: spin 4s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.vinyl-center {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #141E30;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

/* FEATURES */
.features {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 60px;
  border-top: 1px solid #2d3b55;
}

.feature-card {
  background: #1f2a40;
  border-radius: 16px;
  padding: 30px;
  max-width: 250px;
  text-align: center;
  border: 1px solid #2d3b55;
  transition: 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: #00aef9;
}

.feature-icon {
  font-size: 36px;
  margin-bottom: 15px;
}

.feature-card h3 {
  font-size: 16px;
  margin-bottom: 10px;
}

.feature-card p {
  font-size: 13px;
  color: #9ca3af;
  line-height: 1.5;
}

/* FOOTER */
.landing-footer {
  text-align: center;
  padding: 20px;
  color: #9ca3af;
  font-size: 13px;
  border-top: 1px solid #2d3b55;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .landing-nav {
    padding: 15px 20px;
  }

  .hero {
    flex-direction: column;
    padding: 40px 20px;
    text-align: center;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-actions {
    justify-content: center;
    flex-wrap: wrap;
  }

  .vinyl {
    width: 200px;
    height: 200px;
  }

  .features {
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
  }
}
</style>
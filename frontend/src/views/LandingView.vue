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
<template>
  <div class="container center">
    <h1>Spotify 🎧</h1>
    <p>Ta musique, tes playlists, partout.</p>

    <div style="margin-top: 30px;">
      <router-link to="/login">
        <button>Se connecter</button>
      </router-link>

      <router-link to="/register">
        <button style="margin-top:10px;">Créer un compte</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.landing {
  text-align: center;
  margin-top: 100px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
</style>
<template>
  <div class="privacy">
    <div class="privacy-card">
      <h1>🔐 Politique de confidentialité</h1>
      <p class="date">Dernière mise à jour : mai 2026</p>

      <section>
        <h2>1. Données collectées</h2>
        <p>Nous collectons uniquement les données nécessaires au fonctionnement de l'application :</p>
        <ul>
          <li>Nom d'utilisateur</li>
          <li>Adresse email</li>
          <li>Mot de passe (hashé avec bcrypt, jamais stocké en clair)</li>
          <li>Playlists et morceaux associés</li>
        </ul>
      </section>

      <section>
        <h2>2. Utilisation des données</h2>
        <p>Vos données sont utilisées exclusivement pour :</p>
        <ul>
          <li>Vous authentifier sur l'application</li>
          <li>Sauvegarder vos playlists personnelles</li>
        </ul>
        <p>Nous ne vendons, ne partageons, ni ne transmettons vos données à des tiers.</p>
      </section>

      <section>
        <h2>3. Vos droits (RGPD)</h2>
        <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
        <ul>
          <li><strong>Droit d'accès</strong> — consulter vos données personnelles</li>
          <li><strong>Droit de rectification</strong> — modifier vos informations</li>
          <li><strong>Droit à l'effacement</strong> — supprimer votre compte et toutes vos données</li>
          <li><strong>Droit à la portabilité</strong> — exporter vos données</li>
        </ul>
      </section>

      <section>
        <h2>4. Cookies</h2>
        <p>Cette application utilise uniquement un token JWT stocké dans le localStorage pour maintenir votre session. Aucun cookie tiers ni tracker publicitaire n'est utilisé.</p>
      </section>

      <section>
        <h2>5. Sécurité</h2>
        <p>Vos données sont protégées par :</p>
        <ul>
          <li>Chiffrement des mots de passe (bcrypt)</li>
          <li>Authentification par token JWT</li>
          <li>Protection contre les attaques brute force (rate limiting)</li>
          <li>Sécurisation des headers HTTP (Helmet)</li>
        </ul>
      </section>

      <div class="privacy-actions">
        <router-link to="/account">
          <button class="btn-danger">🗑 Supprimer mon compte</button>
        </router-link>
        <router-link to="/home">
          <button>← Retour</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
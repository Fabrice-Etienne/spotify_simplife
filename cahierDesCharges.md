# Cahier des Charges — SpotifyLight
### Hackathon Full Stack — EEMI 2026

---

## 1. Présentation du projet

### 1.1 Contexte

Dans le cadre du Hackathon Full Stack de l'EEMI 2026, nous avons conçu et développé **SpotifyLight**, une application web de streaming musical simplifiée. Ce projet s'inscrit dans une démarche de mise en pratique des compétences acquises en développement web full stack, en respectant les standards modernes de développement.

### 1.2 Description

SpotifyLight est une application web permettant aux utilisateurs d'écouter de la musique en streaming, de créer et gérer des playlists personnalisées, et de découvrir de nouveaux morceaux. L'application reproduit les fonctionnalités essentielles d'une plateforme de streaming musical comme Spotify, dans une version simplifiée et accessible.

### 1.3 Objectifs

- Proposer une interface intuitive et responsive pour la lecture de musique
- Permettre la gestion personnalisée de playlists
- Assurer la sécurité des données utilisateurs
- Respecter les normes RGPD en vigueur
- Déployer une application accessible en ligne

---

## 2. Fonctionnalités

### 2.1 Fonctionnalités principales

#### Authentification
- Inscription avec nom d'utilisateur, email et mot de passe
- Connexion sécurisée par token JWT
- Déconnexion
- Protection des routes privées

#### Bibliothèque musicale
- Affichage de tous les morceaux disponibles
- Lecture audio des morceaux
- Navigation entre les morceaux (suivant / précédent)
- Contrôle de lecture (play, pause, stop)
- Barre de progression cliquable avec affichage de la durée
- Contrôle du volume

#### Playlists
- Création de playlists personnalisées
- Suppression de playlists
- Ajout de morceaux à une playlist
- Retrait de morceaux d'une playlist
- Affichage du détail d'une playlist
- Lecture de tous les morceaux d'une playlist

#### Profil utilisateur
- Affichage des informations personnelles
- Suppression du compte et de toutes les données associées

### 2.2 Fonctionnalités bonus

#### Cybersécurité
- Protection contre les attaques brute force (rate limiting)
- Sécurisation des headers HTTP (Helmet)
- Validation et sanitisation des entrées utilisateur
- Limitation de la taille des requêtes

#### RGPD
- Politique de confidentialité détaillée
- Bandeau de consentement aux cookies
- Droit à l'effacement (suppression du compte et des données)
- Aucun partage de données avec des tiers

#### SEO
- Balises meta dynamiques par page
- Open Graph pour les réseaux sociaux
- Twitter Card
- Attribut `lang` sur la balise HTML

---

## 3. Choix techniques

### 3.1 Frontend

| Technologie | Version | Justification |
|---|---|---|
| Vue.js | 3.x | Framework JavaScript moderne, réactif et modulaire |
| Vue Router | 4.x | Gestion du routing côté client (SPA) |
| Axios | 1.x | Consommation de l'API REST |
| Vite | 5.x | Bundler rapide et moderne |
| @unhead/vue | 1.x | Gestion dynamique des balises meta (SEO) |

### 3.2 Backend

| Technologie | Version | Justification |
|---|---|---|
| Node.js | 18+ | Environnement d'exécution JavaScript côté serveur |
| Express.js | 5.x | Framework web léger et flexible |
| Sequelize | 6.x | ORM pour la gestion de la base de données |
| MySQL | 8.0 | Base de données relationnelle robuste |
| JWT (jsonwebtoken) | 9.x | Authentification stateless sécurisée |
| bcrypt | 6.x | Hashage sécurisé des mots de passe |
| Helmet | - | Sécurisation des headers HTTP |
| express-rate-limit | - | Protection contre les attaques brute force |
| express-validator | - | Validation des données entrantes |
| Jest + Supertest | - | Tests unitaires et fonctionnels |

### 3.3 Infrastructure

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │  HTTPS  │                 │   SQL   │                 │
│   Frontend      │ ──────► │   Backend       │ ──────► │   MySQL         │
│   Vue.js        │         │   Node.js       │         │   Database      │
│   Vercel        │ ◄────── │   Railway       │         │   Railway       │
│                 │  JSON   │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

- **Frontend** déployé sur **Vercel** — https://spotify-simplife.vercel.app
- **Backend** déployé sur **Railway** — https://spotifysimplife-production.up.railway.app
- **Base de données MySQL** hébergée sur **Railway**
- Déploiement automatique à chaque push sur la branche `main`

---

## 4. Architecture du projet

### 4.1 Structure des dossiers

```
Projet-Spotify/
├── src/                          # Backend Node.js
│   ├── app.js                    # Point d'entrée
│   ├── config/
│   │   └── database.js           # Configuration Sequelize
│   ├── controllers/
│   │   ├── auth.controller.js    # Logique authentification
│   │   └── playlist.controller.js
│   ├── middlewares/
│   │   └── auth.middleware.js    # Vérification JWT
│   ├── models/
│   │   ├── User.js
│   │   ├── Track.js
│   │   ├── Playlist.js
│   │   ├── PlaylistTrack.js
│   │   └── index.js              # Associations
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── track.routes.js
│   │   └── playlist.routes.js
│   ├── seed/
│   │   └── seed.js               # Données de démo
│   └── tests/
│       └── auth.test.js          # Tests Jest + Supertest
│
├── frontend/                     # Frontend Vue.js
│   ├── src/
│   │   ├── api/axios.js          # Configuration Axios
│   │   ├── components/           # Composants réutilisables
│   │   ├── views/                # Pages de l'application
│   │   ├── router/               # Configuration Vue Router
│   │   ├── store/                # Store player
│   │   └── style.css             # Styles globaux
│   └── vercel.json               # Configuration déploiement
│
└── README.md
```

### 4.2 Modèle Conceptuel de Données (MCD)

```
┌─────────────┐       ┌─────────────────┐       ┌─────────────┐
│    User     │       │    Playlist     │       │    Track    │
│─────────────│       │─────────────────│       │─────────────│
│ id          │ 1───n │ id              │ n───n │ id          │
│ username    │       │ name            │       │ title       │
│ email       │       │ image           │       │ artist      │
│ password    │       │ userId (FK)     │       │ url         │
│ createdAt   │       │ createdAt       │       │ image       │
│ updatedAt   │       │ updatedAt       │       │ createdAt   │
└─────────────┘       └─────────────────┘       │ updatedAt   │
                                                 └─────────────┘
                              │
                              │ via table de jointure
                              ▼
                    ┌─────────────────┐
                    │  PlaylistTrack  │
                    │─────────────────│
                    │ id              │
                    │ PlaylistId (FK) │
                    │ TrackId (FK)    │
                    │ createdAt       │
                    │ updatedAt       │
                    └─────────────────┘
```

---

## 5. API REST — Routes et endpoints

### Authentification

| Méthode | Route | Description | Auth requise |
|---|---|---|---|
| POST | `/api/auth/register` | Créer un compte | ❌ |
| POST | `/api/auth/login` | Se connecter | ❌ |

### Utilisateurs

| Méthode | Route | Description | Auth requise |
|---|---|---|---|
| GET | `/api/users/me` | Profil de l'utilisateur connecté | ✅ |
| DELETE | `/api/users/me` | Supprimer son compte (RGPD) | ✅ |

### Morceaux

| Méthode | Route | Description | Auth requise |
|---|---|---|---|
| GET | `/api/tracks` | Lister tous les morceaux | ✅ |
| POST | `/api/tracks` | Créer un morceau | ✅ |

### Playlists

| Méthode | Route | Description | Auth requise |
|---|---|---|---|
| GET | `/api/playlists` | Lister ses playlists | ✅ |
| POST | `/api/playlists` | Créer une playlist | ✅ |
| GET | `/api/playlists/:id` | Détail d'une playlist | ✅ |
| DELETE | `/api/playlists/:id` | Supprimer une playlist | ✅ |
| POST | `/api/playlists/:playlistId/tracks/:trackId` | Ajouter un morceau | ✅ |
| DELETE | `/api/playlists/:playlistId/tracks/:trackId` | Retirer un morceau | ✅ |

---

## 6. Sécurité

### 6.1 Authentification JWT
- Tokens signés avec une clé secrète stockée en variable d'environnement
- Expiration des tokens après 24h
- Vérification du token sur toutes les routes protégées
- Messages d'erreur génériques pour éviter les fuites d'information

### 6.2 Protection des données
- Mots de passe hashés avec bcrypt (salt=10)
- Jamais de mot de passe renvoyé dans les réponses API
- Vérification de propriété sur les ressources (ownership check)

### 6.3 Protection contre les attaques
- Rate limiting global : 100 requêtes / 15 min par IP
- Rate limiting sur l'auth : 10 tentatives / 15 min
- Validation et sanitisation des entrées (express-validator)
- Limitation de la taille des requêtes (10kb)
- Sécurisation des headers HTTP (Helmet)

### 6.4 RGPD
- Politique de confidentialité accessible
- Bandeau de consentement aux cookies
- Droit à l'effacement avec suppression en cascade des données
- Aucun cookie publicitaire ni tracker tiers

---

## 7. Tests

### 7.1 Tests unitaires
- Register : création d'un utilisateur valide
- Register : refus si email déjà utilisé
- Register : refus si champs manquants

### 7.2 Tests fonctionnels
- Login : retour d'un token JWT valide
- Login : refus avec mauvais mot de passe
- Login : refus avec email inexistant
- Playlists : création avec authentification
- Playlists : récupération des playlists de l'utilisateur
- Playlists : refus d'accès sans token

**Résultats : 9/9 tests passent**

---

## 8. Livrables

| Livrable | Statut |
|---|---|
| Code source sur GitHub | ✅ |
| Frontend déployé sur Vercel | ✅ |
| Backend déployé sur Railway | ✅ |
| Base de données MySQL sur Railway | ✅ |
| Documentation README | ✅ |
| Tests unitaires et fonctionnels | ✅ |
| Cahier des charges | ✅ |
| Maquette Figma | 🔄 En cours |

---

## 9. Équipe

Projet réalisé dans le cadre du Hackathon Full Stack — EEMI 2026
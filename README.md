# SpotifyLight — Hackathon Full Stack

Application web de streaming musical simplifiée, développée dans le cadre d'un hackathon Full Stack.

[Node.js](https://img.shields.io/badge/Node.js-v18+-green)
[Vue.js](https://img.shields.io/badge/Vue.js-v3-brightgreen)
[MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
[JWT](https://img.shields.io/badge/Auth-JWT-orange)
[Tests](https://img.shields.io/badge/Tests-9%2F9%20passing-success)

---

## Sommaire

- [Présentation]
- [Fonctionnalités]
- [Technologies]
- [Infrastructure]
- [Prérequis]
- [Installation]
- [Variables d'environnement]
- [Lancer le projet]
- [Routes API]
- [Tests]
- [MCD]

---

## Présentation

SpotifyLight est une application web full stack permettant d'écouter de la musique, de créer des playlists personnalisées et de gérer sa bibliothèque musicale. L'application est construite avec une architecture séparée Frontend / Backend communiquant via une API REST sécurisée par JWT.

---

## Fonctionnalités

Les fonctionnalités sont les suivantes :
- Inscription et connexion sécurisée (JWT)
- Lecture audio des morceaux avec player complet
- Navigation entre les morceaux (suivant / précédent)
- Contrôle de lecture (play, pause, stop)
- Contrôle du volume
- Barre de progression cliquable avec affichage de la durée
- Création et suppression de playlists
- Ajout et retrait de morceaux dans une playlist
- Profil utilisateur affiché dans la sidebar
- Interface responsive (mobile / desktop)

---

## Technologies

### Backend
| Technologie | Usage |
|---|---|
| Node.js | Environnement d'exécution |
| Express.js | Framework web |
| Sequelize | ORM |
| MySQL | Base de données |
| JWT (jsonwebtoken) | Authentification |
| bcrypt | Hashage des mots de passe |
| dotenv | Variables d'environnement |
| Jest + Supertest | Tests unitaires et fonctionnels |

### Frontend
| Technologie | Usage |
|---|---|
| Vue.js 3 | Framework frontend |
| Vue Router | Navigation |
| Axios | Consommation de l'API |
| Vite | Bundler |

---

## Infrastructure


## Prérequis

- Node.js v18+
- MySQL 8.0+
- npm

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/Fabrice-Etienne/spotify_simplife.git
```

### 2. Installer les dépendances backend

```bash
npm install
```

### 3. Installer les dépendances frontend

```bash
cd frontend
npm install
```

---

## 🔐 Variables d'environnement

Crée un fichier `.env` à la racine du projet :

```env
PORT=3000
DB_NAME=spotify_simplifee
DB_USER=ton_user_mysql
DB_PASSWORD=ton_mot_de_passe
DB_HOST=127.0.0.1
JWT_SECRET=une_chaine_secrete_longue_et_aleatoire
FRONTEND_URL=http://localhost:5173
```

---

## Lancer le projet

### Base de données

```bash
# Créer la base de données MySQL
sudo mysql
CREATE DATABASE spotify_simplifee;
CREATE USER 'spotify'@'localhost' IDENTIFIED BY 'ton_mot_de_passe';
GRANT ALL PRIVILEGES ON spotify_simplifee.* TO 'spotify'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Seed (données de démo)

```bash
npm run seed
```

Comptes créés par le seed :
| Email | Mot de passe |
|---|---|
| alice@test.com | password123 |
| bob@test.com | password123 |

### Backend

```bash
npm run dev
# Serveur disponible sur http://localhost:3000
```

### Frontend

```bash
cd frontend
npm run dev
# Application disponible sur http://localhost:5173
```

---

## Routes API

### Auth
| Méthode | Route | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Créer un compte | ❌ |
| POST | `/api/auth/login` | Se connecter | ❌ |

### Users
| Méthode | Route | Description | Auth |
|---|---|---|---|
| GET | `/api/users/me` | Profil de l'utilisateur connecté | ✅ |

### Tracks
| Méthode | Route | Description | Auth |
|---|---|---|---|
| GET | `/api/tracks` | Lister tous les morceaux | ✅ |
| POST | `/api/tracks` | Créer un morceau | ✅ |

### Playlists
| Méthode | Route | Description | Auth |
|---|---|---|---|
| GET | `/api/playlists` | Lister ses playlists | ✅ |
| POST | `/api/playlists` | Créer une playlist | ✅ |
| GET | `/api/playlists/:id` | Détail d'une playlist | ✅ |
| DELETE | `/api/playlists/:id` | Supprimer une playlist | ✅ |
| POST | `/api/playlists/:playlistId/tracks/:trackId` | Ajouter un morceau | ✅ |
| DELETE | `/api/playlists/:playlistId/tracks/:trackId` | Retirer un morceau | ✅ |

---

## Tests

Les tests sont écrits avec **Jest** et **Supertest**.

```bash
npm test
```

### Résultats

```
PASS src/tests/auth.test.js
     Auth — Tests unitaires
    POST /api/auth/register
      ✓ Doit créer un utilisateur avec des données valides
      ✓ Doit refuser si email déjà utilisé
      ✓ Doit refuser si champs manquants
    POST /api/auth/login
      ✓ Doit retourner un token JWT avec des identifiants valides
      ✓ Doit refuser avec un mauvais mot de passe
      ✓ Doit refuser avec un email inexistant
      Playlists — Tests fonctionnels
      ✓ Doit créer une playlist pour l'utilisateur connecté
      ✓ Doit récupérer les playlists de l'utilisateur connecté
      ✓ Doit refuser l'accès sans token

Tests: 9 passed, 9 total
```
---
### MCD

## Déploiement

L'application est déployée et accessible en ligne :

| Service | URL | Plateforme |
|---|---|---|
| Frontend | https://spotify-simplife.vercel.app | Vercel |
| Backend API | https://spotifysimplife-production.up.railway.app | Railway |

### Infrastructure de déploiement

- **Frontend** — déployé sur Vercel, connecté au repo GitHub (déploiement automatique à chaque push sur `main`)
- **Backend** — déployé sur Railway avec une instance MySQL managée
- **Base de données** — MySQL 8.0 hébergée sur Railway

### Variables d'environnement en production

**Backend (Railway) :**
| Variable | Description |
|---|---|
| `DB_HOST` | Hôte MySQL Railway |
| `DB_USER` | Utilisateur MySQL |
| `DB_PASSWORD` | Mot de passe MySQL |
| `DB_NAME` | Nom de la base de données |
| `DB_PORT` | Port MySQL (8080) |
| `JWT_SECRET` | Clé secrète JWT |
| `FRONTEND_URL` | URL du frontend Vercel |

**Frontend (Vercel) :**
| Variable | Description |
|---|---|
| `VITE_API_URL` | URL de l'API backend Railway |

## Auteur : Fabrice-Etienne ONDO-MBA

Projet réalisé dans le cadre du Hackathon Full Stack — EEMI 2026 
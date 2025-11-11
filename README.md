# FormTak - Prêt pour la production

FormTak est une application de type TikTok pour les coachs et formateurs, avec vidéos payantes ou gratuites, tips en jetons et abonnements. Cette version est préconfigurée pour le déploiement gratuit sur Railway (backend) et Vercel (frontend) avec Stripe en mode sandbox.

## Fonctionnalités

- Création de compte coach ou utilisateur
- Upload vidéo (gratuite ou payante)
- Tips via jetons (1€ = 100 jetons)
- Abonnement mensuel aux coachs
- Commissions pour la plateforme (15% sur ventes et abonnements, 10% sur tips)
- Authentification email, Google et Facebook
- Frontend mobile-first type TikTok
- Backend Express avec Stripe sandbox

## Structure du projet
formtak-production-ready/
│
├─ backend/ ← code serveur Express
│ ├─ server.js
│ ├─ package.json
│ └─ .env.example
│
├─ frontend/ ← code React
│ ├─ public/
│ ├─ src/
│ ├─ package.json
│ └─ README.md
│
## Déploiement rapide

1. Crée un compte gratuit sur [Railway](https://railway.app/) pour le backend
2. Déploie le dossier `backend/` et configure les variables d'environnement (Stripe, commissions, URL plateforme)
3. Crée un compte gratuit sur [Vercel](https://vercel.com/) pour le frontend
4. Déploie le dossier `frontend/` et configure `REACT_APP_BACKEND_URL` pour pointer vers ton backend Railway
5. Teste l'application en ligne avec les clés Stripe en **mode test**  

## Notes

- Toutes les clés Stripe doivent rester en mode **test** pour éviter des paiements réels.  
- Le `.gitignore` protège les secrets et fichiers inutiles.  
- Tu restes le seul maître de ton application.

├─ .gitignore ← fichiers à ignorer
└─ README.md ← ce fichier

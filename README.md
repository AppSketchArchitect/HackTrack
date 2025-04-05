# HackTrack

Plateforme web de gestion et de découverte de hackathons.  
Permet de consulter les hackathons à venir, de créer ou rejoindre une équipe, et de gérer son profil.

---

## 🚀 Lancement du projet

### 1. Cloner le dépôt

```bash
git clone https://github.com/AppSketchArchitect/HackTrack.git
cd hacktrack
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible à l'adresse : [http://localhost:5173](http://localhost:5173)

---

## 📦 Technologies utilisées

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)

---

## 🛠️ Structure du projet

```
src/
├── components/       → Composants réutilisables (Navbar, Spinner, etc.)
├── context/          → Contexte global (User, Loading)
├── pages/            → Pages principales (Home, Register, Login, etc.)
├── utils/            → Fonctions utilitaires
├── App.jsx           → Configuration des routes
├── main.jsx          → Entrée de l'application
└── styles.css        → Import Tailwind
```

---

## 🧪 Backend

L'application suppose une API REST disponible en local à l'adresse :  
`http://localhost:3002`

> 📌 Assure-toi que l’API est lancée avant d'utiliser l'interface.

### 📋 Cloner l'API (Si besoin)
```bash
git clone https://github.com/hellodamien/hacktrack-api
```
> 🚨 Ajoute bien -> ("type": "module") dans le package.json de l'API

---

## 📄 Licence

Projet personnel / éducatif — libre d'utilisation et d'adaptation.

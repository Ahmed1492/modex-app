# Modex — Fashion Store

A modern full-stack e-commerce fashion store built with React.js.

🔗 **Live Demo:** [modex.vercel.app](https://modex.vercel.app)

---

## 🛠️ Tech Stack

- **React.js** — UI framework
- **Redux Toolkit** — cart & wishlist state
- **React Router v6** — client-side routing (HashRouter)
- **SCSS** — styling
- **Context API** — auth, language, toast
- **localStorage** — auth persistence
- **MUI Icons** — icon library

---

## ✨ Features

- 🛍️ Product categories (Men, Women, Children, Bags, Accessories, Sale, New Season)
- 🔍 Search products
- ❤️ Wishlist
- 🛒 Cart with checkout
- 🔐 Register / Login with localStorage auth
- 🌍 Multi-language (English / Arabic + RTL)
- 📱 Fully responsive
- 🎨 Home slider, category grid, featured & trending sections

---

## 🚀 Live Demo  

[![Live Demo](https://img.shields.io/badge/View%20Live-Vercel-blue?style=for-the-badge&logo=vercel)](https://modex-app-git-main-ahmed1492s-projects.vercel.app/)



---

## 🚀 Deploy to GitHub Pages

### 1. Install dependencies

```bash
npm install
```

### 2. Install gh-pages

```bash
npm install gh-pages --save-dev
```

### 3. Update `package.json`

Add the `homepage` field — replace `YOUR_USERNAME` and `YOUR_REPO_NAME`:

```json
"homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
```

Add deploy scripts:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  "start": "react-scripts start",
  "build": "CI=false react-scripts build"
}
```

### 4. Push your code to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 5. Deploy

```bash
npm run deploy
```

This builds the app and pushes it to the `gh-pages` branch automatically.

### 6. Enable GitHub Pages

1. Go to your repo on GitHub
2. **Settings** → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **gh-pages** → **/ (root)**
5. Click **Save**

Your site will be live at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME
```

---

## 🌐 Deploy to Vercel (Recommended)

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Create React App.

### Option B — Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Framework: **Create React App** (auto-detected)
5. Build command: `CI=false react-scripts build`
6. Output directory: `build`
7. Click **Deploy**

The `vercel.json` in this repo already handles SPA routing.

---

## 💻 Run Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Navigate into the project
cd YOUR_REPO_NAME

# Install dependencies
npm install

# Start the dev server
npm start
```

App runs at `http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── component/          # Reusable components (Navbar, Footer, Card, Cart...)
├── page/               # Page components (Home, Login, Register, About...)
├── context/            # React Context (Auth, Language, Toast)
├── redux/              # Redux store, cart & wishlist slices
├── mocks/              # Static product data
├── hooks/              # Custom hooks
└── img/                # Static images
```

---

## 📄 License

MIT — free to use and modify.

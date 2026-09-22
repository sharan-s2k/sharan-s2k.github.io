# Sharan Saravanan Portfolio

React + Vite portfolio.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

This project includes `.github/workflows/deploy.yml`.

1. Push the project to the GitHub Pages repository.
2. In GitHub, go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main`.

The workflow builds the Vite app and deploys `dist/` automatically.

## Structure

- `src/App.jsx` — portfolio content and React components
- `src/styles.css` — theme and responsive layout
- `src/main.jsx` — React entry point
- `.github/workflows/deploy.yml` — GitHub Pages deployment

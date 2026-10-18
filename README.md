# VELORA — Less, But Better.

Contemporary luxury fashion e-commerce experience with dark editorial aesthetics, oversized serif typography, cinematic photography, interactive shopping bag drawer, and simulated checkout flow.

## ✨ Features

- **Editorial Visual Hierarchy**: Cormorant Garamond serif and Plus Jakarta Sans typography, `#101110` noir background with `#B6A58A` champagne gold accents.
- **Cinematic Motion**: Slow, subtle hero zooms, scroll-linked parallax depth, and clipped line-by-line typographic reveals.
- **Interactive Catalogue**: Instant live filtering (Men, Women, Unisex, New Arrivals), sorting, and hover image crossfades.
- **Persistent Shopping Bag**: Stored in `localStorage` with a dynamic free express shipping calculator (threshold ₹2,999).
- **Simulated Checkout Flow**: Full address verification and order generation with reference IDs (`#VEL-2026-XXXX`).

## 🛠️ Development & Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

## 🚀 GitHub Pages Deployment

This repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically build and deploy the React Vite app:

1. In your GitHub repository (`vishy0x27/VELORA`), go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).
4. Your site will be live at `https://vishy0x27.github.io/VELORA/`.

# 🏎️ APEX — Formula 1 Intelligence

APEX is a modern Formula 1 intelligence dashboard built to bring together race data, driver standings, the season calendar, analytics, and the latest paddock news in one premium experience.

### 🚀 Live Demo

**[View APEX Live →](https://f1-4u.vercel.app/)**

The project focuses on a clean, data-driven interface inspired by Formula 1 broadcast timing systems rather than the typical red-and-carbon-fiber F1 design.

> **APEX is an independent project and is not affiliated with Formula 1, the FIA, or any Formula 1 team.**

---

## ✨ Features

* 🏆 Driver and constructor standings
* 📅 Full Formula 1 season calendar
* 👤 Driver profiles and spotlight sections
* 📊 Telemetry-inspired analytics and charts
* 🔴 Live-style session indicators
* 📰 Latest Formula 1 and paddock news
* ⚡ Smooth animations and transitions
* 📱 Fully responsive design
* 🎨 Custom F1-inspired design system

---

## 🎨 Design

APEX uses a visual style inspired by modern race timing and broadcast interfaces.

### Color System

* **Graphite Black** — Main background and surfaces
* **Sector Purple** — Primary accent inspired by fastest sector times
* **Warm Gold** — Highlights, live moments, and CTAs
* **Cyan, Pink & Green** — Reserved for analytics and chart data

### Typography

* **Big Shoulders Display** — Headlines and major numbers
* **Inter** — Body text and interface content
* **IBM Plex Mono** — Race data, timestamps, labels, and telemetry

A signature telemetry ticker runs beneath the navigation, while driver cards use oversized race numbers and typography to create a premium racing-inspired experience.

---

## 🛠️ Tech Stack

* **React 18**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **Framer Motion**
* **Recharts**
* **Lucide React**

---

## 📡 Data Sources

APEX uses public APIs to power its Formula 1 data.

| Source         | Used For                                 |
| -------------- | ---------------------------------------- |
| Jolpica F1 API | Season calendar, standings, race results |
| OpenF1 API     | Session information and driver data      |
| NewsAPI        | Latest Formula 1 news                    |

All API requests are handled through reusable service files, keeping components clean and avoiding direct `fetch` calls inside the UI.

---

## 📁 Project Structure

```text
src/
│
├── components/     # Page sections and reusable UI components
├── hooks/          # Custom data-fetching hooks
├── services/       # API clients and HTTP utilities
├── types/          # Shared TypeScript types
├── utils/          # Formatting and helper functions
│
└── main.tsx
```

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/codewithmkay/f1.git
```

Move into the project:

```bash
cd f1
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Then start the development server:

```bash
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file using `.env.example` as a reference.

```env
VITE_JOLPICA_BASE_URL=
VITE_OPENF1_BASE_URL=
VITE_NEWS_API_KEY=
```

The Jolpica and OpenF1 APIs do not require an API key. For the news section, add your NewsAPI key.

---

## 📦 Build for Production

```bash
npm run build
```

The production files will be generated inside:

```text
dist/
```

You can preview the production build locally with:

```bash
npm run preview
```

---

## 🌐 Deployment

APEX can be deployed to platforms such as **Vercel, Netlify, Cloudflare Pages, or GitHub Pages**.

Before deploying, make sure your environment variables are configured in your hosting platform.

---

## 🔮 Future Improvements

* More detailed driver statistics
* Race-by-race form tracking
* Expanded telemetry visualizations
* Circuit-specific pages
* Improved live session data
* Additional Formula 1 news sources

---

## 👨‍💻 Author

Built by **CodeWithMkay**

If you like the project, consider giving the repository a ⭐.

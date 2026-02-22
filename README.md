# 👨‍💻 Nicolás Zalazar — Professional Portfolio

**Interactive portfolio website showcasing Data Engineering projects, certifications, and technical expertise.**

---

## 🌐 Live Demo

**🔗 [View Portfolio](https://nicolenki7.github.io/Portfolio/)**

---

## 📖 Overview

This is my personal portfolio website built with modern web technologies, featuring:

- **Responsive Design** — Optimized for desktop, tablet, and mobile
- **Bilingual Support** — English/SSpanish language toggle
- **Interactive Project Showcase** — Swipeable project cards with Swiper.js
- **Technical Stack Visualization** — Dynamic skill tags with hover effects
- **Certification Gallery** — Professional credentials display
- **Contact Integration** — Direct links to LinkedIn, Email, GitHub, Tableau

---

## 🎨 Design Philosophy

The portfolio follows a **cyberpunk/tech aesthetic** with:

- **Dark Theme** — `#0a0a0c` background with `#00f2ff` cyan accents
- **Monospace Typography** — JetBrains Mono for headers, Inter for body text
- **Grid Background** — Subtle dot matrix pattern for tech feel
- **Glitch Effects** — Hover animations on contact links
- **Glass Morphism** — Semi-transparent cards with blur effects

---

## 🏗️ Architecture

```
Portfolio/
├── index.html                 # Main HTML structure + embedded CSS/JS
├── img/
│   ├── profile/              # Profile pictures
│   ├── projects/             # Project screenshots
│   └── certifications/       # Certificate images
├── proyectos/
│   └── (project detail pages)
└── docs/
    └── (documentation files)
```

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **HTML** | Semantic HTML5 structure |
| **CSS** | Custom CSS with CSS Variables, Grid, Flexbox |
| **JavaScript** | Vanilla JS for language switching, interactions |
| **Fonts** | JetBrains Mono (Google Fonts), Inter (Google Fonts) |
| **Carousel** | Swiper.js 11 (touch-enabled swipe gestures) |
| **Icons** | Custom CSS styling |
| **Hosting** | GitHub Pages |

---

## 🚀 Features

### Language Switcher
- **EN/ES Toggle** — Real-time language switching without page reload
- **Persistent Selection** — Remembers user preference
- **Smooth Transitions** — Fade animations between languages

### Project Showcase
- **Interactive Cards** — Swipe/touch navigation with Swiper.js
- **Project Details** — Title, description, tech stack, links
- **Visual Previews** — High-quality project screenshots

### Technical Stack Section
- **Skill Tags** — Categorized by domain (Data Engineering, BI, ML, etc.)
- **Hover Effects** — Detailed descriptions on hover
- **Visual Hierarchy** — Primary skills highlighted

### Contact Bar
- **Multi-Channel** — LinkedIn, Email, GitHub, Tableau Public
- **Glitch Animation** — Cyberpunk-style hover effects
- **Direct Links** — One-click access to professional profiles

---

## 🎯 Featured Projects (Portfolio Highlights)

| Project | Description | Tech Stack |
| :--- | :--- | :--- |
| **Data Mesh on Fabric** | Multi-domain data architecture | PySpark, KQL, Power BI |
| **AdTech Fraud Detection** | 10TB log processing pipeline | Snowflake, SQL, Python UDFs |
| **Crypto Medallion Analytics** | DeFi data pipeline + ML | Fabric, MLflow, Streamlit |
| **Alpha Terminal** | Institutional ETF analytics | Streamlit, Plotly, Pandas |
| **Retail Star Schema** | Enterprise BI solution | PySpark, Delta Lake, DAX |

---

## 🚀 Local Development

### Prerequisites
- Any modern web browser
- Optional: Python HTTP server for local testing

### Running Locally

```bash
# Clone repository
git clone https://github.com/Nicolenki7/Portfolio.git
cd Portfolio

# Option 1: Open directly in browser
open index.html

# Option 2: Use Python HTTP server
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Customization

To customize the portfolio:

1. **Colors** — Edit CSS variables in `<style>` section:
```css
:root {
    --bg-color: #0a0a0c;
    --accent-color: #00f2ff;
    --text-color: #e0e0e0;
}
```

2. **Content** — Edit text in `index.html` (both EN and ES sections)

3. **Projects** — Update project cards in the Swiper container

4. **Images** — Replace files in `img/` directory

---

## 📊 Performance

| Metric | Score |
| :--- | :--- |
| **Lighthouse Performance** | 95+ |
| **Mobile Friendly** | ✅ |
| **Accessibility** | 90+ |
| **SEO** | 85+ |
| **Best Practices** | 95+ |

---

## 🔮 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Blog section for technical articles
- [ ] Project filtering by category
- [ ] Downloadable PDF resume
- [ ] Contact form with email integration
- [ ] Analytics integration (privacy-focused)
- [ ] PWA support for offline access

---

## 📝 Spanish Summary (Resumen en Español)

**Portfolio Profesional** es mi sitio web personal que muestra proyectos de Data Engineering, certificaciones y experiencia técnica. Incluye diseño responsivo, selector de idioma inglés/español, galería interactiva de proyectos con Swiper.js, visualización de stack técnico, y enlaces directos a perfiles profesionales (LinkedIn, GitHub, Tableau). El diseño sigue una estética cyberpunk/tech con tema oscuro, tipografía monospace, y efectos de animación. Construido con HTML5, CSS custom, JavaScript vanilla, y alojado en GitHub Pages.

---

## 📫 Contact

| Platform | Link |
| :--- | :--- |
| **LinkedIn** | [nicolas-zalazar-63340923a](https://www.linkedin.com/in/nicolas-zalazar-63340923a) |
| **Email** | zalazarn046@gmail.com |
| **GitHub** | [Nicolenki7](https://github.com/Nicolenki7) |
| **Tableau** | [nicolas.zalazar6519](https://public.tableau.com/app/profile/nicolas.zalazar6519/vizzes) |

---

## 📄 License

MIT License — Feel free to fork and customize for your own portfolio.

---

*Last Updated: February 2026*

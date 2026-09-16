# Vinoth Balaji — Portfolio

Personal portfolio site for Vinoth Balaji — Technical Lead, Associate Manager, and AI/analytics
specialist. Built with Angular (standalone components, signals) and GSAP for scroll-driven
animation.

**Live site:** https://vinoth-balaji.github.io/

## Sections

- **Hero** — positioning, core stack, primary CTAs
- **About** — narrative bio, snapshot cards
- **Impact** — career metrics (bento grid)
- **Featured Work** — case studies (Aviation, Pricing, CDP, VaR, MyOps)
- **Capabilities** — technical capability map
- **Leadership** — mentoring philosophy, progression, AI-assisted engineering
- **Journey** — career timeline
- **AI Copilot** — in-page chat grounded in a local knowledge base (no external API calls)
- **Contact** — email, LinkedIn, GitHub, resume download

## Development server

```bash
npm install
npm start
```

Open `http://localhost:4200/`. The app reloads automatically on source changes.

## Building

```bash
npm run build
```

Production output is written to `dist/portfolio/browser/`.

## Testing

```bash
npm test
```

## Deployment

Deployment is automated via [GitHub Actions](../.github/workflows/deploy.yml): every push to
`main` builds the app and publishes `dist/portfolio/browser/` to GitHub Pages. No manual build
or copy step is required.

## Tech stack

Angular 22 · TypeScript · SCSS · GSAP/ScrollTrigger · standalone components · signals

# Silk Road Architecture Development Institute

A bilingual (English / Persian RTL) knowledge platform for the architectural cultures of the Silk Roads.

The platform treats the Silk Road as a network of distinct cultures—not a single aesthetic. It includes an interactive atlas, city comparison, research and archive portals, observatory dashboards, programmes, events, publications, institutional network, global search, user profiles, and a local settings/CMS interface.

## Technology

- React + TypeScript + Vite
- Tailwind CSS
- Responsive English and native RTL Persian interface
- Demonstration records in `src/data/seedData.ts`

## Local development

Install Node.js 20+ and then run:

```bash
npm install
npm run dev
```

The included Express server provides demonstration-only in-memory endpoints. It is not a production database or authentication service. Before launching a public production service, connect a secure backend and replace all demonstration authentication and seeded claims with verified sources.

## Deployment

GitHub Pages can host the static Vite build. Dynamic features that depend on `/api` endpoints require a separate backend deployment.

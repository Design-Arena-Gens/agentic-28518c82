# Sitamarhi Goat Intelligence Platform

Precision full-stack command center for a commercial goat farm in Sitamarhi, Bihar. The platform unifies identity management (RFID, microchip, nose print biometrics), advanced breeding genetics, Bihar-specific health programs, nutrition optimisation, financial intelligence, production ops, staff RBAC, AI-driven analytics, and third-party integrations for weather, markets, and government advisories.

## 🚀 Tech Stack

- [Next.js 14 (App Router + TypeScript)](https://nextjs.org/)
- React Server + Client Components hybrid design
- Recharts for analytics visualisations
- On-device in-memory data store simulating farm operations
- Live weather integration via Open-Meteo API

## 🧭 Features Overview

- **Identity & Registry** — Five-generation genealogy, RFID/microchip intake workflows, biometric registry.
- **Breeding & Genetics** — COI calculations, pairing risk profiling, AI-driven kidding forecasts.
- **Health & Vaccination** — Bihar disease templates, vet scheduling, vaccination cadences.
- **Weight & Growth** — ADG/FCR calculations, trend charts, predictive leaders, weight capture forms.
- **Movement Tracking** — GPS geofencing logs, pasture notes, rotation intelligence.
- **Nutrition & Feed** — Azolla-first rations, cost tracking, ingredient intelligence.
- **Financial Suite** — Income/expense breakdowns, production profitability KPIs.
- **Production & Sales** — Multi-product ledger (meat, milk, breeding stock).
- **Staff & Tasks** — RBAC roster, AI/sensor/manual task orchestration, status updates.
- **Reporting & AI** — Predictive insights, computer-vision highlights, KPI dashboards.
- **Alerts & Notifications** — Multi-channel escalation with acknowledgement workflow.
- **Integrations & APIs** — Live weather refresh, market benchmarks, government scheme feeds.

## 🛠️ Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to access the dashboard.

### Useful Scripts

- `npm run dev` – Start local development server.
- `npm run build` – Build production bundle.
- `npm start` – Run production build locally.
- `npm run lint` – Execute Next.js lint rules.

## 📦 Deployment

Ready for Vercel deployment. Use the provided production command:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-28518c82
```

Verify after DNS propagation:

```bash
curl https://agentic-28518c82.vercel.app
```

## 📄 License

Licensed under the MIT License.

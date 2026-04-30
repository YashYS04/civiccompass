# Civic Compass AI

> AI-powered election guide for Indian citizens — eligibility checks, EVM education, polling booth discovery, and personalized voting guidance.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)](https://typescriptlang.org)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4)](https://ai.google.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28)](https://firebase.google.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## What It Does

Civic Compass AI transforms complex Election Commission of India (ECI) rules into clear, actionable guidance. Users interact with a conversational AI assistant, check their voter eligibility through a guided wizard, study EVM and VVPAT procedures, view election phase timelines, and locate polling booths on a live Google Map — all from a single, accessible dashboard.

---

## Features

- **AI Assistant** — Context-aware chat powered by Gemini 2.5 Flash. Answers questions about voter registration (Form 6), document requirements (EPIC, Aadhaar), election phases, and EVM procedures. Responses are structured in markdown with checklists and bold highlights.
- **Eligibility Checker** — Three-step guided form verifying age (18+ on qualifying date), Indian citizenship, and Electoral Roll enrollment. Provides direct links to the ECI portal on failure.
- **Election Education** — Tabbed panel explaining EVM operation (Control Unit + Balloting Unit), VVPAT verification (7-second paper slip), and voting-day rules (no mobile phones, indelible ink, accepted photo IDs).
- **Election Timeline** — Visual vertical timeline of five phases: Notification → Nominations → Campaigning → Polling → Counting.
- **Polling Booth Locator** — Enter a 6-digit PIN code to see nearby booths on a live Google Map with an "Open in Maps" deep link for directions.

---

## Architecture

```
Client (React/Next.js)          API Layer (Serverless)         Google Cloud
┌──────────────────┐      ┌──────────────────────────┐    ┌─────────────────┐
│  Landing Page    │      │  POST /api/chat          │    │  Gemini 2.5     │
│  Voter Dashboard │─────▶│  ├─ Input Sanitization   │───▶│  Flash          │
│  AI Chat Panel   │      │  ├─ Rate Limiter (20/min)│    ├─────────────────┤
│  Maps Iframe     │      │  └─ Gemini SDK Call      │    │  Firestore      │
└──────────────────┘      └──────────────────────────┘    │  (Session Logs) │
                                                          ├─────────────────┤
                                                          │  Maps Embed API │
                                                          └─────────────────┘
```

| Layer | Technology | Role |
|---|---|---|
| Frontend | React 19, Next.js 16 App Router, Vanilla CSS | Accessible UI with CSS custom properties for light/dark theming |
| Backend | Next.js API Routes (serverless) | Request validation, sanitization, rate limiting, Gemini orchestration |
| AI | `@google/genai` SDK, `gemini-2.5-flash` | Non-partisan, structured responses grounded in Indian electoral law |
| Data | Firebase Firestore | Persists every conversation turn with server-side timestamps |
| Maps | Google Maps Embed API (`search` mode) | PIN-code-based polling booth discovery inside a zero-JS iframe |

---

## Google Services Integration

| # | Service | What It Does | Why This Service |
|---|---|---|---|
| 1 | **Google Gemini AI** | Powers the conversational assistant via `/api/chat`. Receives sanitized messages, returns markdown guidance. | Gemini 2.5 Flash provides sub-4s latency with high factual accuracy at minimal cost — essential for a civic tool that must be both fast and trustworthy. |
| 2 | **Firebase Firestore** | Logs every user question and AI response with `serverTimestamp()` for analytics and audit trails. | Serverless, auto-scaling document DB with zero infrastructure. Conversation logging requires no dedicated backend or database provisioning. |
| 3 | **Google Maps Embed API** | Renders an interactive map of nearby polling booths when a user enters a PIN code. Uses `search` mode with `zoom=14`. | Embed API loads inside an iframe with no client-side JS SDK, keeping the bundle small. The `search` mode returns multiple map markers vs. the single-pin `place` mode. |

---

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts          # Gemini endpoint: sanitize → rate-limit → respond
│   ├── compass/page.tsx           # Dashboard: lazy-loads 5 components via next/dynamic
│   ├── globals.css                # Design tokens, dark mode, @keyframes, skip-link
│   ├── layout.tsx                 # Root layout: SEO meta, skip-to-content link
│   └── page.tsx                   # Landing page (static)
├── components/
│   ├── ChatInterface.tsx          # AI chat + Firestore persistence (React.memo)
│   ├── ElectionEducation.tsx      # EVM/VVPAT/rules tabs (React.memo, ARIA tablist)
│   ├── EligibilityChecker.tsx     # 3-step wizard (React.memo, role="alert")
│   ├── MapLocator.tsx             # Maps Embed + PIN validation (React.memo)
│   ├── TimelineViewer.tsx         # Election phases <ol> (React.memo)
│   └── ui/                        # Button, Input, Card (CSS Modules)
├── lib/
│   ├── ai.ts                      # Gemini client init + system prompt
│   ├── firebase.ts                # Firebase app init (graceful fallback)
│   └── utils.ts                   # sanitizeInput, isValidPincode, checkRateLimit
tests/
├── utils.test.ts                  # 9 unit tests (sanitization, validation, rate limit)
└── api-chat.test.ts               # 3 integration tests (400s, mock mode)
```

---

## Setup

```bash
git clone https://github.com/YashYS04/civiccompass.git && cd civiccompass
npm install
cp .env.example .env.local         # Fill in your API keys
npm run dev                        # http://localhost:3000
```

### Environment Variables

```env
# Required
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_MAPS_API_KEY=your_maps_embed_api_key

# Optional (enables conversation logging)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=000000000
NEXT_PUBLIC_FIREBASE_APP_ID=1:000:web:abc
```

All secrets are loaded at runtime via `.env.local` (gitignored). A `.env.example` template is included for onboarding.

---

## Security

| Threat | Mitigation | Location |
|---|---|---|
| XSS / Injection | HTML-entity escaping (`<`, `>`, `"`, `'`) + 2,000-char truncation on all user input before Gemini | `lib/utils.ts → sanitizeInput()` |
| API Abuse | In-memory sliding-window rate limiter: 20 requests/min per IP. Returns HTTP 429 on breach | `lib/utils.ts → checkRateLimit()` |
| Clickjacking | `X-Frame-Options: DENY` on all responses | `next.config.ts → headers()` |
| MIME Sniffing | `X-Content-Type-Options: nosniff` | `next.config.ts → headers()` |
| Unauthorized Framing | `Content-Security-Policy: frame-src https://www.google.com` — only Google Maps iframes allowed | `next.config.ts → headers()` |
| Secret Exposure | Zero hardcoded keys. All credentials in `.env.local`, excluded via `.gitignore` | `.env.example` documents required vars |
| Malformed Input | 6-digit Indian PIN code regex validation (`/^[1-9][0-9]{5}$/`) before Maps API query | `lib/utils.ts → isValidPincode()` |

---

## Efficiency

| Technique | Effect |
|---|---|
| `next/dynamic` with `ssr: false` | `MapLocator` and `ChatInterface` are excluded from the initial server-rendered bundle, reducing First Contentful Paint |
| `React.memo` on all 5 components | Prevents re-renders unless props change — critical since the dashboard renders all components on one page |
| `useCallback` for scroll handler | `scrollToBottom` in ChatInterface is memoized to avoid function recreation per render |
| `compress: true` | Gzip compression on all Next.js responses via `next.config.ts` |
| 4 runtime dependencies | `@google/genai`, `firebase`, `lucide-react`, `react-markdown`. No CSS framework. No heavy UI library |
| Deleted unused assets | Removed default `page.module.css`. Source code totals ~50KB excluding `node_modules` |

---

## Testing

```bash
npx jest tests/utils.test.ts       # 9 unit tests
npx jest tests/api-chat.test.ts    # 3 integration tests
```

| File | Function Under Test | Cases |
|---|---|---|
| `utils.test.ts` | `sanitizeInput` | XSS tag stripping, whitespace trim, 2000-char max, quote escaping |
| `utils.test.ts` | `isValidPincode` | Valid PINs (110001, 560034), leading-zero reject, wrong-length reject, alpha reject |
| `utils.test.ts` | `checkRateLimit` | Under-limit pass, over-limit block |
| `api-chat.test.ts` | `POST /api/chat` | Missing messages → 400, non-array → 400, mock mode → 200 with fallback content |

---

## Accessibility

Built to WCAG 2.1 Level AA:

| Requirement | Implementation |
|---|---|
| Skip Navigation | `<a href="#main-content" class="skip-link">` — visible on keyboard focus, bypasses header |
| Focus Indicators | Global `:focus-visible` with `2px solid` ring and `2px` offset on every interactive element |
| Landmarks | `role="banner"`, `role="main"`, `<aside aria-label="AI Guide">`, `<nav aria-label="User profile">` |
| Live Regions | Chat container: `role="log"` + `aria-live="polite"`. Loading indicator: `role="status"` |
| Tabs | Education panel: `role="tablist"` / `role="tab"` with `aria-selected` and `aria-controls` |
| Alerts | Eligibility results and PIN validation errors: `role="alert"` for immediate announcement |
| Semantic Structure | `<header>`, `<main>`, `<aside>`, `<section>`, `<ol>` for timeline, `<form>` for inputs |
| Color Contrast | Light/dark mode via `prefers-color-scheme`. All text meets 4.5:1 contrast ratio |

---

## Example User Flows

**First-Time Voter →** Opens dashboard → Eligibility Checker answers: 18+, Indian citizen, not on Electoral Roll → Receives Form 6 guidance with ECI portal link → Asks AI: *"What documents do I need for Form 6?"* → Gets a checklist (passport photo, address proof, age proof).

**Polling Day Prep →** Enters PIN code `400001` (Mumbai) → Map shows 3 nearby booths → Clicks "Open in Maps" for directions → Switches to Education tab → Reviews EVM voting steps and VVPAT verification → Asks AI: *"Can I use Aadhaar instead of Voter ID?"* → Gets a list of 12 accepted photo IDs.

**Student Learning Civics →** Reads the Election Timeline (5 phases) → Asks AI: *"What is the Model Code of Conduct?"* → Gets a structured explanation with enforcement examples → Switches to "Voting Rules" tab → Learns about indelible ink and the no-phone policy.

---

## Design Principles

1. **Non-Partisan** — The system prompt explicitly prohibits recommending any party or candidate. Responses cite ECI rules, not opinions.
2. **Graceful Degradation** — Missing Gemini key → mock mode with clear message. Missing Firebase config → logging silently skips. Missing Maps key → iframe shows error without crashing the app.
3. **Minimal Footprint** — Entire source tree is under 50KB. No images, no bundled fonts (Google Fonts loaded via `next/font`), no CSS framework.
4. **Accessibility First** — Every component is built for keyboard and screen reader users before visual styling is applied.

---

## Deployment

Deployed on **Google Cloud Run** (`us-central1`):

```bash
gcloud run deploy civiccompass --source . --region us-central1 --allow-unauthenticated \
  --set-env-vars "GEMINI_API_KEY=<key>,NEXT_PUBLIC_MAPS_API_KEY=<key>,NEXT_PUBLIC_FIREBASE_PROJECT_ID=<id>" \
  --memory 512Mi --port 8080
```

Live URL: `https://civiccompass-922145000896.us-central1.run.app`

---

## Future Roadmap

- Multilingual UI (Hindi, Tamil, Bengali) via `next-intl`
- Firebase Auth (anonymous sign-in for session persistence)
- Push notifications for election date reminders (FCM)
- Offline-capable education content via service worker
- Admin dashboard for question analytics and geographic insights

---

## License

[MIT](LICENSE)

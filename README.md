# Civic Compass AI – Election Process Education Assistant
**Navigating democracy through intelligent, accessible, and high-performance guidance.**

---

## Overview
Civic Compass AI is a production-grade digital assistant designed to demystify the Indian electoral process. By leveraging state-of-the-art AI and location services, the platform provides citizens with non-partisan guidance on registration, eligibility, and polling logistics, ensuring every voter is prepared for election day.

## Key Features
- **Context-Aware AI Assistant**: Real-time interaction with a legally-grounded election expert.
- **Voter Eligibility Wizard**: Multi-step verification based on ECI (Election Commission of India) rules.
- **Interactive Election Timeline**: Clear visualization of the 5-phase electoral cycle.
- **Polling Booth Locator**: Live geographic discovery using the Google Maps Platform.
- **EVM & VVPAT Education**: Structured guides on voting machinery and security protocols.

## Architecture
The platform follows a **Clean Architecture** pattern to ensure modularity and scalability:

- **Frontend (UI Layer)**: Built with **Next.js 16 (App Router)** and React. It uses a custom hook-based state management system to decouple UI from business logic.
- **Services Layer**: Centralized API and infrastructure communication (AI, Database, Maps), ensuring the "Separation of Concerns" principle.
- **AI Layer**: An optimized proxy between the client and Google's LLM infrastructure, utilizing sliding-window context history for efficiency.

## Google Services Integration
This project integrates core Google Cloud services to provide industry-standard reliability:
- **Google Vertex AI (Gemini)**: Provides the reasoning engine for non-partisan electoral guidance, ensuring high factual grounding.
- **Google Maps Platform**: powers the `MapLocator` component, enabling users to find polling stations with sub-meter precision.
- **Google Firebase**: Utilizes **Cloud Firestore** for secure, server-side session persistence and conversation logging.
- **Google Cloud Run**: Serves as the serverless host, providing auto-scaling and high availability.

## Project Structure
```text
civiccompass/
├── src/
│   ├── app/                # Next.js App Router (Routes & Layouts)
│   ├── components/
│   │   ├── chat/           # Modular Chat sub-components
│   │   ├── map/            # Map rendering modules
│   │   └── ui/             # Reusable Atomic UI Primitives
│   ├── hooks/              # Custom React Hooks (Business Logic)
│   ├── services/           # Infrastructure Services (AI, DB, API)
│   ├── lib/                # Shared utilities & configurations
│   └── tests/              # Comprehensive test suites
├── public/                 # Optimized static assets
└── next.config.ts          # Security & Performance configuration
```

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YashYS04/civiccompass.git
   cd civiccompass
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment**: Create a `.env.local` file (see below).
4. **Run Development Server**:
   ```bash
   npm run dev
   ```
5. **Build for Production**:
   ```bash
   npm run build
   ```

## Environment Variables
Example configuration for `.env.local`:
```env
# AI Intelligence
GEMINI_API_KEY=your_google_vertex_ai_key

# Mapping Services
NEXT_PUBLIC_MAPS_API_KEY=your_google_maps_key

# Database Infrastructure
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
```

## Security Practices
- **Strict CSP**: Content-Security-Policy headers implemented to prevent XSS.
- **Rate Limiting**: Sliding-window IP-based limiting on all AI endpoints.
- **Input Sanitization**: Multi-stage HTML/Script stripping on all user inputs.
- **Secret Management**: Zero-exposure of API keys in client-side code; all sensitive logic is proxied through the server.

## Performance & Efficiency
- **Minimal Bundle Size**: Zero heavy dependencies; standard styling uses optimized CSS variables.
- **Lazy Loading**: Components like Maps and AI Chat are dynamically imported with skeleton loaders to improve TTI (Time to Interactive).
- **Intelligent Caching**: Implemented a memory-bounded LRU cache for search results to eliminate redundant API overhead.
- **Memoization**: Strategic use of `React.memo` and `useCallback` to achieve near-zero unnecessary re-renders.

## Testing
Comprehensive testing ensures platform stability:
- **Unit Tests**: Validating sanitization logic and eligibility calculations.
- **API Tests**: Verifying rate-limiting and response schemas.
- **Manual Verification**: Cross-browser accessibility and responsiveness audits.
```bash
npm test  # Runs the full Jest test suite
```

## Accessibility (WCAG 2.1)
- **Keyboard Navigation**: Full support including skip-to-content links and focus trapping.
- **Semantic HTML**: Proper use of `<main>`, `<section>`, and `<nav>` landmarks.
- **ARIA Patterns**: Correct implementation of roles (`log`, `alert`, `tablist`) for screen reader support.
- **Color Contrast**: 4.5:1 ratio maintained for all text elements.

## Example User Flows
1. **New Voter**: Checks eligibility → Learns about Form 6 → Locates nearest registration office.
2. **Polling Day**: Checks EVM/VVPAT procedures → Finds polling booth PIN code → Reviews ID requirements.
3. **Curious Citizen**: Asks AI assistant about the Model Code of Conduct or election history.

## Design Principles
- **Clarity over Complexity**: Simple, high-contrast layouts.
- **Non-Partisan Interaction**: Neutral AI persona grounded in electoral law.
- **Efficiency-First**: Sub-100ms response times for UI interactions.

## Future Improvements
- **Multi-lingual Support**: Integration of regional Indian languages (Hindi, Tamil, etc.).
- **Anonymous Auth**: Using Firebase Auth for session recovery without PII collection.
- **Electoral Roll API**: Direct integration for live enrollment status verification.

## License
Distributed under the MIT License. See `LICENSE` for more information.

---
**Civic Compass AI** – Empowering the Electorate through Technology.

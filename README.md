# GorkhayAI

GorkhayAI is a voice-first local intelligence app for the Darjeeling hills. It turns scattered news, alerts, schemes, and public updates into a calm, swipeable, source-visible feed.

## What works now (no-API prototype)

- Nepali-first defaults for UI/content/audio preferences
- Onboarding and persisted personalization settings
- Swipeable Home feed with lane chips and sticky search
- API-backed feed + search wiring behind feature flags
- Adapter-based live ingestion (RSS + extractor) with per-source health reporting
- Govt Schemes lane with utility-first cards (`who for`, `benefit`, `eligibility`, `learn more`, `ask for help`)
- Guardian Angel Note request/draft/rating/publish workflow and in-feed rendering
- Browser speech fallback for listen-now and Voice Today no-API playback
- Admin source health and help/note queue views

## What is still mocked / deferred

- Google OAuth and phone OTP provider are mock adapters
- Premium server TTS is not integrated (browser speech fallback is default)
- Telephony and production-grade voice ingestion are not wired
- Database persistence remains partially fixture-backed while Prisma schema is ready

## Feature flags for live prototype

Set in `.env.local`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gorkhayai"
ENABLE_LIVE_INGESTION="true"
NEXT_PUBLIC_USE_API_FEED="true"
```

- `ENABLE_LIVE_INGESTION=true`: turns on live source ingestion in API feed/search.
- `NEXT_PUBLIC_USE_API_FEED=true`: makes UI use API responses instead of fixture-only local calls.

## Source strategy

See [SOURCE_STRATEGY.md](./SOURCE_STRATEGY.md) for source registry, trust tiers, fragility risks, and fallback plans.

## Getting started

### Prerequisites
- Node.js 18+
- npm

### Install
```bash
npm install
```

### Run
```bash
npm run dev
```

Open `http://localhost:3000`.

## Useful testing identities (mock auth)

- `reader@example.com` -> reader
- `contributor@example.com` -> contributor
- `writer@example.com` -> note_writer
- `guardian@example.com` -> guardian
- `admin@gorkhayai.com` -> admin

Phone numbers ending in `0000` map to guardian in OTP mock flow.
Development OTP: `123456`.

## Validation commands

```bash
npm run test
npm run typecheck
npm run lint
npm run build
```

## Tomorrow morning quick demo flow

1. Enable both live flags in `.env.local`.
2. Start with Home (`/`) and show lane switching + source-visible story cards.
3. Open Search (`/search`) and show summary + sources.
4. Show Govt Schemes lane and Help CTA.
5. Open a story detail and Guardian Angel Note flow.
6. Show Voice Today browser playback.
7. Show `/admin/sources` with admin mock session for source health.

## Docs for continuation

- [PLAN.md](./PLAN.md)
- [STATUS.md](./STATUS.md)
- [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md)
- [SOURCE_STRATEGY.md](./SOURCE_STRATEGY.md)

# GorkhayAI

GorkhayAI is a voice-first local intelligence app for the Darjeeling hills. It turns scattered news, alerts, and public updates into a calm, swipeable, source-visible, truth-checked feed.

## What is implemented in Phase 2

- Nepali-first language defaults for UI, content, and audio preference
- Expanded language scaffolding: Nepali, English, Hindi, Bengali, Tibetan, Lepcha, Bhutanese / Dzongkha, Sherpa
- Guest mode plus mock Google sign-in and mock phone OTP sign-in
- Onboarding flow with language, place, topic, digest, scheme-alert, and audio-speed preferences
- Sticky top search on Home and Search with lane chips
- Perplexity-style search results with answer summary, recent searches, and suggestions
- Immediate browser-based `listen now` playback using Web Speech API fallback
- Govt Schemes lane with searchable scheme cards and help entry points
- Guardian Angel Note naming and protected request / draft / rate APIs
- Voice-help request flow with admin review queue
- Adapter-based live source ingestion scaffolding with RSS and extractor adapters
- Source health endpoint and admin views for sources, notes, and help queues
- Prisma schema expanded for preferences, sources, health checks, schemes, help requests, and notes
- Test coverage for role checks, note publish rules, feed/search basics, and source adapter selection

## What remains feature-flagged or mocked

- Google auth and phone OTP use local mock adapters for now
- Server-generated premium TTS is not integrated yet; browser speech is the current fallback
- Live source ingestion is behind `ENABLE_LIVE_INGESTION=true`
- UI usage of API-backed live feed is behind `NEXT_PUBLIC_USE_API_FEED=true`
- Social-source ingestion is not enabled and remains intentionally excluded from the core architecture
- Save state for scheme cards is still local UI state; story save state is server-protected mock-session storage

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Environment variables

Copy `.env.example` to `.env.local` and set what you need.

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gorkhayai"
ENABLE_LIVE_INGESTION="false"
NEXT_PUBLIC_USE_API_FEED="false"
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful role-testing identities

The auth adapter is mock-backed for this phase. These email prefixes unlock roles for testing.

- `reader@example.com` -> reader
- `contributor@example.com` -> contributor
- `writer@example.com` -> note_writer
- `guardian@example.com` -> guardian
- `admin@gorkhayai.com` -> admin

Phone numbers ending in `0000` map to guardian in the OTP mock flow.
The development OTP is `123456`.

## Commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run test
npm run build
```

## Live-source testing

Set these flags in `.env.local`:

```bash
ENABLE_LIVE_INGESTION="true"
NEXT_PUBLIC_USE_API_FEED="true"
```

Current seeded live-source adapters include:

- Darjeeling District Administration
- GTA Information Cell
- Kalimpong DM Office
- MyScheme India
- India Meteorological Department
- Hills Brief (RSS placeholder)
- Radio Hills (extractor placeholder)
- Tea Board Hills Desk

The ingestion layer prefers RSS or approved extractor URLs. It does not rely on broad social scraping.

## Repo structure

- `app/` Next.js App Router pages and API routes
- `components/` reusable UI building blocks
- `data/fixtures/` seeded content, notes, sources, and schemes
- `lib/client/` browser audio, language, and request helpers
- `lib/server/` feed, search, notes, saves, help, and ingestion logic
- `prisma/schema.prisma` domain schema scaffold
- `tests/` unit and integration tests

## Notes

Read [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md) for assumptions, tradeoffs, and next steps.


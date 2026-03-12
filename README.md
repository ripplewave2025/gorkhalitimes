# GorkhayAI

GorkhayAI is a voice-first local intelligence app for the Darjeeling hills. It turns scattered news, alerts, schemes, and public updates into a calm, swipeable, source-visible feed.

## Demo-ready now

- Nepali-first UI with repaired Unicode content and Devanagari-safe typography
- Centered spotlight-style Home feed with an image-led lead story, lane chips, source pills, and calmer supporting rails
- Search, Story Detail, Voice Today, Saved, Help, onboarding, auth, and settings flows working end-to-end
- Govt Schemes cards with practical summary, eligibility snapshot, document chips, save, learn-more, and help actions
- Browser speech fallback for story listening and Voice Today
- Adapter-based live ingestion path behind flags
- Reliable investor demo mode that stays polished even if live sources fail

## Still mocked or deferred

- Google OAuth and phone OTP provider are mock adapters
- Premium server TTS is not integrated; browser speech remains the default
- Telephony and production voice ingestion are not wired
- Persistence is still partly fixture-backed even though schema and API shapes are in place

## Feature flags

Set in `.env.local`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gorkhayai"
ENABLE_LIVE_INGESTION="false"
LIVE_INGESTION_TTL_MINUTES="50"
NEXT_PUBLIC_USE_API_FEED="false"
NEXT_PUBLIC_DEMO_MODE="true"
NEXT_PUBLIC_FEED_REFRESH_MINUTES="50"
```

- `NEXT_PUBLIC_DEMO_MODE=true`: forces the polished seeded demo path and skips live ingestion entirely. Use this for the investor demo.
- `NEXT_PUBLIC_USE_API_FEED=true`: makes the UI fetch from API routes instead of reading seeded data directly in the client.
- `ENABLE_LIVE_INGESTION=true`: enables live source ingestion inside the API feed/search path. Keep this `false` for the safest demo.
- `LIVE_INGESTION_TTL_MINUTES=50`: caches live ingestion results for 50 minutes on the server.
- `NEXT_PUBLIC_FEED_REFRESH_MINUTES=50`: tells Home and Voice when to refresh live data in live rehearsal mode.

`NEXT_PUBLIC_*` flags are compiled into the client bundle. If you use `npm run build` plus `npm run start`, rebuild after changing them.

## Recommended modes

### Investor demo mode

Use:

```bash
NEXT_PUBLIC_DEMO_MODE="true"
NEXT_PUBLIC_USE_API_FEED="false"
ENABLE_LIVE_INGESTION="false"
```

This gives the most reliable experience locally and avoids live-source surprises.

### Live source rehearsal

Use:

```bash
NEXT_PUBLIC_DEMO_MODE="false"
NEXT_PUBLIC_USE_API_FEED="true"
ENABLE_LIVE_INGESTION="true"
LIVE_INGESTION_TTL_MINUTES="50"
NEXT_PUBLIC_FEED_REFRESH_MINUTES="50"
```

This exercises the API-backed live path and source health behavior. Home and Voice will refresh live data on a 50-minute rhythm.

## Run locally

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Start in demo mode

```bash
npm run dev
```

Open `http://localhost:3000`.

### Rehearse the production build

```bash
npm run build
npm run start
```

If you use `npm run start`, make sure the `NEXT_PUBLIC_*` flags were already set before the build step.

## Best 3-minute demo path

1. Open Home and show the spotlight story, search, chips, and supporting scheme/feed rails.
2. Open the Peshok story and show the Guardian Angel Note, confidence context, and listen-now action.
3. Show Search with a query like `पेशोक` or `tea`.
4. Open Voice Today and play a top story with browser speech.
5. Return to Home or Search and open a Govt Schemes card, then show the help CTA.

## Useful testing identities

- `reader@example.com` -> reader
- `contributor@example.com` -> contributor
- `writer@example.com` -> note_writer
- `guardian@example.com` -> guardian
- `admin@gorkhayai.com` -> admin

Phone numbers ending in `0000` map to guardian in the OTP mock flow.
Development OTP: `123456`.

## Validation commands

```bash
npm run test
npm run typecheck
npm run lint
npm run build
```

## Next API-powered phase

1. Replace mock auth with real OAuth and OTP providers.
2. Move saved stories, notes, help requests, and preferences onto persistent Postgres storage.
3. Add scheduled live ingestion plus source moderation tooling.
4. Add server-side Nepali TTS behind the existing audio abstraction.
5. Expand translation quality beyond Nepali and English.

## Docs for continuation

- [PLAN.md](./PLAN.md)
- [STATUS.md](./STATUS.md)
- [IMPLEMENTATION_NOTES.md](./IMPLEMENTATION_NOTES.md)
- [SOURCE_STRATEGY.md](./SOURCE_STRATEGY.md)

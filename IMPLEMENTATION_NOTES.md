# Implementation Notes

## Safe defaults used

- Nepali is the default UI, content, and audio language everywhere.
- Auth is adapter-shaped but locally mocked so the app runs without paid provider setup.
- Browser speech synthesis is the default no-API listen-now path.
- Live source ingestion is feature-flagged to keep local development deterministic unless explicitly enabled.

## Continuation plan from commit 528d15d

This continuation focused on converting the scaffold into a stronger no-API demo path:

1. Harden live ingestion behavior and source health handling.
2. Seed practical real public sources (official + RSS) and document source strategy.
3. Improve mobile-first visual polish and trust clarity in feed cards.
4. Tighten handoff docs for investor/demo readiness.

## Changes in this continuation

### Ingestion/runtime reliability
- Added in-memory ingestion cache (10 minute TTL) to avoid expensive repeated fetches per request.
- Added source-level degraded/failing handling and safer health output.
- Added lightweight dedupe for live stories by slug/location.

### Source registry quality
- Replaced placeholder sources with practical public feed/site seeds where possible.
- Kept architecture adapter-based (RSS + extractor) and avoided social scraping.

### UX quality and clarity
- Applied dark-first premium visual styling with calmer surfaces/chips/buttons.
- Added Home live-fetch loading/error states and graceful fallback messaging.
- Fixed broken Scheme card labels and improved clarity text.
- Improved Guardian Angel Note block with confidence/source/fast-track context.

## Remaining tradeoffs

- Live extraction quality depends on each source template and can degrade when HTML changes.
- Some external images may fail in restricted environments; cards still render textual content and source context.
- Several Nepali fixture strings remain low-quality placeholders from earlier phases and need a dedicated translation cleanup pass.
- Prisma schema is expanded, but persistence is still mixed with fixture-backed stores.

## Feature flags

- `ENABLE_LIVE_INGESTION=true`: enables live source ingestion in feed/search APIs.
- `NEXT_PUBLIC_USE_API_FEED=true`: makes Home/Search consume API-backed feed/search responses.

## Recommended next phase (with API access)

1. Add real auth (Auth.js/Clerk + OTP provider).
2. Add persistent Postgres-backed storage for saves/notes/help/preferences.
3. Add robust extraction pipeline + scheduler + source approval tooling.
4. Add server-side cached Nepali TTS provider behind the existing audio adapter.
5. Run focused multilingual translation quality pass (Nepali/Hindi/Bengali first).

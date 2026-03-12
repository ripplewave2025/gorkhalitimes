# Implementation Notes

## Safe defaults used

- Nepali remains the default UI, content, and audio language.
- Auth is adapter-shaped but locally mocked so the app runs without paid providers.
- Browser speech synthesis is the default no-API listen-now path.
- Live ingestion remains feature-flagged so local development stays deterministic unless explicitly enabled.
- Investor demo mode is a first-class path that bypasses live ingestion completely.

## Continuation plan from commit 528d15d

This continuation focused on closing the investor-demo blockers that remained after the ingestion polish run:

1. Repair the broken language layer and Nepali rendering completely.
2. Align typography and theme tokens so the dark-first UI renders consistently.
3. Add a reliable demo-safe mode that does not depend on live ingestion.
4. Tighten the Home, Story Detail, Voice, Govt Schemes, and Guardian Angel Note surfaces.

## What changed in this continuation

### Language and typography repair

- Replaced corrupted Nepali strings in the shared app copy, language registry, route-level strings, and seeded content.
- Repaired native language labels and safe fallback behavior for non-complete locales.
- Moved the app onto script-aware fonts using `next/font/google` with Devanagari and Bengali coverage.
- Removed Latin-style tracked uppercase treatment from visible Nepali labels so Devanagari reads naturally.
- Aligned Tailwind theme tokens with the dark-first CSS token set so the UI no longer renders as a broken light/dark hybrid.

### Demo-safe product path

- Added `NEXT_PUBLIC_DEMO_MODE` and wired it into feed/search API routes.
- Demo mode serves the polished seeded story, scheme, and alert set and skips live ingestion entirely.
- Live mode still exists behind `NEXT_PUBLIC_USE_API_FEED=true` and `ENABLE_LIVE_INGESTION=true`.
- Added a 50-minute live refresh rhythm for ingestion caching and client refresh behavior.

### Product polish

- Rebuilt the Home surface around a centered image-led spotlight story with calmer supporting rails.
- Restyled the mobile language selector and core form controls onto a shared dark control system.
- Hid the floating bottom nav on desktop so it no longer overlaps the hero.
- Strengthened Govt Schemes cards with document chips and clearer status framing.
- Localized note request, note writing, help, auth, onboarding, search, and voice flows.

## Visual verification

- Ran the app locally in a production-style server pass.
- Captured Playwright screenshots for Home desktop, Home mobile, and Voice mobile.
- Verified readable Nepali text, corrected Devanagari spacing, and the centered spotlight layout.

## Remaining tradeoffs

- Real auth, OTP, telephony, and server TTS still need credentials and production integration.
- Live extraction quality still depends on source HTML/RSS stability and should be treated as rehearsal mode, not the safest demo mode.
- The hero imagery still uses remote images; the UI degrades gracefully when they fail, but local packaged media would make a later demo build even more robust.
- `NEXT_PUBLIC_*` flags are build-time for `next build` plus `next start`.

## Recommended next phase with API access

1. Replace mock auth with real providers behind the existing adapter boundary.
2. Move saves, notes, help requests, and preferences to persistent Postgres-backed storage.
3. Add a scheduler and moderation tooling for live ingestion.
4. Add server-side Nepali TTS behind the current browser-fallback abstraction.
5. Run a proper multilingual translation pass for Hindi, Bengali, Tibetan, Dzongkha, and Sherpa.

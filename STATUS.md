# STATUS

_Last updated: 2026-03-13 14:10 IST_

## Snapshot

- The remaining investor-demo blocker was not just language corruption; it was also first-fold hierarchy and control styling.
- Nepali rendering is now clean in the verified production-style screenshots, including corrected Devanagari spacing on visible labels.
- Home now leads with a centered spotlight story, stronger scheme utility, and a 50-minute live refresh configuration for rehearsal mode.

## Timestamped progress

### 2026-03-13 10:40 - Follow-up investor QA

- Compared the current repo against the user screenshot and confirmed the screenshot was from an older/stale build.
- Re-audited Home, Voice, the language selector, and dark-mode control surfaces.
- Identified the remaining investor-grade issues: mobile select chrome, weak desktop hero composition, desktop bottom-nav overlap, and tracked Devanagari labels.

### 2026-03-13 11:20 - Home and controls polish

- Rebuilt Home around a centered spotlight card with side rails for feed rhythm and schemes.
- Removed the setup prompt from the Home first fold so the product leads with value, not onboarding.
- Restyled the language selector, search bar, auth, help, onboarding, more, and note forms onto shared dark controls.
- Hid the floating bottom nav on desktop so it no longer overlaps the hero.

### 2026-03-13 12:05 - Utility and refresh improvements

- Added documents-needed chips and clearer status framing to Govt Schemes cards.
- Added a 50-minute live refresh rhythm for ingestion caching and client-side refresh behavior.
- Added `LIVE_INGESTION_TTL_MINUTES` and `NEXT_PUBLIC_FEED_REFRESH_MINUTES` to `.env.example`.

### 2026-03-13 12:40 - Language presentation pass

- Repaired visible Nepali inline strings in auth, help, note request, and note writing flows.
- Removed Latin-style uppercase tracking from visible Nepali labels so Devanagari no longer appears artificially spaced.
- Rechecked shared copy, seeded schemes, and language selector labels after the spacing fix.

### 2026-03-13 13:20 - Visual verification

- Ran Playwright against a clean production-style server on port `3001`.
- Captured and reviewed Home desktop, Home mobile, and Voice mobile screenshots.
- Verified the centered story composition, dark controls, and readable Nepali text in the final check.

### 2026-03-13 14:05 - Final validation

- Passed `npm run test`
- Passed `npm run typecheck`
- Passed `npm run lint`
- Passed `npm run build`

### 2026-03-13 14:30 - Demo stability follow-up

- Removed the Home spotlight auto-rotation after visual review so the investor demo stays fully still unless the user taps navigation controls.
- Kept the 50-minute source refresh cadence intact for live rehearsal mode.
- Revalidated with `npm run typecheck`, `npm run lint`, and `npm run build`.

## Known blockers / deferred work

- Real OAuth, OTP, telephony, and server TTS remain deferred to the credentialed phase.
- Live ingestion is usable for rehearsal, but the safest investor demo is still the seeded demo mode.
- Hero media is still remote and could be made even more robust later by packaging local assets.
- `NEXT_PUBLIC_*` flags are build-time for `next build` plus `next start`, so production-style demos should rebuild after env changes.

## Morning handoff

### What works now

- Nepali-first Home, Search, Story Detail, Voice, Saved, Help, onboarding, auth, and settings flows
- Centered image-led Home spotlight with calmer desktop and mobile hierarchy
- Source-visible story cards with readable Guardian Angel Note context
- Govt Schemes cards with utility-focused CTAs and document chips
- Browser speech playback for stories and Voice Today
- Demo-safe mode that bypasses live ingestion and keeps the prototype stable

### What to demo first

1. Home spotlight story, search, chips, and the feed-rhythm + scheme rails
2. Peshok story detail with Guardian Angel Note and listen-now
3. Search with a Nepali or English query
4. Voice Today playback
5. Govt Schemes card and help request CTA

### Flags to enable

- `NEXT_PUBLIC_DEMO_MODE=true`
- `NEXT_PUBLIC_USE_API_FEED=false`
- `ENABLE_LIVE_INGESTION=false`

Optional for live rehearsal:

- `LIVE_INGESTION_TTL_MINUTES=50`
- `NEXT_PUBLIC_FEED_REFRESH_MINUTES=50`

### Blocked on future credentials or APIs

- Real Google auth and phone OTP
- Telephony / voice upload infrastructure
- Server-side TTS
- Production persistence rollout

### What to build next after this

- Real auth + persistence
- Scheduled live ingestion with moderation
- Server-side Nepali TTS
- Deeper multilingual translation quality pass

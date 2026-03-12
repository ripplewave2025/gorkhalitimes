# STATUS

_Last updated: 2026-03-12 23:40 IST_

## Snapshot

- The investor-demo blocker was real content corruption across the i18n layer, not just a font issue.
- Nepali rendering is now clean across the main product surfaces.
- The app has a dedicated demo-safe mode and a more coherent dark-first presentation.

## Timestamped progress

### 2026-03-12 22:10 - Investor audit completed

- Reviewed README, PLAN, STATUS, implementation notes, routes, styling, live ingestion, and language assets.
- Confirmed widespread corruption in shared copy, fixture content, language labels, and several route-level strings.

### 2026-03-12 22:45 - Language layer repaired

- Replaced corrupted Nepali text in shared copy, seeded stories, schemes, notes, and UI routes.
- Repaired native language labels and fallback behavior.
- Localized note labels, confidence labels, alert status labels, and audio status labels.

### 2026-03-12 23:00 - Typography and theme alignment

- Switched to script-aware `next/font` typography with Devanagari-safe rendering.
- Fixed Tailwind theme tokens that were still pointing at an older light palette.
- Revalidated Home, Story Detail, Voice, Search, Help, Auth, and Settings layouts after the theme fix.

### 2026-03-12 23:15 - Demo mode and UI polish

- Added `NEXT_PUBLIC_DEMO_MODE` so feed and search APIs can serve the stable seeded demo path.
- Polished the floating bottom nav, story cards, Guardian Angel Note block, and Govt Schemes cards.
- Tightened auth, help, onboarding, request-note, and write-note flows.

### 2026-03-12 23:30 - Visual verification

- Ran the app locally with `NEXT_PUBLIC_DEMO_MODE=true`.
- Captured Playwright mobile screenshots for Home, Search, Story Detail, Voice, and Settings.
- Verified readable Nepali content and a stable first-screen demo path.

### 2026-03-12 23:40 - Final validation

- Passed `npm run test`
- Passed `npm run typecheck`
- Passed `npm run lint`
- Passed `npm run build`

## Known blockers / deferred work

- Real OAuth, OTP, telephony, and server TTS remain deferred to the credentialed phase.
- Live ingestion is usable for rehearsal, but the safest investor demo is still the seeded demo mode.
- Hero media is still remote and could be made even more robust later by packaging local assets.

## Morning handoff

### What works now

- Nepali-first Home, Search, Story Detail, Voice, Saved, Help, onboarding, auth, and settings flows
- Source-visible story cards with readable Guardian Angel Note context
- Govt Schemes cards with utility-focused CTAs
- Browser speech playback for stories and Voice Today
- Demo-safe mode that bypasses live ingestion and keeps the prototype stable

### What to demo first

1. Home hero, alert strip, lane chips, and the first story card
2. Peshok story detail with Guardian Angel Note and listen-now
3. Search with a Nepali or English query
4. Voice Today playback
5. Govt Schemes card and help request CTA

### Flags to enable

- `NEXT_PUBLIC_DEMO_MODE=true`
- `NEXT_PUBLIC_USE_API_FEED=false`
- `ENABLE_LIVE_INGESTION=false`

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

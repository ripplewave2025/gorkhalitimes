# PLAN

_Last updated: 2026-03-13_

## Continuation plan from commit 528d15d

### Goals for this continuation
1. Make live no-API ingestion reliably usable when `ENABLE_LIVE_INGESTION=true`.
2. Improve source quality while keeping adapter architecture.
3. Polish the product UX toward a premium, calm, mobile-first feel with better loading and error clarity.
4. Strengthen Govt Schemes utility and Guardian Angel Note clarity in feed and detail surfaces.
5. Ship clear handoff docs for tomorrow’s demo and the next phase.

### Milestones

- [x] **M1 Audit + planning**
  - Re-check current implementation and feature flags.
  - Create `PLAN.md`, `STATUS.md`, and `SOURCE_STRATEGY.md`.
  - Add explicit continuation notes to `IMPLEMENTATION_NOTES.md`.

## Investor Demo Finish Plan

### P0 Language and typography repair
1. Replace corrupted Nepali strings in dictionaries, fixtures, and inline route copy.
2. Fix mojibake/native language labels in the language registry and add safe fallback behavior for incomplete locales.
3. Move the app onto robust Devanagari-friendly typography and script-aware font fallbacks.
4. Re-verify Home, Search, Story detail, Govt Schemes, Guardian Angel Note, Voice, onboarding, auth, and settings in Nepali-first mode.

### P1 Demo-safe product path
1. Add a reliable investor demo mode that always serves a polished story, scheme, and alert mix even if live ingestion degrades.
2. Keep the live path intact and make demo mode trivial to enable locally or on Vercel.
3. Ensure Home, Search, Story detail, Scheme help, Guardian Note, save, and listen-now flows remain coherent in demo mode.

### P2 Premium UI finish
1. Upgrade hero composition, spacing, card rhythm, chip behavior, and visual hierarchy on the main surfaces.
2. Tighten error, loading, and empty states so the product feels deliberate instead of scaffolded.
3. Improve Voice Today, Govt Schemes, and Guardian Angel Note presentation for a stronger investor first impression.
4. Lead the Home fold with the spotlight story instead of setup prompts.
5. Remove Latin-style tracked uppercase treatment from visible Nepali labels.

### P3 Validation and handoff
1. Run `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run build` after each major slice.
2. Capture local screenshots for the main demo screens and iterate on any weak layouts.
3. Update `README.md`, `STATUS.md`, and `IMPLEMENTATION_NOTES.md` with exact demo flags, run steps, refresh settings, and remaining API-era blockers.

- [x] **M2 Live ingestion hardening**
  - Seed source registry with practical real-world RSS and official links.
  - Add ingestion cache and graceful source-level failure handling.
  - Improve normalization and dedupe for mixed fixture plus live stories.

- [x] **M3 UX cohesion polish**
  - Improve dark-first visual polish, chips, cards, and transitions.
  - Fix broken label rendering and tighten story and scheme action clarity.
  - Improve empty, loading, and error microstates.

- [x] **M4 Schemes + Guardian clarity pass**
  - Ensure scheme cards are utility-first with audience, benefit, eligibility, and help cues.
  - Make Guardian Angel Note state and trust context easier to understand.

- [x] **M5 Validation + handoff**
  - Run `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run build`.
  - Capture screenshots of the polished Home and Voice experience.
  - Finalize `README.md`, `IMPLEMENTATION_NOTES.md`, and `STATUS.md` morning handoff guidance.

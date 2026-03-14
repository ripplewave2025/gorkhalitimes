# PLAN

_Last updated: 2026-03-12_

## Continuation plan from commit 528d15d

### Goals for this continuation
1. Make live no-API ingestion reliably usable when `ENABLE_LIVE_INGESTION=true`.
2. Improve source quality (real source registry + fallback strategies) while keeping adapter architecture.
3. Polish the product UX toward a premium, calm, mobile-first feel with better loading/error clarity.
4. Strengthen Govt Schemes utility and Guardian Angel Note clarity in feed/detail surfaces.
5. Ship clear handoff docs for tomorrow demo and next phase.

### Milestones

- [x] **M1 Audit + planning**
  - Re-check current implementation and feature flags.
  - Create `PLAN.md`, `STATUS.md`, `SOURCE_STRATEGY.md`.
  - Add explicit continuation notes to `IMPLEMENTATION_NOTES.md`.

- [ ] **M2 Live ingestion hardening**
  - Seed source registry with practical real-world RSS/official links.
  - Add ingestion cache and graceful source-level failure handling.
  - Improve normalization and dedupe for mixed fixture + live stories.

- [ ] **M3 UX cohesion polish**
  - Improve dark-first visual polish, chips, cards, and transitions.
  - Fix broken label rendering and tighten story/scheme action clarity.
  - Improve empty/loading/error microstates.

- [ ] **M4 Schemes + Guardian clarity pass**
  - Ensure scheme cards are utility-first (for whom, benefits, eligibility, help CTA).
  - Make Guardian Angel Note state and trust context easier to understand.

- [ ] **M5 Validation + handoff**
  - Run `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`.
  - Capture screenshot of polished home experience.
  - Finalize `README.md`, `IMPLEMENTATION_NOTES.md`, `STATUS.md` Morning handoff section.

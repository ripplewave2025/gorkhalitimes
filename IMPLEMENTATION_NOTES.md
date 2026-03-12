# Implementation Notes

## Safe defaults used

- Nepali is the default UI, content, and audio language everywhere.
- Extra languages are scaffolded in settings and onboarding, but only Nepali and English have broad copy coverage today. Hindi and Bengali are partially ready through fallback. Tibetan, Lepcha, Dzongkha, and Sherpa are marked experimental and currently fall back to available content.
- Auth is adapter-shaped but locally mocked so Phase 2 remains runnable without Clerk, Firebase, Twilio, or Google OAuth setup.
- Browser speech synthesis is the default listen-now path until server-side TTS is connected.
- Live source ingestion is feature-flagged to keep local development deterministic and build-safe.

## Tradeoffs made in this phase

- Story save state is protected and session-backed through API routes, but scheme save state is still local UI state.
- Guardian Angel Note lifecycle is conservative and server-checked, but new published notes are not yet fully persisted to a database.
- Live ingestion uses a lightweight RSS parser and HTML metadata extractor instead of a heavier extraction stack. This keeps cost and setup low, but extraction quality will vary by source.
- Some admin pages are thin operational views instead of full moderation dashboards.
- The Prisma schema is expanded for Phase 2, but Prisma client generation and migrations are not wired yet because the runtime still uses fixture-backed services.

## Feature flags

- `ENABLE_LIVE_INGESTION=true` enables live source ingestion in the feed/search APIs.
- `NEXT_PUBLIC_USE_API_FEED=true` makes Home, Search, and Voice Today consume the API-backed feed/search instead of local-only helpers.

## Recommended next steps

1. Replace mock auth with Clerk or Auth.js plus a real OTP provider.
2. Persist notes, help requests, saves, and preferences in PostgreSQL through Prisma.
3. Add source approval tooling and a real ingest scheduler around the adapter layer.
4. Replace browser speech fallback with cached server-generated Nepali audio for top stories.
5. Expand multilingual copy coverage beyond Nepali and English.
6. Add proper file/audio upload storage for voice-help submissions.


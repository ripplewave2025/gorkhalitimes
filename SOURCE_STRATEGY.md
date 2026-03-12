# SOURCE_STRATEGY

## Strategy principles (no paid APIs)
1. Prefer official and stable public sources first.
2. Prefer RSS feeds over brittle scraping.
3. Use lightweight extraction for official notice boards where RSS is unavailable.
4. Keep social scraping out of core ingestion path.
5. Always retain source visibility and trust tier in normalized stories.

## Registry, ingestion method, trust, and fallback

| Source | Type | Ingestion method | Trust tier | Fragility/Risk | Fallback plan |
|---|---|---|---|---|---|
| Darjeeling District Administration | Official govt | Extractor (notices page metadata + title) | A | Moderate HTML template drift | Keep fixture stories + source health failure badge |
| GTA Information Cell | Official govt | Extractor | A | Moderate HTML drift | Same as above |
| Kalimpong DM Office | Official govt | Extractor | A | Moderate HTML drift | Same as above |
| IMD weather | Official weather | Extractor | A | Low/moderate | Fall back to latest fixture weather alert stories |
| MyScheme India | Official schemes portal | Extractor | A | Moderate dynamic rendering risk | Keep local curated schemes and help CTA flow |
| PIB RSS | Govt newswire | RSS | A | Low | Continue with fixture stories if feed unavailable |
| DD News RSS | Public broadcaster | RSS | B | Low/moderate | Continue with fixture stories |
| The Hindu national RSS | Newspaper | RSS | B | Low/moderate | Continue with fixture stories |
| Tea Board announcements | Sector official site | Extractor | B | Moderate | Keep tea/economy fixture lane stories |

## Initial Darjeeling-focused coverage map
- District/admin notices: Darjeeling + Kalimpong + GTA portals.
- Local intelligence context: official weather + broader trusted Indian newswire feeds.
- Govt schemes: MyScheme + curated local scheme fixtures for explainability.
- Road/public alerts: official notices + curated alert fixtures.

## Operational notes
- Live ingestion is only active when `ENABLE_LIVE_INGESTION=true`.
- UI consumption of API-backed feed/search is only active when `NEXT_PUBLIC_USE_API_FEED=true`.
- Source health should be checked in `/admin/sources` using an admin mock session.

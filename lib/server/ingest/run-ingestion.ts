import { sources } from '@/data/fixtures/sources';
import { storyClusters } from '@/data/fixtures/stories';
import { IngestionResult, SourceAdapter } from '@/lib/server/ingest/adapters';
import { articleExtractionAdapter } from '@/lib/server/ingest/extractor-adapter';
import { rssAdapter } from '@/lib/server/ingest/rss-adapter';
import { FeedLane, Source, SourceHealth, StoryCluster } from '@/types';

const adapters: SourceAdapter[] = [rssAdapter, articleExtractionAdapter];
const supportedLanes: FeedLane[] = ['alerts', 'tea', 'roads', 'govt-schemes', 'jobs', 'schools', 'weather', 'economy'];

function getIngestionTtlMinutes() {
    const parsed = Number(process.env.LIVE_INGESTION_TTL_MINUTES ?? process.env.NEXT_PUBLIC_FEED_REFRESH_MINUTES ?? '50');
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 50;
}

const INGESTION_TTL_MS = 1000 * 60 * getIngestionTtlMinutes();

let cache: { timestamp: number; payload: { stories: StoryCluster[]; health: SourceHealth[] } } | null = null;

function inferCategory(source: Source): StoryCluster['category'] {
    if (source.tags?.includes('govt-schemes')) {
        return 'govt-schemes';
    }
    if (source.tags?.includes('weather')) {
        return 'public-safety';
    }
    if (source.tags?.includes('schools')) {
        return 'education';
    }
    if (source.tags?.includes('tea') || source.tags?.includes('economy')) {
        return 'economy';
    }
    if (source.tags?.includes('roads') || source.tags?.includes('alerts')) {
        return 'public-safety';
    }
    return 'community';
}

function toSlug(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'story';
}

function buildLiveStory(result: IngestionResult, source: Source): StoryCluster[] {
    return result.items.map((item, index) => {
        const slug = toSlug(item.title);
        return {
            id: `live-${source.id}-${slug}-${index}`,
            slug,
            headline: { en: item.title, ne: item.title },
            summaryShort: { en: item.summary, ne: item.summary },
            summaryFull: { en: item.summary, ne: item.summary },
            primaryLocation: item.locationTags[0] ?? source.locationScope,
            category: inferCategory(source),
            lanes: ['for-you', 'top-stories', ...((source.tags ?? []).filter((tag): tag is FeedLane => supportedLanes.includes(tag as FeedLane)))],
            heroImageUrl: item.imageUrl ?? storyClusters[0].heroImageUrl,
            sourceIds: [source.id],
            trustBadge: source.isOfficial ? 'official' : 'single-source',
            status: 'active',
            publishedAt: item.publishedAt,
            updatedAt: new Date().toISOString(),
            audioLanguages: ['ne', 'en'],
            audioStatus: 'queued',
            scores: {
                freshness: 0.85,
                localRelevance: source.locationScope.toLowerCase().includes('darjeeling') ? 0.8 : 0.65,
                trust: source.isOfficial ? 0.95 : 0.7,
                urgency: source.tags?.includes('alerts') ? 0.8 : 0.3,
                sourceDiversity: 0.2,
                editorialBoost: source.isOfficial ? 0.15 : 0.05,
            },
            savedCount: 0,
            timeline: [],
        };
    });
}

function dedupeStories(stories: StoryCluster[]): StoryCluster[] {
    const seen = new Set<string>();
    return stories.filter((story) => {
        const key = `${story.slug}:${story.primaryLocation.toLowerCase()}`;
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

export async function ingestLiveStories(): Promise<{ stories: StoryCluster[]; health: SourceHealth[] }> {
    if (cache && Date.now() - cache.timestamp < INGESTION_TTL_MS) {
        return cache.payload;
    }

    const activeSources = sources.filter((source) => source.status !== 'paused' && source.ingestMethod && !source.featureFlag);
    const health: SourceHealth[] = [];
    const stories: StoryCluster[] = [];

    for (const source of activeSources) {
        const adapter = adapters.find((candidate) => candidate.canHandle(source));
        if (!adapter) {
            health.push({
                sourceId: source.id,
                status: 'unknown',
                checkedAt: new Date().toISOString(),
                errorMessage: 'No adapter registered for source',
            });
            continue;
        }

        try {
            const result = await adapter.ingest(source);
            const sourceStories = buildLiveStory(result, source);
            stories.push(...sourceStories);

            health.push({
                ...result.health,
                status: sourceStories.length > 0 ? 'healthy' : 'degraded',
                errorMessage: sourceStories.length > 0 ? undefined : 'Source responded with no usable items',
            });
        } catch (error) {
            health.push({
                sourceId: source.id,
                status: 'failing',
                checkedAt: new Date().toISOString(),
                errorMessage: error instanceof Error ? error.message : 'Unknown ingestion error',
            });
        }
    }

    const payload = { stories: dedupeStories(stories), health };
    cache = { timestamp: Date.now(), payload };
    return payload;
}

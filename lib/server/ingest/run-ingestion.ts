import { sources } from '@/data/fixtures/sources';
import { storyClusters } from '@/data/fixtures/stories';
import { IngestionResult, SourceAdapter } from '@/lib/server/ingest/adapters';
import { articleExtractionAdapter } from '@/lib/server/ingest/extractor-adapter';
import { rssAdapter } from '@/lib/server/ingest/rss-adapter';
import { FeedLane, Source, SourceHealth, StoryCluster } from '@/types';

const adapters: SourceAdapter[] = [rssAdapter, articleExtractionAdapter];
const supportedLanes: FeedLane[] = ['alerts', 'tea', 'roads', 'govt-schemes', 'jobs', 'schools', 'weather', 'economy'];

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

function buildLiveStory(result: IngestionResult, source: Source): StoryCluster[] {
    return result.items.map((item, index) => ({
        id: `live-${source.id}-${index}`,
        slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
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
    }));
}

export async function ingestLiveStories(): Promise<{ stories: StoryCluster[]; health: SourceHealth[] }> {
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
            health.push(result.health);
            stories.push(...buildLiveStory(result, source));
        } catch (error) {
            health.push({
                sourceId: source.id,
                status: 'failing',
                checkedAt: new Date().toISOString(),
                errorMessage: error instanceof Error ? error.message : 'Unknown ingestion error',
            });
        }
    }

    return { stories, health };
}


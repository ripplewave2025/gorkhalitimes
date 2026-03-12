import { NextRequest, NextResponse } from 'next/server';
import { storyClusters } from '@/data/fixtures/stories';
import { getFeed } from '@/lib/server/feed/get-feed';
import { ingestLiveStories } from '@/lib/server/ingest/run-ingestion';
import { getSavedStoryIds } from '@/lib/server/saves/store';
import { getSessionFromRequest, requireMinimumRole } from '@/lib/server/mock-session';
import { FeedLane, StoryCategory, UserPreferences } from '@/types';

function parseList(value: string | null): string[] {
    if (!value) {
        return [];
    }

    return value.split(',').map((item) => item.trim()).filter(Boolean);
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const category = (searchParams.get('category') as StoryCategory | 'all' | null) ?? 'all';
    const location = searchParams.get('location') ?? undefined;
    const includeAlerts = searchParams.get('include_alerts') !== 'false';
    const lane = (searchParams.get('lane') as FeedLane | null) ?? 'for-you';
    const savedOnly = searchParams.get('saved_only') === 'true';

    const preferences: Partial<UserPreferences> = {
        preferredPlaces: parseList(searchParams.get('preferred_places')),
        preferredTopics: parseList(searchParams.get('preferred_topics')) as FeedLane[],
        preferredSources: parseList(searchParams.get('preferred_sources')),
        mutedSourceIds: parseList(searchParams.get('muted_sources')),
        govtSchemesAlerts: searchParams.get('govt_schemes_alerts') !== 'false',
    };

    let catalog = [...storyClusters];
    if (process.env.ENABLE_LIVE_INGESTION === 'true') {
        const live = await ingestLiveStories();
        catalog = [...live.stories, ...catalog];
    }

    if (savedOnly) {
        const session = requireMinimumRole(request, 'reader');
        const savedStoryIds = getSavedStoryIds(session.id);
        catalog = catalog.filter((story) => savedStoryIds.includes(story.id));
    }

    const response = getFeed({ category, location, includeAlerts, lane, preferences, stories: catalog });
    const session = getSessionFromRequest(request);

    return NextResponse.json({
        ...response,
        sessionRole: session?.role ?? 'guest',
    });
}


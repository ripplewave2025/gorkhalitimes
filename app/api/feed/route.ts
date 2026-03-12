import { NextRequest, NextResponse } from 'next/server';
import { getFeed } from '@/lib/server/feed/get-feed';
import { FeedLane, StoryCategory, UserPreferences } from '@/types';

function parseList(value: string | null): string[] {
    if (!value) {
        return [];
    }

    return value.split(',').map((item) => item.trim()).filter(Boolean);
}

export function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const category = (searchParams.get('category') as StoryCategory | 'all' | null) ?? 'all';
    const location = searchParams.get('location') ?? undefined;
    const includeAlerts = searchParams.get('include_alerts') !== 'false';
    const lane = (searchParams.get('lane') as FeedLane | null) ?? 'for-you';

    const preferences: Partial<UserPreferences> = {
        preferredPlaces: parseList(searchParams.get('preferred_places')),
        preferredTopics: parseList(searchParams.get('preferred_topics')) as FeedLane[],
        preferredSources: parseList(searchParams.get('preferred_sources')),
        mutedSourceIds: parseList(searchParams.get('muted_sources')),
        govtSchemesAlerts: searchParams.get('govt_schemes_alerts') !== 'false',
    };

    return NextResponse.json(getFeed({ category, location, includeAlerts, lane, preferences }));
}

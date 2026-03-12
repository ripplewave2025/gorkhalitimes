import { NextRequest, NextResponse } from 'next/server';
import { storyClusters } from '@/data/fixtures/stories';
import { ingestLiveStories } from '@/lib/server/ingest/run-ingestion';
import { searchStories } from '@/lib/server/search/search-stories';
import { FeedLane } from '@/types';

function parseList(value: string | null): string[] {
    if (!value) {
        return [];
    }

    return value.split(',').map((item) => item.trim()).filter(Boolean);
}

export async function GET(request: NextRequest) {
    const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
    const query = request.nextUrl.searchParams.get('q') ?? '';
    const lane = (request.nextUrl.searchParams.get('lane') as FeedLane | null) ?? 'for-you';
    const liveStories = !demoMode && process.env.ENABLE_LIVE_INGESTION === 'true'
        ? (await ingestLiveStories()).stories
        : [];

    return NextResponse.json(searchStories(query, {
        lane,
        stories: [...liveStories, ...storyClusters],
        preferences: {
            preferredPlaces: parseList(request.nextUrl.searchParams.get('preferred_places')),
        },
    }));
}


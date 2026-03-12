import { NextRequest, NextResponse } from 'next/server';
import { searchStories } from '@/lib/server/search/search-stories';
import { FeedLane } from '@/types';

function parseList(value: string | null): string[] {
    if (!value) {
        return [];
    }

    return value.split(',').map((item) => item.trim()).filter(Boolean);
}

export function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('q') ?? '';
    const lane = (request.nextUrl.searchParams.get('lane') as FeedLane | null) ?? 'for-you';
    return NextResponse.json(searchStories(query, {
        lane,
        preferences: {
            preferredPlaces: parseList(request.nextUrl.searchParams.get('preferred_places')),
        },
    }));
}

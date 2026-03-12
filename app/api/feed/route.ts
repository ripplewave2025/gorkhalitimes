import { NextRequest, NextResponse } from 'next/server';
import { getFeed } from '@/lib/server/feed/get-feed';
import { StoryCategory } from '@/types';

export function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const category = (searchParams.get('category') as StoryCategory | 'all' | null) ?? 'all';
    const location = searchParams.get('location') ?? undefined;
    const includeAlerts = searchParams.get('include_alerts') !== 'false';

    return NextResponse.json(getFeed({ category, location, includeAlerts }));
}

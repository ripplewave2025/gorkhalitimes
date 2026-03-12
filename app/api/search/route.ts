import { NextRequest, NextResponse } from 'next/server';
import { searchStories } from '@/lib/server/search/search-stories';

export function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('q') ?? '';
    return NextResponse.json(searchStories(query));
}

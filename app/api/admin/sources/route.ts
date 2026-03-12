import { NextResponse } from 'next/server';
import { sources } from '@/data/fixtures/sources';
import { requireMinimumRole } from '@/lib/server/mock-session';
import { ingestLiveStories } from '@/lib/server/ingest/run-ingestion';

export async function GET(request: Request) {
    try {
        requireMinimumRole(request, 'admin');
        const live = process.env.ENABLE_LIVE_INGESTION === 'true'
            ? await ingestLiveStories()
            : { health: [] };
        return NextResponse.json({ sources, health: live.health, liveIngestionEnabled: process.env.ENABLE_LIVE_INGESTION === 'true' });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'UNKNOWN';
        const status = message === 'AUTH_REQUIRED' ? 401 : 403;
        return NextResponse.json({ message }, { status });
    }
}


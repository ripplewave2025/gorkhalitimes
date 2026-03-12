import { NextResponse } from 'next/server';
import { requireMinimumRole } from '@/lib/server/mock-session';
import { getSavedStoryIds, saveStory, unsaveStory } from '@/lib/server/saves/store';

export function POST(request: Request, context: { params: { id: string } }) {
    try {
        const session = requireMinimumRole(request, 'reader');
        const savedIds = saveStory(session.id, context.params.id);
        return NextResponse.json({ storyId: context.params.id, saved: true, savedIds });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'UNKNOWN';
        const status = message === 'AUTH_REQUIRED' ? 401 : 403;
        return NextResponse.json({ message }, { status });
    }
}

export function DELETE(request: Request, context: { params: { id: string } }) {
    try {
        const session = requireMinimumRole(request, 'reader');
        const savedIds = unsaveStory(session.id, context.params.id);
        return NextResponse.json({ storyId: context.params.id, saved: false, savedIds });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'UNKNOWN';
        const status = message === 'AUTH_REQUIRED' ? 401 : 403;
        return NextResponse.json({ message }, { status });
    }
}


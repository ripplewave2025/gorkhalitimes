import { NextResponse } from 'next/server';
import { listHelpRequests } from '@/lib/server/help/store';
import { requireMinimumRole } from '@/lib/server/mock-session';

export function GET(request: Request) {
    try {
        requireMinimumRole(request, 'guardian');
        return NextResponse.json({ requests: listHelpRequests() });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'UNKNOWN';
        const status = message === 'AUTH_REQUIRED' ? 401 : 403;
        return NextResponse.json({ message }, { status });
    }
}


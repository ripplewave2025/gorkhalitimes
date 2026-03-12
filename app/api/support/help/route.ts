import { NextResponse } from 'next/server';
import { z } from 'zod';
import { submitHelpRequest } from '@/lib/server/help/store';
import { requireMinimumRole } from '@/lib/server/mock-session';

const helpSchema = z.object({
    kind: z.enum(['story', 'scheme']),
    storyId: z.string().optional(),
    schemeId: z.string().optional(),
    questionText: z.string().min(10).max(500),
    callbackNumber: z.string().optional(),
    audioFileName: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const session = requireMinimumRole(request, 'reader');
        const body = helpSchema.parse(await request.json());
        const helpRequest = submitHelpRequest(session.id, body);
        return NextResponse.json({ status: 'pending', helpRequest });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: 'Invalid request', issues: error.issues }, { status: 400 });
        }

        const message = error instanceof Error ? error.message : 'UNKNOWN';
        const status = message === 'AUTH_REQUIRED' ? 401 : 403;
        return NextResponse.json({ message }, { status });
    }
}


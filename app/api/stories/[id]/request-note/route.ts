import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createGuardianAngelNoteRequest } from '@/lib/server/notes/store';
import { requireMinimumRole } from '@/lib/server/mock-session';

const requestSchema = z.object({
    reason: z.enum(['wrong-location', 'wrong-date-time', 'old-media', 'missing-context', 'needs-official-confirmation', 'resolved-update', 'translation-issue', 'cultural-context']),
    details: z.string().max(400).optional(),
    evidenceUrl: z.string().url().optional().or(z.literal('')),
});

export async function POST(request: Request, context: { params: { id: string } }) {
    try {
        const session = requireMinimumRole(request, 'reader');
        const body = requestSchema.parse(await request.json());
        const record = createGuardianAngelNoteRequest(context.params.id, session.id, {
            reason: body.reason,
            details: body.details,
            evidenceUrl: body.evidenceUrl || undefined,
        });

        return NextResponse.json({
            storyId: context.params.id,
            status: 'queued',
            request: record,
            message: 'Guardian Angel Note request captured.',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: 'Invalid request', issues: error.issues }, { status: 400 });
        }

        const message = error instanceof Error ? error.message : 'UNKNOWN';
        const status = message === 'AUTH_REQUIRED' ? 401 : 403;
        return NextResponse.json({ message }, { status });
    }
}


import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createGuardianAngelDraft } from '@/lib/server/notes/store';
import { requireMinimumRole } from '@/lib/server/mock-session';

const draftSchema = z.object({
    noteType: z.enum(['wrong-location', 'wrong-date-time', 'old-media', 'missing-context', 'needs-official-confirmation', 'resolved-update', 'translation-issue', 'cultural-context']),
    confidence: z.enum(['high', 'medium', 'developing']),
    text: z.string().min(10).max(400),
    language: z.enum(['en', 'ne']).default('ne'),
    sourceLinks: z.array(z.string().url()).min(1),
    fastTrack: z.boolean().optional(),
});

export async function POST(request: Request, context: { params: { id: string } }) {
    try {
        const session = requireMinimumRole(request, 'note_writer');
        const body = draftSchema.parse(await request.json());
        const draft = createGuardianAngelDraft(context.params.id, session.id, session.role, body);

        return NextResponse.json({
            storyId: context.params.id,
            status: draft.status,
            draft,
            message: 'Guardian Angel Note draft stored.',
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


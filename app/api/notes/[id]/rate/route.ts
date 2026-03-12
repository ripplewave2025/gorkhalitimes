import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rateGuardianAngelNote } from '@/lib/server/notes/store';
import { requireMinimumRole } from '@/lib/server/mock-session';

const ratingSchema = z.object({
    ratingValue: z.enum(['helpful', 'not-helpful', 'correct-but-unclear', 'needs-better-source', 'too-opinionated', 'outdated']),
});

export async function POST(request: Request, context: { params: { id: string } }) {
    try {
        const session = requireMinimumRole(request, 'contributor');
        const body = ratingSchema.parse(await request.json());
        const note = rateGuardianAngelNote(context.params.id, session.id, body.ratingValue, session.role);

        if (!note) {
            return NextResponse.json({ message: 'Note not found' }, { status: 404 });
        }

        return NextResponse.json({
            noteId: context.params.id,
            rating: body.ratingValue,
            status: note.status,
            note,
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


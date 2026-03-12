import { NextResponse } from 'next/server';
import { getCurrentGuardianAngelNote } from '@/lib/server/notes/store';

export function GET(_: Request, context: { params: { id: string } }) {
    const note = getCurrentGuardianAngelNote(context.params.id);
    return NextResponse.json({ storyId: context.params.id, guardianNote: note });
}


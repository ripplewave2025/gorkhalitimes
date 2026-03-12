import { NextResponse } from 'next/server';
import { getGuardianAngelNoteById } from '@/lib/server/notes/store';

export function GET(_: Request, context: { params: { id: string } }) {
    const note = getGuardianAngelNoteById(context.params.id);

    if (!note) {
        return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(note);
}


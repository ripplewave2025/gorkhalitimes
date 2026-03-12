import { NextResponse } from 'next/server';
import { guardianNotes } from '@/data/fixtures/notes';

export function GET(_: Request, context: { params: { id: string } }) {
    const note = guardianNotes.find((item) => item.id === context.params.id);

    if (!note) {
        return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json(note);
}
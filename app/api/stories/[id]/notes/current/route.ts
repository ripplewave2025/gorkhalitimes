import { NextResponse } from 'next/server';
import { guardianNotes } from '@/data/fixtures/notes';
import { storyClusters } from '@/data/fixtures/stories';

export function GET(_: Request, context: { params: { id: string } }) {
    const story = storyClusters.find((item) => item.id === context.params.id);
    const note = story?.guardianNoteId ? guardianNotes.find((item) => item.id === story.guardianNoteId) ?? null : null;

    return NextResponse.json({ storyId: context.params.id, guardianNote: note });
}
import { NextResponse } from 'next/server';

export function POST(_: Request, context: { params: { id: string } }) {
    return NextResponse.json({ storyId: context.params.id, saved: true, storage: 'mock-session' });
}

export function DELETE(_: Request, context: { params: { id: string } }) {
    return NextResponse.json({ storyId: context.params.id, saved: false, storage: 'mock-session' });
}
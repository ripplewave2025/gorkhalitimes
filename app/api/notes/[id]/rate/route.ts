import { NextResponse } from 'next/server';

export async function POST(request: Request, context: { params: { id: string } }) {
    const body = await request.json();

    return NextResponse.json({
        noteId: context.params.id,
        rating: body.ratingValue ?? null,
        status: 'accepted',
    });
}
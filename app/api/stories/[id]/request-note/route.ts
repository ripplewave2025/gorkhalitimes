import { NextResponse } from 'next/server';

export async function POST(request: Request, context: { params: { id: string } }) {
    const body = await request.json();

    return NextResponse.json({
        storyId: context.params.id,
        status: 'queued',
        request: body,
        message: 'Guardian Note request captured in mock mode.',
    });
}
import { NextResponse } from 'next/server';

export async function POST(request: Request, context: { params: { id: string } }) {
    const body = await request.json();

    return NextResponse.json({
        storyId: context.params.id,
        status: 'draft',
        draft: body,
        message: 'Guardian Note draft stored in mock mode.',
    });
}
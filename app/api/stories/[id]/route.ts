import { NextResponse } from 'next/server';
import { getStoryById } from '@/lib/server/stories/get-story';

export function GET(_: Request, context: { params: { id: string } }) {
    const result = getStoryById(context.params.id);

    if (!result) {
        return NextResponse.json({ message: 'Story not found' }, { status: 404 });
    }

    return NextResponse.json(result);
}
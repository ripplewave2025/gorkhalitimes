'use client';

import { AppSession } from '@/types';

export function buildSessionHeaders(session: AppSession | null): HeadersInit {
    if (!session) {
        return {};
    }

    return {
        'x-gorkhayai-session': JSON.stringify(session),
    };
}


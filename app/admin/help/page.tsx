'use client';

import { useEffect, useState } from 'react';
import { buildSessionHeaders } from '@/lib/client/api';
import { useAuth } from '@/lib/AuthContext';

export default function AdminHelpPage() {
    const { session } = useAuth();
    const [payload, setPayload] = useState<{ requests: Array<{ id: string; kind: string; questionText: string; status: string }> } | null>(null);

    useEffect(() => {
        fetch('/api/admin/help', { headers: buildSessionHeaders(session) })
            .then((response) => response.json())
            .then((data) => setPayload(data));
    }, [session]);

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-4">
                <h1 className="text-3xl font-semibold text-brand-ink">Voice help queue</h1>
                {payload?.requests?.map((request) => (
                    <article key={request.id} className="surface-card rounded-[2rem] p-5">
                        <p className="text-xs uppercase tracking-[0.16em] text-brand-muted">{request.kind} • {request.status}</p>
                        <p className="mt-2 text-sm leading-6 text-brand-ink">{request.questionText}</p>
                    </article>
                ))}
            </div>
        </div>
    );
}


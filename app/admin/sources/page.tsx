'use client';

import { useEffect, useState } from 'react';
import { buildSessionHeaders } from '@/lib/client/api';
import { useAuth } from '@/lib/AuthContext';

export default function AdminSourcesPage() {
    const { session } = useAuth();
    const [payload, setPayload] = useState<{ sources?: Array<{ id: string; name: string; ingestMethod?: string }>; health?: Array<{ sourceId: string; status: string; errorMessage?: string }>; liveIngestionEnabled?: boolean } | null>(null);

    useEffect(() => {
        fetch('/api/admin/sources', { headers: buildSessionHeaders(session) })
            .then((response) => response.json())
            .then((data) => setPayload(data));
    }, [session]);

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-4">
                <h1 className="text-3xl font-semibold text-brand-ink">Source health</h1>
                <p className="text-sm text-brand-muted">Live ingestion enabled: {String(payload?.liveIngestionEnabled ?? false)}</p>
                {payload?.sources?.map((source) => (
                    <article key={source.id} className="surface-card rounded-[2rem] p-5">
                        <p className="text-sm font-medium text-brand-ink">{source.name}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.16em] text-brand-muted">{source.ingestMethod}</p>
                        <p className="mt-2 text-sm text-brand-muted">{payload.health?.find((item) => item.sourceId === source.id)?.status ?? 'unknown'}</p>
                    </article>
                ))}
            </div>
        </div>
    );
}


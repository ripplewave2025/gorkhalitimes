'use client';

import { useEffect, useState } from 'react';
import { buildSessionHeaders } from '@/lib/client/api';
import { useAuth } from '@/lib/AuthContext';

export default function AdminNotesPage() {
    const { session } = useAuth();
    const [payload, setPayload] = useState<{ notes?: Array<{ id: string; status: string; clusterId: string }>; requests?: Array<{ id: string; clusterId: string; reason: string }> } | null>(null);

    useEffect(() => {
        fetch('/api/admin/notes', { headers: buildSessionHeaders(session) })
            .then((response) => response.json())
            .then((data) => setPayload(data));
    }, [session]);

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-4">
                <h1 className="text-3xl font-semibold text-brand-ink">Guardian Angel Notes</h1>
                {payload?.notes?.map((note) => (
                    <article key={note.id} className="surface-card rounded-[2rem] p-5">
                        <p className="text-xs uppercase tracking-[0.16em] text-brand-muted">{note.clusterId}</p>
                        <p className="mt-2 text-sm leading-6 text-brand-ink">{note.id} • {note.status}</p>
                    </article>
                ))}
                {payload?.requests?.map((request) => (
                    <article key={request.id} className="surface-card rounded-[2rem] p-5">
                        <p className="text-xs uppercase tracking-[0.16em] text-brand-muted">request</p>
                        <p className="mt-2 text-sm leading-6 text-brand-ink">{request.clusterId} • {request.reason}</p>
                    </article>
                ))}
            </div>
        </div>
    );
}


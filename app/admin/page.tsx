'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

export default function AdminPage() {
    const { session } = useAuth();

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <header className="surface-card rounded-[2rem] p-6">
                    <h1 className="text-3xl font-semibold text-brand-ink">Admin</h1>
                    <p className="mt-3 text-sm leading-6 text-brand-muted">Current session: {session ? `${session.name} (${session.role})` : 'none'}</p>
                </header>
                <section className="grid gap-4 md:grid-cols-3">
                    <Link href="/admin/sources" className="surface-card rounded-[2rem] p-5 text-brand-ink">Source health</Link>
                    <Link href="/admin/notes" className="surface-card rounded-[2rem] p-5 text-brand-ink">Guardian Angel Notes</Link>
                    <Link href="/admin/help" className="surface-card rounded-[2rem] p-5 text-brand-ink">Voice help queue</Link>
                </section>
            </div>
        </div>
    );
}


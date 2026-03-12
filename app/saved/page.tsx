'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { buildSessionHeaders } from '@/lib/client/api';
import { appCopy } from '@/lib/client/copy';
import { useAuth } from '@/lib/AuthContext';
import { getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';
import { StoryCluster } from '@/types';

export default function SavedPage() {
    const { language, contentLanguage, fallbackLanguage } = useLanguage();
    const { session } = useAuth();
    const [savedStories, setSavedStories] = useState<StoryCluster[]>([]);

    useEffect(() => {
        if (!session || session.isGuest) {
            setSavedStories([]);
            return;
        }

        fetch('/api/feed?saved_only=true', {
            headers: buildSessionHeaders(session),
        })
            .then((response) => response.json())
            .then((data) => setSavedStories(data.stories ?? []));
    }, [session]);

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <header className="surface-card rounded-[2rem] p-5">
                    <h1 className="text-2xl font-semibold text-brand-ink">{getLocalizedText(appCopy.saved.title, language)}</h1>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.saved.subtitle, language)}</p>
                </header>

                {!session || session.isGuest ? <Link href="/auth" className="inline-flex text-sm font-medium text-brand-green">{getLocalizedText(appCopy.actions.signIn, language)}</Link> : null}

                <section className="space-y-4">
                    {savedStories.length > 0 ? savedStories.map((story) => (
                        <Link key={story.id} href={`/stories/${story.id}`} className="surface-card block rounded-[2rem] p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">{story.primaryLocation}</p>
                            <h2 className="mt-2 text-xl font-semibold text-brand-ink">{getLocalizedText(story.headline, contentLanguage, fallbackLanguage)}</h2>
                            <p className="mt-3 text-sm leading-6 text-brand-muted">{getLocalizedText(story.summaryShort, contentLanguage, fallbackLanguage)}</p>
                        </Link>
                    )) : <p className="text-sm text-brand-muted">{getLocalizedText(appCopy.saved.empty, language)}</p>}
                </section>
            </div>
        </div>
    );
}


'use client';

import Link from 'next/link';
import { storyClusters } from '@/data/fixtures/stories';
import { appCopy } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';

const demoSavedStoryIds = ['story-peshok-road', 'story-school-notice'];

export default function SavedPage() {
    const { language } = useLanguage();
    const savedStories = storyClusters.filter((story) => demoSavedStoryIds.includes(story.id));

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <header className="surface-card rounded-[2rem] p-5">
                    <h1 className="text-2xl font-semibold text-brand-ink">{getLocalizedText(appCopy.saved.title, language)}</h1>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.saved.subtitle, language)}</p>
                </header>

                <section className="space-y-4">
                    {savedStories.map((story) => (
                        <Link key={story.id} href={`/stories/${story.id}`} className="surface-card block rounded-[2rem] p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">{story.primaryLocation}</p>
                            <h2 className="mt-2 text-xl font-semibold text-brand-ink">{getLocalizedText(story.headline, language)}</h2>
                            <p className="mt-3 text-sm leading-6 text-brand-muted">{getLocalizedText(story.summaryShort, language)}</p>
                        </Link>
                    ))}
                </section>
            </div>
        </div>
    );
}

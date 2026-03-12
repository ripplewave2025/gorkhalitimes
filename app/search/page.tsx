'use client';

import Link from 'next/link';
import { useState } from 'react';
import { storyClusters } from '@/data/fixtures/stories';
import { categoryLabels, appCopy } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';
import { StoryCategory } from '@/types';

const categories: Array<'all' | StoryCategory> = ['all', 'public-safety', 'civic', 'education', 'economy', 'community'];

export default function SearchPage() {
    const { language } = useLanguage();
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<'all' | StoryCategory>('all');
    const [locationFilter, setLocationFilter] = useState('');

    const results = storyClusters.filter((story) => {
        if (category !== 'all' && story.category !== category) {
            return false;
        }

        if (locationFilter && !story.primaryLocation.toLowerCase().includes(locationFilter.toLowerCase())) {
            return false;
        }

        if (!query) {
            return true;
        }

        const haystack = [story.headline.en, story.headline.ne, story.summaryShort.en, story.summaryShort.ne, story.primaryLocation]
            .join(' ')
            .toLowerCase();

        return haystack.includes(query.toLowerCase());
    });

    const sourceCount = new Set(results.flatMap((story) => story.sourceIds)).size;

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <header className="surface-card rounded-[2rem] p-5">
                    <h1 className="text-2xl font-semibold text-brand-ink">{getLocalizedText(appCopy.search.title, language)}</h1>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.brand.tagline, language)}</p>
                </header>

                <section className="surface-card rounded-[2rem] p-5">
                    <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr]">
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder={getLocalizedText(appCopy.search.placeholder, language)}
                            className="rounded-2xl border border-brand-line bg-white px-4 py-3 text-brand-ink outline-none"
                        />
                        <select value={category} onChange={(event) => setCategory(event.target.value as 'all' | StoryCategory)} className="rounded-2xl border border-brand-line bg-white px-4 py-3 text-brand-ink outline-none">
                            <option value="all">{language === 'ne' ? 'सबै श्रेणी' : 'All categories'}</option>
                            {categories.filter((item) => item !== 'all').map((item) => (
                                <option key={item} value={item}>{getLocalizedText(categoryLabels[item], language)}</option>
                            ))}
                        </select>
                        <input
                            value={locationFilter}
                            onChange={(event) => setLocationFilter(event.target.value)}
                            placeholder={language === 'ne' ? 'स्थान' : 'Location'}
                            className="rounded-2xl border border-brand-line bg-white px-4 py-3 text-brand-ink outline-none"
                        />
                    </div>
                </section>

                {query ? (
                    <section className="surface-card rounded-[2rem] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">{getLocalizedText(appCopy.search.answerSummary, language)}</p>
                        <p className="mt-2 text-sm leading-6 text-brand-ink">
                            {results.length > 0
                                ? `${results.length} story clusters match. ${sourceCount} distinct sources remain visible in the result set.`
                                : getLocalizedText(appCopy.search.noResults, language)}
                        </p>
                    </section>
                ) : null}

                <section className="space-y-4">
                    {results.map((story) => (
                        <Link key={story.id} href={`/stories/${story.id}`} className="surface-card block rounded-[2rem] p-5">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">{story.primaryLocation}</p>
                                    <h2 className="mt-2 text-xl font-semibold text-brand-ink">{getLocalizedText(story.headline, language)}</h2>
                                    <p className="mt-3 text-sm leading-6 text-brand-muted">{getLocalizedText(story.summaryShort, language)}</p>
                                </div>
                                <span className="chip">{story.sourceIds.length} sources</span>
                            </div>
                        </Link>
                    ))}
                </section>
            </div>
        </div>
    );
}

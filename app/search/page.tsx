'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LaneChips from '@/components/LaneChips';
import SearchBar from '@/components/SearchBar';
import { categoryLabels, appCopy } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';
import { searchStories } from '@/lib/server/search/search-stories';
import { FeedLane } from '@/types';

const lanes: FeedLane[] = ['for-you', 'top-stories', 'alerts', 'tea', 'roads', 'govt-schemes', 'jobs', 'schools', 'weather', 'economy'];

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { language, contentLanguage, fallbackLanguage, preferences, addRecentSearch } = useLanguage();
    const [query, setQuery] = useState(searchParams.get('q') ?? '');
    const [activeLane, setActiveLane] = useState<FeedLane>('for-you');

    useEffect(() => {
        setQuery(searchParams.get('q') ?? '');
    }, [searchParams]);

    const results = searchStories(query, { lane: activeLane, preferences });

    const handleSearch = () => {
        addRecentSearch(query);
        router.push(`/search${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
    };

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-4">
                <header className="surface-card rounded-[2rem] p-5">
                    <h1 className="text-2xl font-semibold text-brand-ink">{getLocalizedText(appCopy.search.title, language)}</h1>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.brand.tagline, language)}</p>
                </header>

                <SearchBar
                    value={query}
                    onChange={setQuery}
                    onSubmit={handleSearch}
                    placeholder={getLocalizedText(appCopy.search.placeholder, language)}
                    sticky
                />

                <LaneChips activeLane={activeLane} onChange={setActiveLane} lanes={lanes} />

                {query ? (
                    <section className="surface-card rounded-[2rem] p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">{getLocalizedText(appCopy.search.answerSummary, language)}</p>
                        <p className="mt-2 text-sm leading-6 text-brand-ink">
                            {results.answerSummary
                                ? getLocalizedText(results.answerSummary, language)
                                : getLocalizedText(appCopy.search.noResults, language)}
                        </p>
                    </section>
                ) : (
                    <section className="grid gap-4 md:grid-cols-2">
                        <article className="surface-card rounded-[2rem] p-5">
                            <h2 className="text-lg font-semibold text-brand-ink">{getLocalizedText(appCopy.search.recent, language)}</h2>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {preferences.recentSearches.length > 0 ? preferences.recentSearches.map((item) => (
                                    <button key={item} type="button" onClick={() => {
                                        setQuery(item);
                                        addRecentSearch(item);
                                        router.push(`/search?q=${encodeURIComponent(item)}`);
                                    }} className="chip">
                                        {item}
                                    </button>
                                )) : <p className="text-sm text-brand-muted">{language === 'ne' ? '????????? ??? ?????? ????' : 'No search history yet.'}</p>}
                            </div>
                        </article>
                        <article className="surface-card rounded-[2rem] p-5">
                            <h2 className="text-lg font-semibold text-brand-ink">{getLocalizedText(appCopy.search.suggestions, language)}</h2>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {results.suggestedQueries.map((item) => (
                                    <button key={item} type="button" onClick={() => {
                                        setQuery(item);
                                        addRecentSearch(item);
                                        router.push(`/search?q=${encodeURIComponent(item)}`);
                                    }} className="chip">
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </article>
                    </section>
                )}

                <section className="space-y-4">
                    {results.stories.map((story) => (
                        <Link key={story.id} href={`/stories/${story.id}`} className="surface-card block rounded-[2rem] p-5">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">{story.primaryLocation}</p>
                                    <h2 className="mt-2 text-xl font-semibold text-brand-ink">{getLocalizedText(story.headline, contentLanguage, fallbackLanguage)}</h2>
                                    <p className="mt-3 text-sm leading-6 text-brand-muted">{getLocalizedText(story.summaryShort, contentLanguage, fallbackLanguage)}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="chip">{story.sourceIds.length} {getLocalizedText(appCopy.story.sourceVisible, language)}</span>
                                    <span className="chip">{getLocalizedText(categoryLabels[story.category], language)}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </div>
        </div>
    );
}

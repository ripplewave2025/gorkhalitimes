'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';
import AlertsBanner from '@/components/AlertsBanner';
import LaneChips from '@/components/LaneChips';
import LanguageToggle from '@/components/LanguageToggle';
import SchemeCard from '@/components/SchemeCard';
import SearchBar from '@/components/SearchBar';
import StoryCard from '@/components/StoryCard';
import { appCopy } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';
import { getFeed } from '@/lib/server/feed/get-feed';
import { FeedLane, FeedResponse } from '@/types';

const lanes: FeedLane[] = ['for-you', 'top-stories', 'alerts', 'tea', 'roads', 'govt-schemes', 'jobs', 'schools', 'weather', 'economy'];
const useApiFeed = process.env.NEXT_PUBLIC_USE_API_FEED === 'true';

export default function HomePage() {
    const router = useRouter();
    const { language, preferences, addRecentSearch } = useLanguage();
    const [activeLane, setActiveLane] = useState<FeedLane>('for-you');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [query, setQuery] = useState('');
    const [remoteFeed, setRemoteFeed] = useState<FeedResponse | null>(null);

    useEffect(() => {
        if (!useApiFeed) {
            return;
        }

        const params = new URLSearchParams({ lane: activeLane });
        if (preferences.preferredPlaces.length > 0) {
            params.set('preferred_places', preferences.preferredPlaces.join(','));
        }
        if (preferences.preferredTopics.length > 0) {
            params.set('preferred_topics', preferences.preferredTopics.join(','));
        }
        if (preferences.mutedSourceIds.length > 0) {
            params.set('muted_sources', preferences.mutedSourceIds.join(','));
        }
        if (preferences.preferredSources.length > 0) {
            params.set('preferred_sources', preferences.preferredSources.join(','));
        }
        params.set('govt_schemes_alerts', String(preferences.govtSchemesAlerts));

        fetch(`/api/feed?${params.toString()}`)
            .then((response) => response.json())
            .then((data) => setRemoteFeed(data));
    }, [activeLane, preferences]);

    const fallbackFeed = getFeed({ lane: activeLane, preferences });
    const feedData = useApiFeed && remoteFeed ? remoteFeed : fallbackFeed;
    const filteredStories = feedData.stories;
    const schemes = feedData.schemes;

    useEffect(() => {
        if (currentIndex >= filteredStories.length) {
            setCurrentIndex(0);
        }
    }, [currentIndex, filteredStories.length]);

    const story = filteredStories[currentIndex] ?? filteredStories[0];

    const handleSearch = () => {
        addRecentSearch(query);
        router.push(`/search${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
    };

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-4">
                <header className="flex flex-col gap-4 rounded-[2rem] bg-white p-5 shadow-sm md:flex-row md:items-start md:justify-between">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                            <MapPin size={14} />
                            gorkhayai.com
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">{getLocalizedText(appCopy.feed.eyebrow, language)}</p>
                            <h1 className="mt-2 text-3xl font-semibold text-brand-ink">{getLocalizedText(appCopy.brand.appName, language)}</h1>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.brand.tagline, language)}</p>
                        </div>
                    </div>
                    <LanguageToggle />
                </header>

                {!preferences.onboardingComplete ? (
                    <Link href="/onboarding" className="surface-card block rounded-[1.6rem] p-4 text-sm leading-6 text-brand-ink">
                        {language === 'ne'
                            ? '????????? ?????? ????? ?????, ???? ? ????? ?????????? ??? ???? ????????? ???? ??????????'
                            : 'Finish onboarding to keep Nepali-first defaults while tuning places, topics, and audio.'}
                    </Link>
                ) : null}

                <SearchBar
                    value={query}
                    onChange={setQuery}
                    onSubmit={handleSearch}
                    placeholder={getLocalizedText(appCopy.search.placeholder, language)}
                    sticky
                />

                <LaneChips activeLane={activeLane} onChange={(lane) => {
                    setActiveLane(lane);
                    setCurrentIndex(0);
                }} lanes={lanes} />

                {preferences.recentSearches.length > 0 ? (
                    <section className="flex flex-wrap gap-2">
                        {preferences.recentSearches.slice(0, 4).map((item) => (
                            <button key={item} type="button" onClick={() => {
                                setQuery(item);
                                addRecentSearch(item);
                                router.push(`/search?q=${encodeURIComponent(item)}`);
                            }} className="chip">
                                {item}
                            </button>
                        ))}
                    </section>
                ) : null}

                <AlertsBanner />

                <section className="surface-card rounded-[1.6rem] p-4 text-sm leading-6 text-brand-muted">
                    {getLocalizedText(appCopy.feed.personalized, language)}
                </section>

                {schemes.length > 0 ? (
                    <section className="space-y-4">
                        {schemes.slice(0, activeLane === 'govt-schemes' ? schemes.length : 1).map((scheme) => (
                            <SchemeCard key={scheme.id} scheme={scheme} />
                        ))}
                    </section>
                ) : null}

                {story ? <StoryCard story={story} onNext={() => setCurrentIndex((index) => Math.min(index + 1, filteredStories.length - 1))} onPrevious={() => setCurrentIndex((index) => Math.max(index - 1, 0))} /> : null}

                <section className="surface-card rounded-[2rem] p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <p className="text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.feed.helper, language)}</p>
                        <span className="text-sm font-medium text-brand-muted">{filteredStories.length === 0 ? 0 : currentIndex + 1}/{filteredStories.length}</span>
                    </div>
                    <div className="flex gap-2">
                        {filteredStories.map((item, index) => (
                            <div key={item.id} className={index === currentIndex ? 'h-2 flex-1 rounded-full bg-brand-green' : 'h-2 flex-1 rounded-full bg-brand-line'} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}


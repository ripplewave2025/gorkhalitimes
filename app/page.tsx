'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Loader2, MapPin, RadioTower, Sparkles } from 'lucide-react';
import AlertsBanner from '@/components/AlertsBanner';
import LaneChips from '@/components/LaneChips';
import LanguageToggle from '@/components/LanguageToggle';
import SchemeCard from '@/components/SchemeCard';
import SearchBar from '@/components/SearchBar';
import StoryCard from '@/components/StoryCard';
import { appCopy } from '@/lib/client/copy';
import { formatRelativeTime, getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';
import { getFeed } from '@/lib/server/feed/get-feed';
import { FeedLane, FeedResponse } from '@/types';

const lanes: FeedLane[] = ['for-you', 'top-stories', 'alerts', 'tea', 'roads', 'govt-schemes', 'jobs', 'schools', 'weather', 'economy'];
const useApiFeed = process.env.NEXT_PUBLIC_USE_API_FEED === 'true';
const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
const STORY_ROTATION_MS = 12000;

function getRefreshIntervalMinutes() {
    const parsed = Number(process.env.NEXT_PUBLIC_FEED_REFRESH_MINUTES ?? '50');
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 50;
}

export default function HomePage() {
    const router = useRouter();
    const { language, preferences, addRecentSearch, contentLanguage, fallbackLanguage } = useLanguage();
    const [activeLane, setActiveLane] = useState<FeedLane>('for-you');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [query, setQuery] = useState('');
    const [remoteFeed, setRemoteFeed] = useState<FeedResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [lastFetchedAt, setLastFetchedAt] = useState<string | null>(null);

    const refreshIntervalMinutes = getRefreshIntervalMinutes();

    useEffect(() => {
        if (!useApiFeed) {
            return;
        }

        let active = true;
        let timeoutId: number | null = null;
        let inFlight: AbortController | null = null;
        let isFetching = false;

        const loadFeed = async (backgroundRefresh: boolean) => {
            if (!active || isFetching) {
                return;
            }

            isFetching = true;
            inFlight?.abort();
            const controller = new AbortController();
            inFlight = controller;

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

            if (!backgroundRefresh) {
                setIsLoading(true);
            }
            setFetchError(null);

            try {
                const response = await fetch(`/api/feed?${params.toString()}`, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error(`Feed request failed: ${response.status}`);
                }
                const data = await response.json() as FeedResponse;
                if (!active) {
                    return;
                }
                setRemoteFeed(data);
                setLastFetchedAt(new Date().toISOString());
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    setFetchError(error.message ?? 'Feed fetch failed');
                }
            } finally {
                isFetching = false;
                if (!backgroundRefresh) {
                    setIsLoading(false);
                }
                if (active && !demoMode) {
                    timeoutId = window.setTimeout(() => {
                        void loadFeed(true);
                    }, refreshIntervalMinutes * 60 * 1000);
                }
            }
        };

        void loadFeed(false);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && !demoMode) {
                if (timeoutId) {
                    window.clearTimeout(timeoutId);
                }
                void loadFeed(true);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            active = false;
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
            inFlight?.abort();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [activeLane, preferences, refreshIntervalMinutes]);

    const fallbackFeed = getFeed({ lane: activeLane, preferences });
    const feedData = useApiFeed && remoteFeed ? remoteFeed : fallbackFeed;
    const filteredStories = feedData.stories;
    const schemes = feedData.schemes;
    const spotlightStory = filteredStories[currentIndex] ?? filteredStories[0];
    const secondaryStories = filteredStories
        .map((story, index) => ({ story, index }))
        .filter(({ index }) => index !== currentIndex)
        .slice(0, 3);

    useEffect(() => {
        if (currentIndex >= filteredStories.length) {
            setCurrentIndex(0);
        }
    }, [currentIndex, filteredStories.length]);

    useEffect(() => {
        if (filteredStories.length <= 1) {
            return;
        }

        const timer = window.setInterval(() => {
            setCurrentIndex((index) => (index + 1) % filteredStories.length);
        }, STORY_ROTATION_MS);

        return () => window.clearInterval(timer);
    }, [filteredStories.length]);

    const handleSearch = () => {
        addRecentSearch(query);
        router.push(`/search${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
    };

    const feedModeTitle = demoMode
        ? (language === 'ne' ? 'क्युरेट गरिएको डेमो डेक' : 'Curated demo deck')
        : useApiFeed
            ? (language === 'ne' ? `स्रोत हरेक ${refreshIntervalMinutes} मिनेटमा ताजा हुन्छन्` : `Sources refresh every ${refreshIntervalMinutes} minutes`)
            : (language === 'ne' ? 'स्थिर स्थानीय रिहर्सल फिड' : 'Stable local rehearsal feed');

    const feedModeBody = demoMode
        ? (language === 'ne'
            ? 'भोलिको डेमोका लागि यही मोड सबैभन्दा सुरक्षित छ। कथा, अलर्ट र योजना सुन्दर रूपमा स्थिर रहन्छन्।'
            : 'This is the safest path for tomorrow. Stories, alerts, and schemes stay polished and stable.')
        : useApiFeed
            ? (language === 'ne'
                ? 'लाइभ स्रोत असफल भए पनि fallback तयार छ। ट्याब फेरि खोल्दा वा ५० मिनेटपछि फिड आफैं ताजा हुन्छ।'
                : 'If live sources wobble, fallback stays ready. The feed refreshes when you return to the tab and every 50 minutes.')
            : (language === 'ne'
                ? 'स्थानीय seeded कथाले rehearsal र UI polishing का लागि स्थिर अनुभव दिन्छ।'
                : 'Seeded local stories keep rehearsal and UI review deterministic.');

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-5">
                <header className="surface-card relative overflow-hidden rounded-[2.4rem] border border-brand-line/80 p-6 md:p-7">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(78,203,133,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(47,108,216,0.12),transparent_30%)]" />
                    <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="inline-flex items-center gap-2 rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                                    <MapPin size={14} />
                                    Darjeeling hills intelligence
                                </div>
                                {demoMode ? (
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
                                        Investor demo mode
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                <p className={language === 'ne' ? 'text-xs font-semibold text-brand-muted' : 'text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted'}>
                                    {getLocalizedText(appCopy.feed.eyebrow, language)}
                                </p>
                                <h1 className="mt-2 text-3xl font-semibold text-brand-ink md:text-5xl">{getLocalizedText(appCopy.brand.appName, language)}</h1>
                                <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted md:text-base">{getLocalizedText(appCopy.brand.tagline, language)}</p>
                            </div>
                        </div>
                        <LanguageToggle />
                    </div>
                </header>

                <div className="space-y-4">
                    <SearchBar
                        value={query}
                        onChange={setQuery}
                        onSubmit={handleSearch}
                        placeholder={getLocalizedText(appCopy.search.placeholder, language)}
                        submitLabel={getLocalizedText(appCopy.actions.go, language)}
                        sticky
                    />

                    <section className="surface-card rounded-[1.8rem] border border-brand-line/80 p-3 md:p-4">
                        <LaneChips
                            activeLane={activeLane}
                            onChange={(lane) => {
                                setActiveLane(lane);
                                setCurrentIndex(0);
                            }}
                            lanes={lanes}
                        />

                        {preferences.recentSearches.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {preferences.recentSearches.slice(0, 4).map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => {
                                            setQuery(item);
                                            addRecentSearch(item);
                                            router.push(`/search?q=${encodeURIComponent(item)}`);
                                        }}
                                        className="chip"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        ) : null}
                    </section>
                </div>

                <section className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)_300px] lg:items-start">
                    <aside className="order-2 space-y-4 lg:order-1">
                        <article className="surface-card rounded-[1.9rem] border border-brand-line/80 p-5">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
                                {demoMode ? <Sparkles size={14} /> : <RadioTower size={14} />}
                                {demoMode ? 'Investor mode' : 'Feed rhythm'}
                            </div>
                            <h2 className="mt-3 text-xl font-semibold text-brand-ink">{feedModeTitle}</h2>
                            <p className="mt-3 text-sm leading-6 text-brand-muted">{feedModeBody}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="chip bg-brand-bg/80 text-brand-ink">{filteredStories.length} {language === 'ne' ? 'कथा' : 'stories'}</span>
                                <span className="chip bg-brand-bg/80 text-brand-ink">{schemes.length} {language === 'ne' ? 'योजना' : 'schemes'}</span>
                            </div>
                            <p className="mt-4 text-xs leading-5 text-brand-muted">
                                {lastFetchedAt
                                    ? (language === 'ne'
                                        ? `पछिल्लो ताजा: ${formatRelativeTime(lastFetchedAt, language)}`
                                        : `Last refreshed ${formatRelativeTime(lastFetchedAt, language)}`)
                                    : getLocalizedText(appCopy.feed.personalized, language)}
                            </p>
                        </article>

                        {isLoading && useApiFeed ? (
                            <section className="surface-card rounded-[1.8rem] border border-brand-line/80 p-4 text-sm text-brand-muted">
                                <span className="inline-flex items-center gap-2">
                                    <Loader2 size={16} className="animate-spin" />
                                    {language === 'ne' ? 'लाइभ कथाहरू ताजा गर्दै...' : 'Refreshing live stories...'}
                                </span>
                            </section>
                        ) : null}

                        {fetchError ? (
                            <section className="surface-card rounded-[1.8rem] border border-red-300/30 p-4 text-sm text-red-200">
                                <span className="inline-flex items-center gap-2">
                                    <AlertTriangle size={16} />
                                    {language === 'ne'
                                        ? `लाइभ फिड असफल भयो, सुरक्षित fallback चलिरहेको छ: ${fetchError}`
                                        : `Live feed fallback active: ${fetchError}`}
                                </span>
                            </section>
                        ) : null}

                        <AlertsBanner />
                    </aside>

                    <div className="order-1 space-y-4 lg:order-2">
                        {spotlightStory ? (
                            <StoryCard
                                story={spotlightStory}
                                onNext={() => setCurrentIndex((index) => (index + 1) % filteredStories.length)}
                                onPrevious={() => setCurrentIndex((index) => (index - 1 + filteredStories.length) % filteredStories.length)}
                            />
                        ) : null}

                        <section className="surface-card rounded-[1.9rem] border border-brand-line/80 p-5">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <p className="text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.feed.helper, language)}</p>
                                <span className="text-sm font-medium text-brand-muted">
                                    {filteredStories.length === 0 ? 0 : currentIndex + 1}/{filteredStories.length}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                {filteredStories.map((item, index) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setCurrentIndex(index)}
                                        className={index === currentIndex ? 'h-2 flex-1 rounded-full bg-brand-green' : 'h-2 flex-1 rounded-full bg-brand-line'}
                                        aria-label={`Go to story ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="order-3 space-y-4">
                        {schemes.length > 0 ? <SchemeCard scheme={schemes[0]} /> : null}

                        {secondaryStories.length > 0 ? (
                            <article className="surface-card rounded-[1.9rem] border border-brand-line/80 p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">
                                            {language === 'ne' ? 'अर्को हेर्नुहोस्' : 'Watch next'}
                                        </p>
                                        <h2 className="mt-2 text-lg font-semibold text-brand-ink">
                                            {language === 'ne' ? 'कथा डेक स्वतः घुम्छ' : 'The story deck rotates automatically'}
                                        </h2>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-3">
                                    {secondaryStories.map(({ story, index }) => (
                                        <button
                                            key={story.id}
                                            type="button"
                                            onClick={() => setCurrentIndex(index)}
                                            className="panel-quiet block w-full overflow-hidden rounded-[1.5rem] text-left transition hover:-translate-y-0.5"
                                        >
                                            <div className="relative h-28 w-full overflow-hidden">
                                                <Image
                                                    src={story.heroImageUrl}
                                                    alt={getLocalizedText(story.headline, contentLanguage, fallbackLanguage)}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                                                <div className="absolute bottom-3 left-3 right-3">
                                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">{story.primaryLocation}</p>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="text-sm font-semibold leading-6 text-brand-ink">
                                                    {getLocalizedText(story.headline, contentLanguage, fallbackLanguage)}
                                                </h3>
                                                <p className="mt-2 text-xs leading-5 text-brand-muted">
                                                    {formatRelativeTime(story.updatedAt, language)}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </article>
                        ) : null}
                    </aside>
                </section>

                {activeLane === 'govt-schemes' && schemes.length > 1 ? (
                    <section className="grid gap-4 lg:grid-cols-2">
                        {schemes.slice(1).map((scheme) => (
                            <SchemeCard key={scheme.id} scheme={scheme} />
                        ))}
                    </section>
                ) : null}
            </div>
        </div>
    );
}

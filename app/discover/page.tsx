'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { getFeed } from '@/lib/server/feed/get-feed';
import { FeedResponse } from '@/types';
import { Loader2, AlertTriangle } from 'lucide-react';
import SwipeDeck from '@/components/SwipeDeck';

const useApiFeed = process.env.NEXT_PUBLIC_USE_API_FEED === 'true';

export default function DiscoverPage() {
    const { preferences, language } = useLanguage();
    const [remoteFeed, setRemoteFeed] = useState<FeedResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        if (!useApiFeed) {
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();

        const loadFeed = async () => {
            setIsLoading(true);
            setFetchError(null);
            
            try {
                const params = new URLSearchParams({ lane: 'for-you' });
                const response = await fetch(`/api/feed?${params.toString()}`, { signal: controller.signal });
                
                if (!response.ok) {
                    throw new Error(`Feed request failed: ${response.status}`);
                }
                
                const data = await response.json() as FeedResponse;
                if (data && !controller.signal.aborted) {
                    setRemoteFeed(data);
                }
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError' && !controller.signal.aborted) {
                    setFetchError(error.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        void loadFeed();

        return () => controller.abort();
    }, []);

    const fallbackFeed = getFeed({ lane: 'for-you', preferences });
    const feedData = useApiFeed && remoteFeed ? remoteFeed : fallbackFeed;
    const stories = feedData.stories;

    if (isLoading && !remoteFeed && useApiFeed) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-brand-muted">
                <Loader2 size={32} className="animate-spin mb-4 text-brand-green" />
                <p>{language === 'ne' ? 'कथाहरू लोड हुँदैछन्...' : 'Loading stories...'}</p>
            </div>
        );
    }

    if (stories.length === 0) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-black text-brand-muted p-6 text-center">
                <AlertTriangle size={36} className="mb-4 text-brand-green" />
                <h1 className="text-xl font-bold text-white mb-2">No Stories Ready</h1>
                <p>Check your feed preferences or try again later.</p>
                {fetchError && <p className="mt-4 text-sm text-red-400">{fetchError}</p>}
            </div>
        );
    }

    return (
        <main className="h-[100dvh] w-full bg-black fixed inset-0 overflow-hidden">
            <SwipeDeck stories={stories} />
        </main>
    );
}

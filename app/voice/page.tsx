'use client';

import { useEffect, useState } from 'react';
import { PauseCircle, PlayCircle, Volume2 } from 'lucide-react';
import { appCopy } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { storyAudioService } from '@/lib/client/audio';
import { useLanguage } from '@/lib/LanguageContext';
import { getFeed } from '@/lib/server/feed/get-feed';
import { FeedResponse } from '@/types';

const useApiFeed = process.env.NEXT_PUBLIC_USE_API_FEED === 'true';

export default function VoicePage() {
    const { language, audioLanguage, preferences, updatePreferences } = useLanguage();
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [remoteFeed, setRemoteFeed] = useState<FeedResponse | null>(null);

    useEffect(() => {
        if (!useApiFeed) {
            return;
        }

        const params = new URLSearchParams({ lane: 'top-stories' });
        if (preferences.preferredPlaces.length > 0) {
            params.set('preferred_places', preferences.preferredPlaces.join(','));
        }
        fetch(`/api/feed?${params.toString()}`)
            .then((response) => response.json())
            .then((data) => setRemoteFeed(data));
    }, [preferences.preferredPlaces]);

    const playlist = (useApiFeed && remoteFeed ? remoteFeed : getFeed({ lane: 'top-stories', preferences })).stories.slice(0, 5);

    const handleToggle = (storyId: string) => {
        const story = playlist.find((item) => item.id === storyId);
        if (!story) {
            return;
        }

        if (playingId === storyId) {
            storyAudioService.stop();
            setPlayingId(null);
            return;
        }

        const didStart = storyAudioService.speakNow({
            story,
            language: audioLanguage,
            rate: preferences.audioSpeed,
            onEnd: () => setPlayingId(null),
        });

        setPlayingId(didStart ? storyId : null);
    };

    const handlePlayAll = () => {
        const first = playlist[0];
        if (!first) {
            return;
        }

        handleToggle(first.id);
    };

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <header className="surface-card rounded-[2rem] p-5">
                    <h1 className="text-2xl font-semibold text-brand-ink">{getLocalizedText(appCopy.voice.title, language)}</h1>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.voice.subtitle, language)}</p>
                </header>

                <section className="surface-card rounded-[2rem] p-5">
                    <div className="flex flex-wrap items-center gap-3">
                        <button type="button" onClick={handlePlayAll} className="btn-primary">{getLocalizedText(appCopy.actions.playAll, language)}</button>
                        <button type="button" className="btn-secondary">{getLocalizedText(appCopy.actions.downloadPack, language)}</button>
                        <label className="flex items-center gap-3 rounded-full border border-brand-line bg-white px-4 py-3 text-sm text-brand-ink">
                            <Volume2 size={16} />
                            <input type="range" min="0.8" max="1.25" step="0.05" value={preferences.audioSpeed} onChange={(event) => updatePreferences({ audioSpeed: Number(event.target.value) })} />
                            <span>{preferences.audioSpeed.toFixed(2)}x</span>
                        </label>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.voice.packNote, language)}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-brand-muted">{getLocalizedText(appCopy.voice.fallback, language)}</p>
                </section>

                <section className="space-y-4">
                    {playlist.map((story, index) => {
                        const isPlaying = playingId === story.id;

                        return (
                            <button key={story.id} type="button" onClick={() => handleToggle(story.id)} className="surface-card flex w-full items-start justify-between rounded-[2rem] p-5 text-left">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">{language === 'ne' ? `??????? ${index + 1}` : `Track ${index + 1}`}</p>
                                    <h2 className="mt-2 text-lg font-semibold text-brand-ink">{getLocalizedText(story.headline, audioLanguage)}</h2>
                                    <p className="mt-2 text-sm leading-6 text-brand-muted">{story.primaryLocation} • {story.audioStatus ?? 'browser-fallback'}</p>
                                </div>
                                {isPlaying ? <PauseCircle size={30} className="text-brand-green" /> : <PlayCircle size={30} className="text-brand-green" />}
                            </button>
                        );
                    })}
                </section>
            </div>
        </div>
    );
}


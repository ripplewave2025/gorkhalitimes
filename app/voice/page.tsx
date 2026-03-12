'use client';

import { useState } from 'react';
import { PauseCircle, PlayCircle } from 'lucide-react';
import { storyClusters } from '@/data/fixtures/stories';
import { appCopy } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';
import { scoreStory } from '@/lib/server/feed/score';

export default function VoicePage() {
    const { language } = useLanguage();
    const [playingId, setPlayingId] = useState<string | null>(storyClusters[0]?.id ?? null);
    const [speed, setSpeed] = useState('1.0x');
    const playlist = [...storyClusters].sort((a, b) => scoreStory(b.scores) - scoreStory(a.scores)).slice(0, 5);

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <header className="surface-card rounded-[2rem] p-5">
                    <h1 className="text-2xl font-semibold text-brand-ink">{getLocalizedText(appCopy.voice.title, language)}</h1>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.voice.subtitle, language)}</p>
                </header>

                <section className="surface-card rounded-[2rem] p-5">
                    <div className="flex flex-wrap items-center gap-3">
                        <button type="button" className="btn-primary">{getLocalizedText(appCopy.actions.playAll, language)}</button>
                        <button type="button" className="btn-secondary">{getLocalizedText(appCopy.actions.downloadPack, language)}</button>
                        <select value={speed} onChange={(event) => setSpeed(event.target.value)} className="rounded-full border border-brand-line bg-white px-4 py-3 text-sm text-brand-ink outline-none">
                            <option>0.8x</option>
                            <option>1.0x</option>
                            <option>1.25x</option>
                        </select>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.voice.packNote, language)}</p>
                </section>

                <section className="space-y-4">
                    {playlist.map((story, index) => {
                        const isPlaying = playingId === story.id;

                        return (
                            <button key={story.id} type="button" onClick={() => setPlayingId(isPlaying ? null : story.id)} className="surface-card flex w-full items-start justify-between rounded-[2rem] p-5 text-left">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">{language === 'ne' ? `ट्र्याक ${index + 1}` : `Track ${index + 1}`}</p>
                                    <h2 className="mt-2 text-lg font-semibold text-brand-ink">{getLocalizedText(story.headline, language)}</h2>
                                    <p className="mt-2 text-sm leading-6 text-brand-muted">{story.primaryLocation} • {story.audioLanguages.join(', ').toUpperCase()}</p>
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

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Bookmark, Headphones, Share2, ShieldCheck, PauseCircle } from 'lucide-react';
import { StoryCluster } from '@/types';
import { useLanguage } from '@/lib/LanguageContext';
import { useAuth } from '@/lib/AuthContext';
import { getLocalizedText } from '@/lib/client/language';
import { appCopy, trustBadgeLabels, categoryLabels } from '@/lib/client/copy';
import { storyAudioService } from '@/lib/client/audio';
import { buildSessionHeaders } from '@/lib/client/api';
import { sources } from '@/data/fixtures/sources';
import { guardianNotes } from '@/data/fixtures/notes';

interface SwipeScreenProps {
    story: StoryCluster;
    isActive: boolean;
}

export default function SwipeScreen({ story, isActive }: SwipeScreenProps) {
    const { session } = useAuth();
    const { language, contentLanguage, fallbackLanguage, audioLanguage, preferences } = useLanguage();
    const [saved, setSaved] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive) {
            if (isPlaying) {
                storyAudioService.stop();
                setIsPlaying(false);
            }
        }
    }, [isActive, isPlaying]);

    const handleToggleAudio = () => {
        if (isPlaying) {
            storyAudioService.stop();
            setIsPlaying(false);
        } else {
            const didStart = storyAudioService.speakNow({
                story,
                language: audioLanguage,
                rate: preferences.audioSpeed,
                onEnd: () => setIsPlaying(false),
            });
            setIsPlaying(didStart);
        }
    };

    const handleShare = async () => {
        const title = getLocalizedText(story.headline, contentLanguage, fallbackLanguage);
        const text = getLocalizedText(story.summaryShort, contentLanguage, fallbackLanguage);
        const url = `${window.location.origin}/stories/${story.id}`;

        if (navigator.share) {
            await navigator.share({ title, text, url });
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(`${title}\n\n${text}\n\n${url}`);
        }
    };

    const handleSave = async () => {
        const response = await fetch(`/api/stories/${story.id}/save`, {
            method: saved ? 'DELETE' : 'POST',
            headers: buildSessionHeaders(session),
        });

        if (response.ok) {
            setSaved((current) => !current);
        }
    };

    const storySources = sources.filter((s) => story.sourceIds.includes(s.id)).slice(0, 3);
    const guardianNote = story.guardianNoteId
        ? guardianNotes.find((note) => note.id === story.guardianNoteId)
        : null;

    return (
        <article
            ref={containerRef}
            className="relative h-screen w-full snap-start snap-always overflow-hidden bg-black"
        >
            <Image
                src={story.heroImageUrl}
                alt={getLocalizedText(story.headline, contentLanguage, fallbackLanguage)}
                fill
                priority={isActive}
                className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.8)_80%,rgba(0,0,0,0.95)_100%)]" />

            {/* Added bottom padding so the BottomNav doesn't overlap on mobile */}
            <div className="absolute inset-x-0 bottom-0 p-6 pb-28 md:pb-10 text-white flex flex-col justify-end">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`trust-pill trust-${story.trustBadge}`}>
                        {getLocalizedText(trustBadgeLabels[story.trustBadge], language)}
                    </span>
                    <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {getLocalizedText(categoryLabels[story.category], language)}
                    </span>
                </div>

                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/70 font-semibold drop-shadow-md">
                    {story.primaryLocation}
                </p>

                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3 drop-shadow-md">
                    {getLocalizedText(story.headline, contentLanguage, fallbackLanguage)}
                </h1>

                <p className="text-sm md:text-base leading-relaxed text-white/80 mb-6 drop-shadow-md max-w-3xl">
                    {getLocalizedText(story.summaryShort, contentLanguage, fallbackLanguage)}
                </p>

                <div className="mb-6 flex flex-wrap gap-2 text-xs">
                    {storySources.map((source) => (
                        <span key={source.id} className="rounded-full bg-white/10 px-3 py-1 backdrop-blur-md">
                            {source.name}
                        </span>
                    ))}
                    {guardianNote && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-green/20 text-brand-green px-3 py-1 border border-brand-green/30 backdrop-blur-md">
                            <ShieldCheck size={12} />
                            {getLocalizedText(appCopy.story.guardianNote, language)}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleToggleAudio}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-green px-4 py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 shadow-[0_0_20px_rgba(78,203,133,0.4)]"
                    >
                        {isPlaying ? <PauseCircle size={18} /> : <Headphones size={18} />}
                        {isPlaying 
                            ? getLocalizedText(appCopy.actions.stop, audioLanguage)
                            : getLocalizedText(appCopy.actions.listen, audioLanguage)}
                    </button>

                    <button
                        onClick={handleSave}
                        className="flex aspect-square h-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 active:scale-95 border border-white/10"
                    >
                        <Bookmark size={20} className={saved ? 'fill-current' : ''} />
                    </button>

                    <button
                        onClick={handleShare}
                        className="flex aspect-square h-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 active:scale-95 border border-white/10"
                    >
                        <Share2 size={20} />
                    </button>
                </div>
            </div>
        </article>
    );
}

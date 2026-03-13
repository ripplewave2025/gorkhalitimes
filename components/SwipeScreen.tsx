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
                className="object-cover opacity-85"
            />
            {/* Tighter gradient so more image is visible */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(0,0,0,0.7)_80%,rgba(0,0,0,0.95)_100%)]" />

            {/* Bottom Content Area */}
            <div className="absolute inset-x-0 bottom-0 p-5 pb-24 md:pb-10 text-white flex items-end justify-between">
                
                {/* Left Side: Story Content */}
                <div className="flex-1 pr-4">
                    {/* Unified Meta Row */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 drop-shadow-md mb-2 flex-wrap">
                        <span className="text-brand-green-light">
                            {getLocalizedText(categoryLabels[story.category], language)}
                        </span>
                        <span>•</span>
                        <span>{story.primaryLocation}</span>
                        <span>•</span>
                        <span className="opacity-75">
                            {getLocalizedText(trustBadgeLabels[story.trustBadge], language)}
                        </span>
                    </div>

                    <h1 className="text-2xl md:text-4xl font-bold leading-snug mb-2 drop-shadow-md">
                        {getLocalizedText(story.headline, contentLanguage, fallbackLanguage)}
                    </h1>

                    {/* Single paragraph, slightly smaller text for easy reading */}
                    <p className="text-sm leading-relaxed text-white/90 drop-shadow-md max-w-xl line-clamp-3 mb-4">
                        {getLocalizedText(story.summaryShort, contentLanguage, fallbackLanguage)}
                    </p>

                    {/* Prominent Listen Button docked neatly under the text */}
                    <button
                        onClick={handleToggleAudio}
                        className="inline-flex items-center gap-2 rounded-full bg-brand-green/90 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95 shadow-lg border border-white/20"
                    >
                        {isPlaying ? <PauseCircle size={18} /> : <Headphones size={18} />}
                        {isPlaying 
                            ? getLocalizedText(appCopy.actions.stop, audioLanguage)
                            : getLocalizedText(appCopy.actions.listen, audioLanguage)}
                    </button>
                </div>

                {/* Right Side: Floating Vertical Action Bar */}
                <div className="flex flex-col items-center justify-end gap-5 pb-2">
                    <button
                        onClick={handleSave}
                        className="group flex flex-col items-center gap-1 active:scale-95 transition-transform"
                    >
                        <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 group-hover:bg-white/20">
                            <Bookmark size={20} className={saved ? 'fill-current' : ''} />
                        </div>
                        <span className="text-[10px] font-medium text-white/80 drop-shadow-md">
                            {getLocalizedText(appCopy.actions.save, language)}
                        </span>
                    </button>

                    <button
                        onClick={handleShare}
                        className="group flex flex-col items-center gap-1 active:scale-95 transition-transform"
                    >
                        <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 group-hover:bg-white/20">
                            <Share2 size={20} />
                        </div>
                        <span className="text-[10px] font-medium text-white/80 drop-shadow-md">
                            {getLocalizedText(appCopy.actions.share, language)}
                        </span>
                    </button>
                    
                    {/* Guardian Note Indicator (Simplified Dot) */}
                    {guardianNote && (
                        <div className="group flex flex-col items-center gap-1 mt-2">
                            <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-full bg-brand-green/20 text-brand-green-light backdrop-blur-md border border-brand-green/40">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="text-[10px] font-medium text-brand-green-light drop-shadow-md">Note</span>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

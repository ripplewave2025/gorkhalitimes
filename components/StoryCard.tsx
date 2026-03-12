'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, ChevronDown, ChevronUp, Share2, ShieldCheck } from 'lucide-react';
import ListenButton from '@/components/ListenButton';
import { guardianNotes } from '@/data/fixtures/notes';
import { sources } from '@/data/fixtures/sources';
import { buildSessionHeaders } from '@/lib/client/api';
import { appCopy, audioStatusLabels, categoryLabels, trustBadgeLabels } from '@/lib/client/copy';
import { formatRelativeTime, getLocalizedText } from '@/lib/client/language';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { StoryCluster } from '@/types';

interface StoryCardProps {
    story: StoryCluster;
    onNext?: () => void;
    onPrevious?: () => void;
}

export default function StoryCard({ story, onNext, onPrevious }: StoryCardProps) {
    const { session } = useAuth();
    const { language, contentLanguage, fallbackLanguage } = useLanguage();
    const [saved, setSaved] = useState(false);
    const [saveMessage, setSaveMessage] = useState<string | null>(null);
    const storySources = sources.filter((source) => story.sourceIds.includes(source.id)).slice(0, 3);
    const guardianNote = story.guardianNoteId
        ? guardianNotes.find((note) => note.id === story.guardianNoteId)
        : null;

    const handleShare = async () => {
        const title = getLocalizedText(story.headline, contentLanguage, fallbackLanguage);
        const text = getLocalizedText(story.summaryShort, contentLanguage, fallbackLanguage);
        const url = typeof window === 'undefined' ? `/stories/${story.id}` : `${window.location.origin}/stories/${story.id}`;

        if (navigator.share) {
            await navigator.share({ title, text, url });
            return;
        }

        if (navigator.clipboard) {
            await navigator.clipboard.writeText(`${title}\n\n${text}\n\n${url}`);
        }
    };

    const handleSave = async () => {
        const response = await fetch(`/api/stories/${story.id}/save`, {
            method: saved ? 'DELETE' : 'POST',
            headers: buildSessionHeaders(session),
        });

        if (!response.ok) {
            setSaveMessage(language === 'ne' ? 'कथा सेभ गर्न साइन इन चाहिन्छ।' : 'Sign in is required to save stories.');
            return;
        }

        setSaved((current) => !current);
        setSaveMessage(language === 'ne' ? 'सेभ गरिएको सूची अपडेट भयो।' : 'Saved list updated.');
    };

    return (
        <article className="surface-card overflow-hidden rounded-[2.2rem] border border-brand-line/80 bg-brand-surface/95">
            <div className="relative h-[24rem] w-full overflow-hidden md:h-[30rem] lg:h-[34rem]">
                <Image
                    src={story.heroImageUrl}
                    alt={getLocalizedText(story.headline, contentLanguage, fallbackLanguage)}
                    fill
                    className="scale-[1.03] object-cover transition duration-700"
                    priority
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,12,0.18),rgba(4,8,12,0.3)_30%,rgba(4,8,12,0.82)_72%,rgba(4,8,12,0.96)_100%)]" />
                <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center gap-2">
                    <span className={`trust-pill trust-${story.trustBadge}`}>{getLocalizedText(trustBadgeLabels[story.trustBadge], language)}</span>
                    <span className="rounded-full border border-white/12 bg-black/40 px-3 py-1 text-xs font-medium text-white">
                        {getLocalizedText(categoryLabels[story.category], language)}
                    </span>
                    {guardianNote ? (
                        <span className="rounded-full border border-brand-green/30 bg-brand-green/16 px-3 py-1 text-xs font-medium text-brand-green">
                            {getLocalizedText(appCopy.story.guardianNote, language)}
                        </span>
                    ) : null}
                    <span className="rounded-full border border-white/12 bg-black/40 px-3 py-1 text-xs font-medium text-white">
                        {getLocalizedText(audioStatusLabels[story.audioStatus ?? 'browser-fallback'], language)}
                    </span>
                </div>
                {(onNext || onPrevious) ? (
                    <div className="absolute bottom-5 right-5 flex gap-3">
                        <button type="button" onClick={onPrevious} className="icon-float" aria-label="Previous story">
                            <ChevronUp size={18} />
                        </button>
                        <button type="button" onClick={onNext} className="icon-float" aria-label="Next story">
                            <ChevronDown size={18} />
                        </button>
                    </div>
                ) : null}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white md:p-6">
                    <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/72">{story.primaryLocation}</p>
                    <h2 className="max-w-3xl text-2xl font-semibold leading-tight md:text-4xl">{getLocalizedText(story.headline, contentLanguage, fallbackLanguage)}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-white/84 md:text-base">{getLocalizedText(story.summaryShort, contentLanguage, fallbackLanguage)}</p>
                    {story.uncertaintyLine ? (
                        <p className="mt-4 inline-flex rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-100">
                            {getLocalizedText(story.uncertaintyLine, contentLanguage, fallbackLanguage)}
                        </p>
                    ) : null}
                </div>
            </div>
            <div className="space-y-5 p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs text-brand-muted">
                    <span>{formatRelativeTime(story.updatedAt, language)}</span>
                    <span>/</span>
                    <span>{story.sourceIds.length} {getLocalizedText(appCopy.story.sourceVisible, language)}</span>
                    <span>/</span>
                    <span>{story.savedCount} {getLocalizedText(appCopy.actions.save, language)}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {storySources.map((source) => (
                        <span key={source.id} className="chip bg-brand-bg/80 text-brand-ink">
                            {source.name}
                        </span>
                    ))}
                </div>

                {guardianNote ? (
                    <div className="rounded-[1.8rem] border border-brand-green/20 bg-brand-green-soft p-4 text-sm leading-6 text-brand-ink">
                        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
                            <ShieldCheck size={14} />
                            {getLocalizedText(appCopy.story.guardianNote, language)}
                        </div>
                        <p>{getLocalizedText(guardianNote.text, contentLanguage, fallbackLanguage)}</p>
                        <p className="mt-3 text-xs text-brand-muted">
                            {getLocalizedText(appCopy.story.confidence, language)}: <span className="font-medium text-brand-ink">{guardianNote.confidence}</span> / {getLocalizedText(appCopy.story.sources, language)}: <span className="font-medium text-brand-ink">{guardianNote.sourceIds.length}</span>
                            {guardianNote.fastTracked ? ` / ${getLocalizedText(appCopy.story.fastTrack, language)}` : ''}
                        </p>
                    </div>
                ) : null}

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <ListenButton story={story} />
                    <button type="button" onClick={handleSave} className="btn-secondary justify-center">
                        <Bookmark size={16} className={saved ? 'fill-current' : ''} />
                        {getLocalizedText(appCopy.actions.save, language)}
                    </button>
                    <button type="button" onClick={handleShare} className="btn-secondary justify-center">
                        <Share2 size={16} />
                        {getLocalizedText(appCopy.actions.share, language)}
                    </button>
                    <Link href={`/stories/${story.id}`} className="btn-secondary justify-center">
                        {getLocalizedText(appCopy.actions.viewSources, language)}
                    </Link>
                </div>

                {saveMessage ? <p className="text-sm text-brand-muted">{saveMessage}</p> : null}

                <Link href={`/stories/${story.id}`} className="inline-flex items-center text-sm font-medium text-brand-green hover:text-brand-green-dark">
                    {getLocalizedText(appCopy.actions.readFullStory, language)}
                </Link>
            </div>
        </article>
    );
}

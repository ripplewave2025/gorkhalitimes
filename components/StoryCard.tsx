'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, ChevronDown, ChevronUp, ShieldCheck, Share2 } from 'lucide-react';
import ListenButton from '@/components/ListenButton';
import { guardianNotes } from '@/data/fixtures/notes';
import { sources } from '@/data/fixtures/sources';
import { categoryLabels, trustBadgeLabels, appCopy } from '@/lib/client/copy';
import { formatRelativeTime, getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';
import { StoryCluster } from '@/types';

interface StoryCardProps {
    story: StoryCluster;
    onNext?: () => void;
    onPrevious?: () => void;
}

export default function StoryCard({ story, onNext, onPrevious }: StoryCardProps) {
    const { language, contentLanguage, fallbackLanguage } = useLanguage();
    const [saved, setSaved] = useState(false);
    const storySources = sources.filter((source) => story.sourceIds.includes(source.id)).slice(0, 3);
    const guardianNote = story.guardianNoteId
        ? guardianNotes.find((note) => note.id === story.guardianNoteId)
        : null;

    const handleShare = async () => {
        const title = getLocalizedText(story.headline, contentLanguage, fallbackLanguage);
        const text = getLocalizedText(story.summaryShort, contentLanguage, fallbackLanguage);

        if (navigator.share) {
            await navigator.share({ title, text, url: `/stories/${story.id}` });
            return;
        }

        if (navigator.clipboard) {
            await navigator.clipboard.writeText(`${title}\n\n${text}`);
        }
    };

    return (
        <article className="surface-card overflow-hidden rounded-[2rem]">
            <div className="relative h-[22rem] w-full overflow-hidden md:h-[26rem]">
                <Image src={story.heroImageUrl} alt={getLocalizedText(story.headline, contentLanguage, fallbackLanguage)} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/20 to-transparent" />
                <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center gap-2">
                    <span className={`trust-pill trust-${story.trustBadge}`}>{getLocalizedText(trustBadgeLabels[story.trustBadge], language)}</span>
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-brand-ink">{getLocalizedText(categoryLabels[story.category], language)}</span>
                    {guardianNote ? <span className="rounded-full bg-brand-green px-3 py-1 text-xs font-medium text-white">{getLocalizedText(appCopy.story.guardianNote, language)}</span> : null}
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-brand-ink">{story.audioStatus ?? 'browser-fallback'}</span>
                </div>
                <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-3">
                    <button type="button" onClick={onNext} className="icon-float" aria-label="Next story">
                        <ChevronUp size={20} />
                    </button>
                    <button type="button" onClick={onPrevious} className="icon-float" aria-label="Previous story">
                        <ChevronDown size={20} />
                    </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="mb-2 text-xs uppercase tracking-[0.24em] text-white/75">{story.primaryLocation}</p>
                    <h2 className="max-w-2xl text-2xl font-semibold leading-tight md:text-3xl">{getLocalizedText(story.headline, contentLanguage, fallbackLanguage)}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85">{getLocalizedText(story.summaryShort, contentLanguage, fallbackLanguage)}</p>
                </div>
            </div>
            <div className="space-y-4 p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-brand-muted">
                    <span>{formatRelativeTime(story.updatedAt, language)}</span>
                    <span>•</span>
                    <span>{story.sourceIds.length} {getLocalizedText(appCopy.story.sourceVisible, language)}</span>
                    <span>•</span>
                    <span>{story.savedCount} saves</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {storySources.map((source) => (
                        <span key={source.id} className="chip">{source.name}</span>
                    ))}
                </div>
                {guardianNote ? (
                    <div className="rounded-2xl bg-brand-green-soft p-4 text-sm leading-6 text-brand-ink">
                        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
                            <ShieldCheck size={14} />
                            {getLocalizedText(appCopy.story.guardianNote, language)}
                        </div>
                        <p>{getLocalizedText(guardianNote.text, contentLanguage, fallbackLanguage)}</p>
                    </div>
                ) : null}
                <div className="grid gap-3 md:grid-cols-2">
                    <ListenButton story={story} />
                    <button type="button" onClick={() => setSaved((current) => !current)} className="btn-secondary justify-center">
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
                <Link href={`/stories/${story.id}`} className="inline-flex items-center text-sm font-medium text-brand-green hover:text-brand-green-dark">
                    {getLocalizedText(appCopy.actions.readFullStory, language)}
                </Link>
            </div>
        </article>
    );
}

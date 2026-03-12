'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { guardianNotes } from '@/data/fixtures/notes';
import { sources } from '@/data/fixtures/sources';
import { storyClusters } from '@/data/fixtures/stories';
import ListenButton from '@/components/ListenButton';
import NoteRatingWidget from '@/components/NoteRatingWidget';
import { appCopy, confidenceLabels, trustBadgeLabels } from '@/lib/client/copy';
import { formatRelativeTime, getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';

export default function StoryDetailPage({ params }: { params: { id: string } }) {
    const { language, contentLanguage, fallbackLanguage } = useLanguage();
    const story = storyClusters.find((item) => item.id === params.id);

    if (!story) {
        return (
            <div className="min-h-screen bg-brand-bg px-4 py-6">
                <div className="mx-auto max-w-2xl surface-card rounded-[2rem] p-6">
                    <h1 className="text-2xl font-semibold text-brand-ink">{language === 'ne' ? 'कथा भेटिएन' : 'Story not found'}</h1>
                    <p className="mt-3 text-sm text-brand-muted">
                        {language === 'ne'
                            ? 'अहिलेसम्म यो डेमोमा राखिएको कथा भेटिएन।'
                            : 'The current prototype only contains seeded story clusters.'}
                    </p>
                </div>
            </div>
        );
    }

    const storySources = sources.filter((source) => story.sourceIds.includes(source.id));
    const guardianNote = story.guardianNoteId ? guardianNotes.find((note) => note.id === story.guardianNoteId) : null;
    const relatedStories = storyClusters.filter((candidate) => candidate.id !== story.id && candidate.category === story.category).slice(0, 3);

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-4xl space-y-6">
                <div className="surface-card overflow-hidden rounded-[2rem]">
                    <div className="relative h-80 w-full">
                        <Image src={story.heroImageUrl} alt={getLocalizedText(story.headline, contentLanguage, fallbackLanguage)} fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    </div>
                    <div className="space-y-5 p-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={`trust-pill trust-${story.trustBadge}`}>{getLocalizedText(trustBadgeLabels[story.trustBadge], language)}</span>
                            <span className="chip">{story.primaryLocation}</span>
                            <span className="chip">{formatRelativeTime(story.updatedAt, language)}</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-semibold text-brand-ink">{getLocalizedText(story.headline, contentLanguage, fallbackLanguage)}</h1>
                            <p className="mt-4 text-base leading-7 text-brand-muted">{getLocalizedText(story.summaryFull, contentLanguage, fallbackLanguage)}</p>
                            {story.uncertaintyLine ? <p className="mt-4 rounded-2xl bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">{getLocalizedText(story.uncertaintyLine, contentLanguage, fallbackLanguage)}</p> : null}
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <ListenButton story={story} />
                            <Link href={`/stories/${story.id}/request-note`} className="btn-secondary">{getLocalizedText(appCopy.actions.requestNote, language)}</Link>
                            <Link href={`/help?storyId=${story.id}`} className="btn-secondary">{getLocalizedText(appCopy.actions.askForHelp, language)}</Link>
                        </div>
                        {guardianNote ? (
                            <section className="space-y-4 rounded-[1.5rem] bg-brand-green-soft p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="inline-flex items-center gap-2 rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
                                            <ShieldCheck size={14} />
                                            {getLocalizedText(appCopy.story.guardianNote, language)}
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-brand-ink">{getLocalizedText(guardianNote.text, contentLanguage, fallbackLanguage)}</p>
                                    </div>
                                    <div className="rounded-2xl bg-black/10 px-3 py-2 text-xs text-brand-ink">
                                        <p>{getLocalizedText(appCopy.story.confidence, language)}</p>
                                        <p className="mt-1 font-semibold">{getLocalizedText(confidenceLabels[guardianNote.confidence], language)}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-xs text-brand-muted">
                                    <span>{getLocalizedText(appCopy.story.sources, language)}: {guardianNote.sourceIds.length}</span>
                                    {guardianNote.fastTracked ? <span>• {getLocalizedText(appCopy.story.fastTrack, language)}</span> : null}
                                </div>
                                <NoteRatingWidget noteId={guardianNote.id} />
                            </section>
                        ) : null}
                    </div>
                </div>

                <section className="surface-card rounded-[2rem] p-6">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-xl font-semibold text-brand-ink">{getLocalizedText(appCopy.story.sources, language)}</h2>
                        <Link href={`/stories/${story.id}/request-note`} className="btn-secondary">{getLocalizedText(appCopy.actions.requestNote, language)}</Link>
                    </div>
                    <div className="mt-4 space-y-3">
                        {storySources.map((source) => (
                            <a key={source.id} href={source.baseUrl} target="_blank" rel="noreferrer" className="surface-card flex items-center justify-between rounded-2xl p-4">
                                <div>
                                    <p className="font-medium text-brand-ink">{source.name}</p>
                                    <p className="mt-1 text-sm text-brand-muted">{source.locationScope}</p>
                                </div>
                                <span className="chip">
                                    Tier {source.trustTier}
                                    <ArrowUpRight size={14} />
                                </span>
                            </a>
                        ))}
                    </div>
                </section>

                <section className="surface-card rounded-[2rem] p-6">
                    <h2 className="text-xl font-semibold text-brand-ink">{getLocalizedText(appCopy.story.timeline, language)}</h2>
                    <div className="mt-4 space-y-3">
                        {story.timeline.map((entry) => (
                            <div key={entry.id} className="rounded-2xl bg-white/6 p-4">
                                <p className="text-sm leading-6 text-brand-ink">{getLocalizedText(entry.label, contentLanguage, fallbackLanguage)}</p>
                                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-brand-muted">{formatRelativeTime(entry.timestamp, language)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="surface-card rounded-[2rem] p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-xl font-semibold text-brand-ink">{getLocalizedText(appCopy.story.related, language)}</h2>
                        <Link href={`/stories/${story.id}/notes/new`} className="btn-secondary">{getLocalizedText(appCopy.actions.writeNote, language)}</Link>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {relatedStories.map((related) => (
                            <Link key={related.id} href={`/stories/${related.id}`} className="rounded-2xl bg-white/6 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">{related.primaryLocation}</p>
                                <p className="mt-2 text-sm font-medium leading-6 text-brand-ink">{getLocalizedText(related.headline, contentLanguage, fallbackLanguage)}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Bookmark, FileStack, HelpingHand } from 'lucide-react';
import { GovtScheme } from '@/types';
import { getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';
import { appCopy } from '@/lib/client/copy';

const schemeStatusCopy = {
    active: { en: 'Open now', ne: 'अहिले खुला' },
    updated: { en: 'Updated', ne: 'नयाँ अपडेट' },
    closed: { en: 'Closed', ne: 'बन्द' },
} as const;

export default function SchemeCard({ scheme }: { scheme: GovtScheme }) {
    const { language, contentLanguage, fallbackLanguage } = useLanguage();
    const [saved, setSaved] = useState(false);

    return (
        <article className="surface-card rounded-[2rem] border border-brand-line/80 bg-brand-surface/92 p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_26px_50px_rgba(2,8,14,0.36)]">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="chip bg-brand-green-soft text-brand-green">{getLocalizedText(appCopy.schemes.badge, language)}</span>
                        <span className="chip">{getLocalizedText(schemeStatusCopy[scheme.status], language)}</span>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">{scheme.locationScope}</p>
                    <h2 className="max-w-2xl text-xl font-semibold text-brand-ink">{getLocalizedText(scheme.title, contentLanguage, fallbackLanguage)}</h2>
                </div>
                <button type="button" onClick={() => setSaved((current) => !current)} className="btn-secondary justify-center">
                    <Bookmark size={16} className={saved ? 'fill-current' : ''} />
                    {getLocalizedText(appCopy.actions.save, language)}
                </button>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="panel-quiet rounded-[1.4rem] p-4 text-sm leading-6 text-brand-muted">
                    <p className={language === 'ne' ? 'text-xs font-semibold text-brand-green' : 'text-xs font-semibold uppercase tracking-[0.16em] text-brand-green'}>{getLocalizedText(appCopy.schemes.whoItsFor, language)}</p>
                    <p className="mt-2 text-brand-ink">{getLocalizedText(scheme.whoItsFor, contentLanguage, fallbackLanguage)}</p>
                </div>
                <div className="panel-quiet rounded-[1.4rem] p-4 text-sm leading-6 text-brand-muted">
                    <p className={language === 'ne' ? 'text-xs font-semibold text-brand-green' : 'text-xs font-semibold uppercase tracking-[0.16em] text-brand-green'}>{getLocalizedText(appCopy.schemes.benefitSummary, language)}</p>
                    <p className="mt-2 text-brand-ink">{getLocalizedText(scheme.benefitSummary, contentLanguage, fallbackLanguage)}</p>
                </div>
                <div className="panel-quiet rounded-[1.4rem] p-4 text-sm leading-6 text-brand-muted">
                    <p className={language === 'ne' ? 'text-xs font-semibold text-brand-green' : 'text-xs font-semibold uppercase tracking-[0.16em] text-brand-green'}>{getLocalizedText(appCopy.schemes.eligibility, language)}</p>
                    <p className="mt-2 text-brand-ink">{getLocalizedText(scheme.eligibilitySnapshot, contentLanguage, fallbackLanguage)}</p>
                </div>
            </div>

            {scheme.documentsNeeded?.length ? (
                <div className="mt-4 rounded-[1.6rem] border border-brand-line/80 bg-brand-bg/55 p-4">
                    <div className={language === 'ne' ? 'flex items-center gap-2 text-xs font-semibold text-brand-green' : 'flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green'}>
                        <FileStack size={14} />
                        {getLocalizedText(appCopy.schemes.documents, language)}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {scheme.documentsNeeded.map((documentLabel, index) => (
                            <span key={`${scheme.id}-doc-${index}`} className="chip bg-brand-bg/80 text-brand-ink">
                                {getLocalizedText(documentLabel, contentLanguage, fallbackLanguage)}
                            </span>
                        ))}
                    </div>
                </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-brand-muted">
                <span className="chip">{scheme.savedCount} {language === 'ne' ? 'सेभ' : 'saved'}</span>
                <span className="chip">{scheme.helpCount} {language === 'ne' ? 'सहायता' : 'help requests'}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
                <a href={scheme.learnMoreUrl} target="_blank" rel="noreferrer" className="btn-secondary justify-center">
                    <ArrowUpRight size={16} />
                    {getLocalizedText(appCopy.actions.learnMore, language)}
                </a>
                <Link href={`/help?schemeId=${scheme.id}`} className="btn-primary justify-center">
                    <HelpingHand size={16} />
                    {getLocalizedText(appCopy.actions.askForHelp, language)}
                </Link>
            </div>
        </article>
    );
}

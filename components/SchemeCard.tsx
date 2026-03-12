'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Bookmark, HelpingHand } from 'lucide-react';
import { GovtScheme } from '@/types';
import { getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';
import { appCopy } from '@/lib/client/copy';

export default function SchemeCard({ scheme }: { scheme: GovtScheme }) {
    const { language, contentLanguage, fallbackLanguage } = useLanguage();
    const [saved, setSaved] = useState(false);

    return (
        <article className="surface-card rounded-[2rem] p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">{scheme.locationScope}</p>
                    <h2 className="text-xl font-semibold text-brand-ink">{getLocalizedText(scheme.title, contentLanguage, fallbackLanguage)}</h2>
                </div>
                <span className="chip">{getLocalizedText(appCopy.schemes.badge, language)}</span>
            </div>
            <div className="mt-5 space-y-3 text-sm leading-6 text-brand-muted">
                <p><span className="font-medium text-brand-ink">{getLocalizedText(appCopy.schemes.whoItsFor, language)}</span> {getLocalizedText(scheme.whoItsFor, contentLanguage, fallbackLanguage)}</p>
                <p><span className="font-medium text-brand-ink">{getLocalizedText(appCopy.schemes.benefitSummary, language)}</span> {getLocalizedText(scheme.benefitSummary, contentLanguage, fallbackLanguage)}</p>
                <p><span className="font-medium text-brand-ink">{getLocalizedText(appCopy.schemes.eligibility, language)}</span> {getLocalizedText(scheme.eligibilitySnapshot, contentLanguage, fallbackLanguage)}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-brand-muted">
                <span className="chip">{scheme.savedCount} {language === 'ne' ? 'सेभ' : 'saved'}</span>
                <span className="chip">{scheme.helpCount} {language === 'ne' ? 'सहायता' : 'help'}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
                <a href={scheme.learnMoreUrl} target="_blank" rel="noreferrer" className="btn-secondary justify-center">
                    <ArrowUpRight size={16} />
                    {getLocalizedText(appCopy.actions.learnMore, language)}
                </a>
                <button type="button" onClick={() => setSaved((current) => !current)} className="btn-secondary justify-center">
                    <Bookmark size={16} className={saved ? 'fill-current' : ''} />
                    {getLocalizedText(appCopy.actions.save, language)}
                </button>
                <Link href={`/help?schemeId=${scheme.id}`} className="btn-primary justify-center">
                    <HelpingHand size={16} />
                    {getLocalizedText(appCopy.actions.askForHelp, language)}
                </Link>
            </div>
        </article>
    );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bookmark, HelpingHand } from 'lucide-react';
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
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">{scheme.locationScope}</p>
                    <h2 className="mt-2 text-xl font-semibold text-brand-ink">{getLocalizedText(scheme.title, contentLanguage, fallbackLanguage)}</h2>
                </div>
                <span className="chip">Govt Schemes</span>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-6 text-brand-muted">
                <p><span className="font-medium text-brand-ink">{language === 'ne' ? 'कसका लागि:' : 'Who it is for:'}</span> {getLocalizedText(scheme.whoItsFor, contentLanguage, fallbackLanguage)}</p>
                <p><span className="font-medium text-brand-ink">{language === 'ne' ? 'फाइदा:' : 'Benefit summary:'}</span> {getLocalizedText(scheme.benefitSummary, contentLanguage, fallbackLanguage)}</p>
                <p><span className="font-medium text-brand-ink">{language === 'ne' ? 'योग्यता:' : 'Eligibility:'}</span> {getLocalizedText(scheme.eligibilitySnapshot, contentLanguage, fallbackLanguage)}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
                <a href={scheme.learnMoreUrl} target="_blank" rel="noreferrer" className="btn-secondary justify-center">{language === 'ne' ? 'थप जानकारी' : 'Learn more'}</a>
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

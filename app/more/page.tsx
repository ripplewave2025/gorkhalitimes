'use client';

import { useState } from 'react';
import LanguageToggle from '@/components/LanguageToggle';
import { appCopy } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';

export default function MorePage() {
    const { language } = useLanguage();
    const [autoplay, setAutoplay] = useState(false);
    const [largeText, setLargeText] = useState(false);
    const [dataSaver, setDataSaver] = useState(true);

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <header className="surface-card flex flex-col gap-4 rounded-[2rem] p-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-brand-ink">{getLocalizedText(appCopy.more.title, language)}</h1>
                        <p className="mt-2 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.brand.tagline, language)}</p>
                    </div>
                    <LanguageToggle />
                </header>

                <section className="surface-card rounded-[2rem] p-5">
                    <div className="space-y-4">
                        <label className="flex items-center justify-between gap-4">
                            <span>{getLocalizedText(appCopy.more.autoplay, language)}</span>
                            <input type="checkbox" checked={autoplay} onChange={() => setAutoplay((value) => !value)} />
                        </label>
                        <label className="flex items-center justify-between gap-4">
                            <span>{getLocalizedText(appCopy.more.largeText, language)}</span>
                            <input type="checkbox" checked={largeText} onChange={() => setLargeText((value) => !value)} />
                        </label>
                        <label className="flex items-center justify-between gap-4">
                            <span>{getLocalizedText(appCopy.more.dataSaver, language)}</span>
                            <input type="checkbox" checked={dataSaver} onChange={() => setDataSaver((value) => !value)} />
                        </label>
                        <div className="flex items-center justify-between gap-4">
                            <span>{getLocalizedText(appCopy.more.audioSpeed, language)}</span>
                            <span className="chip">1.0x</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

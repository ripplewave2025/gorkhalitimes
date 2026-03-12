'use client';

import Link from 'next/link';
import LanguageToggle from '@/components/LanguageToggle';
import { appCopy } from '@/lib/client/copy';
import { getLocalizedText } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';

export default function OnboardingPage() {
    const { language } = useLanguage();

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-3xl space-y-6">
                <header className="surface-card flex flex-col gap-4 rounded-[2rem] p-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">GorkhayAI</p>
                        <h1 className="mt-2 text-3xl font-semibold text-brand-ink">{getLocalizedText(appCopy.onboarding.title, language)}</h1>
                    </div>
                    <LanguageToggle />
                </header>

                <section className="grid gap-4 md:grid-cols-3">
                    {appCopy.onboarding.slides.map((slide, index) => (
                        <article key={index} className="surface-card rounded-[2rem] p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">0{index + 1}</p>
                            <p className="mt-4 text-base leading-7 text-brand-ink">{getLocalizedText(slide, language)}</p>
                        </article>
                    ))}
                </section>

                <Link href="/" className="btn-primary">{language === 'ne' ? 'फिड सुरु गर्नुहोस्' : 'Enter the feed'}</Link>
            </div>
        </div>
    );
}

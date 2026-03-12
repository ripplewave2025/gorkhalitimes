'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import LanguageToggle from '@/components/LanguageToggle';
import { sources } from '@/data/fixtures/sources';
import { appCopy } from '@/lib/client/copy';
import { getFeedLaneLabel, getLocalizedText, SUPPORTED_LANGUAGES } from '@/lib/client/language';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { FeedLane, Language } from '@/types';

const topicOptions: FeedLane[] = ['for-you', 'top-stories', 'alerts', 'tea', 'roads', 'govt-schemes', 'jobs', 'schools', 'weather', 'economy'];

function LanguageSelect({ label, value, onChange }: { label: string; value: Language; onChange: (value: Language) => void }) {
    return (
        <label className="block space-y-2 text-sm text-brand-ink">
            <span className="font-medium">{label}</span>
            <div className="relative">
                <select value={value} onChange={(event) => onChange(event.target.value as Language)} className="field-select">
                    {SUPPORTED_LANGUAGES.map((item) => (
                        <option key={item.code} value={item.code}>
                            {item.nativeLabel} / {item.supportLevel}
                        </option>
                    ))}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            </div>
        </label>
    );
}

export default function MorePage() {
    const { session, signOut } = useAuth();
    const {
        language,
        uiLanguage,
        contentLanguage,
        audioLanguage,
        fallbackLanguage,
        preferences,
        setUiLanguage,
        setContentLanguage,
        setAudioLanguage,
        setFallbackLanguage,
        updatePreferences,
        togglePreferredTopic,
        toggleMutedSource,
    } = useLanguage();
    const [placesInput, setPlacesInput] = useState(preferences.preferredPlaces.join(', '));

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-4xl space-y-6">
                <header className="surface-card flex flex-col gap-4 rounded-[2rem] p-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-brand-ink">{getLocalizedText(appCopy.more.title, language)}</h1>
                        <p className="mt-2 text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.more.subtitle, language)}</p>
                    </div>
                    <LanguageToggle />
                </header>

                <section className="grid gap-4 md:grid-cols-2">
                    <article className="surface-card space-y-4 rounded-[2rem] p-5">
                        <LanguageSelect label={getLocalizedText(appCopy.more.uiLanguage, language)} value={uiLanguage} onChange={setUiLanguage} />
                        <LanguageSelect label={getLocalizedText(appCopy.more.contentLanguage, language)} value={contentLanguage} onChange={setContentLanguage} />
                        <LanguageSelect label={getLocalizedText(appCopy.more.audioLanguage, language)} value={audioLanguage} onChange={setAudioLanguage} />
                        <LanguageSelect label={getLocalizedText(appCopy.more.fallbackLanguage, language)} value={fallbackLanguage} onChange={setFallbackLanguage} />
                    </article>

                    <article className="surface-card space-y-4 rounded-[2rem] p-5">
                        <label className="field-toggle">
                            <span>{getLocalizedText(appCopy.more.morningDigest, language)}</span>
                            <input type="checkbox" checked={preferences.morningAudioDigest} onChange={() => updatePreferences({ morningAudioDigest: !preferences.morningAudioDigest })} className="field-check" />
                        </label>
                        <label className="field-toggle">
                            <span>{getLocalizedText(appCopy.more.govtSchemesAlerts, language)}</span>
                            <input type="checkbox" checked={preferences.govtSchemesAlerts} onChange={() => updatePreferences({ govtSchemesAlerts: !preferences.govtSchemesAlerts })} className="field-check" />
                        </label>
                        <label className="block space-y-2">
                            <span>{getLocalizedText(appCopy.more.audioSpeed, language)}</span>
                            <input type="range" min="0.8" max="1.25" step="0.05" value={preferences.audioSpeed} onChange={(event) => updatePreferences({ audioSpeed: Number(event.target.value) })} className="w-full" />
                            <span className="chip">{preferences.audioSpeed.toFixed(2)}x</span>
                        </label>
                        <label className="block space-y-2">
                            <span>{getLocalizedText(appCopy.more.preferredPlaces, language)}</span>
                            <input
                                value={placesInput}
                                onChange={(event) => setPlacesInput(event.target.value)}
                                onBlur={() => updatePreferences({ preferredPlaces: placesInput.split(',').map((item) => item.trim()).filter(Boolean) })}
                                placeholder={language === 'ne' ? 'दार्जिलिङ, कर्सियाङ, पेशोक' : 'Darjeeling, Kurseong, Peshok'}
                                className="field-control"
                            />
                        </label>
                    </article>
                </section>

                <section className="surface-card rounded-[2rem] p-5">
                    <h2 className="text-lg font-semibold text-brand-ink">{getLocalizedText(appCopy.more.preferredTopics, language)}</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {topicOptions.map((topic) => (
                            <button key={topic} type="button" onClick={() => togglePreferredTopic(topic)} className={preferences.preferredTopics.includes(topic) ? 'pill-active' : 'pill-muted border border-brand-line bg-brand-bg/70'}>
                                {getFeedLaneLabel(topic, language)}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="surface-card rounded-[2rem] p-5">
                    <h2 className="text-lg font-semibold text-brand-ink">{getLocalizedText(appCopy.more.mutedSources, language)}</h2>
                    <p className="mt-2 text-sm leading-6 text-brand-muted">
                        {language === 'ne'
                            ? 'यसले स्रोतलाई पूर्ण रोक्दैन, फिडमा मात्र कम प्राथमिकता दिन्छ।'
                            : 'This softly de-prioritizes a source instead of hard-blocking the feed.'}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {sources.map((source) => (
                            <button key={source.id} type="button" onClick={() => toggleMutedSource(source.id)} className={preferences.mutedSourceIds.includes(source.id) ? 'pill-active' : 'pill-muted border border-brand-line bg-brand-bg/70'}>
                                {source.name}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="surface-card flex flex-col gap-3 rounded-[2rem] p-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-brand-ink">{getLocalizedText(appCopy.more.account, language)}</h2>
                        <p className="mt-2 text-sm leading-6 text-brand-muted">
                            {session
                                ? `${session.name} / ${session.role} / ${session.authMethod}`
                                : (language === 'ne' ? 'सक्रिय सेसन छैन।' : 'No active session.')}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/auth" className="btn-secondary justify-center">{getLocalizedText(appCopy.actions.signIn, language)}</Link>
                        {session ? <button type="button" onClick={signOut} className="btn-primary justify-center">{getLocalizedText(appCopy.actions.signOut, language)}</button> : null}
                    </div>
                </section>
            </div>
        </div>
    );
}

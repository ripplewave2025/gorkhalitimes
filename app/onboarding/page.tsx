'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import LanguageToggle from '@/components/LanguageToggle';
import { appCopy } from '@/lib/client/copy';
import { getFeedLaneLabel, getLocalizedText, SUPPORTED_LANGUAGES } from '@/lib/client/language';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { FeedLane, Language } from '@/types';

const starterPlaces = ['Darjeeling', 'Kurseong', 'Kalimpong', 'Mirik', 'Peshok', 'Sonada'];
const starterTopics: FeedLane[] = ['for-you', 'top-stories', 'alerts', 'roads', 'govt-schemes', 'tea', 'schools', 'weather', 'economy'];

function LanguageSelect({
    label,
    value,
    onChange,
}: {
    label: string;
    value: Language;
    onChange: (value: Language) => void;
}) {
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

export default function OnboardingPage() {
    const router = useRouter();
    const { session } = useAuth();
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
        togglePreferredTopic,
        updatePreferences,
    } = useLanguage();

    const handleFinish = () => {
        updatePreferences({ onboardingComplete: true });
        router.push('/');
    };

    const togglePlace = (place: string) => {
        const nextPlaces = preferences.preferredPlaces.includes(place)
            ? preferences.preferredPlaces.filter((item) => item !== place)
            : [...preferences.preferredPlaces, place];
        updatePreferences({ preferredPlaces: nextPlaces });
    };

    return (
        <div className="min-h-screen bg-brand-bg px-4 py-6">
            <div className="mx-auto max-w-4xl space-y-6">
                <header className="surface-card flex flex-col gap-4 rounded-[2rem] p-6 md:flex-row md:items-start md:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">GorkhayAI</p>
                        <h1 className="mt-2 text-3xl font-semibold text-brand-ink">{getLocalizedText(appCopy.onboarding.title, language)}</h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-muted">{getLocalizedText(appCopy.onboarding.subtitle, language)}</p>
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

                <section className="grid gap-4 md:grid-cols-2">
                    <article className="surface-card space-y-4 rounded-[2rem] p-6">
                        <h2 className="text-xl font-semibold text-brand-ink">{language === 'ne' ? 'भाषा प्राथमिकता' : 'Language preferences'}</h2>
                        <LanguageSelect label={getLocalizedText(appCopy.more.uiLanguage, language)} value={uiLanguage} onChange={setUiLanguage} />
                        <LanguageSelect label={getLocalizedText(appCopy.more.contentLanguage, language)} value={contentLanguage} onChange={setContentLanguage} />
                        <LanguageSelect label={getLocalizedText(appCopy.more.audioLanguage, language)} value={audioLanguage} onChange={setAudioLanguage} />
                        <LanguageSelect label={getLocalizedText(appCopy.more.fallbackLanguage, language)} value={fallbackLanguage} onChange={setFallbackLanguage} />
                    </article>

                    <article className="surface-card space-y-4 rounded-[2rem] p-6">
                        <h2 className="text-xl font-semibold text-brand-ink">{language === 'ne' ? 'आजको brief मिलाउनुहोस्' : 'Tune your daily brief'}</h2>
                        <label className="field-toggle">
                            <span>{getLocalizedText(appCopy.more.morningDigest, language)}</span>
                            <input type="checkbox" checked={preferences.morningAudioDigest} onChange={() => updatePreferences({ morningAudioDigest: !preferences.morningAudioDigest })} className="field-check" />
                        </label>
                        <label className="field-toggle">
                            <span>{getLocalizedText(appCopy.more.govtSchemesAlerts, language)}</span>
                            <input type="checkbox" checked={preferences.govtSchemesAlerts} onChange={() => updatePreferences({ govtSchemesAlerts: !preferences.govtSchemesAlerts })} className="field-check" />
                        </label>
                        <label className="block space-y-2 text-sm text-brand-ink">
                            <span className="font-medium">{getLocalizedText(appCopy.more.audioSpeed, language)}</span>
                            <input type="range" min="0.8" max="1.25" step="0.05" value={preferences.audioSpeed} onChange={(event) => updatePreferences({ audioSpeed: Number(event.target.value) })} className="w-full" />
                            <span className="text-xs text-brand-muted">{preferences.audioSpeed.toFixed(2)}x</span>
                        </label>
                    </article>
                </section>

                <section className="grid gap-4 md:grid-cols-2">
                    <article className="surface-card rounded-[2rem] p-6">
                        <h2 className="text-xl font-semibold text-brand-ink">{getLocalizedText(appCopy.more.preferredPlaces, language)}</h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {starterPlaces.map((place) => {
                                const active = preferences.preferredPlaces.includes(place);
                                return (
                                    <button key={place} type="button" onClick={() => togglePlace(place)} className={active ? 'pill-active' : 'pill-muted border border-brand-line bg-brand-bg/70'}>
                                        {place}
                                    </button>
                                );
                            })}
                        </div>
                    </article>

                    <article className="surface-card rounded-[2rem] p-6">
                        <h2 className="text-xl font-semibold text-brand-ink">{getLocalizedText(appCopy.more.preferredTopics, language)}</h2>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {starterTopics.map((topic) => {
                                const active = preferences.preferredTopics.includes(topic);
                                return (
                                    <button key={topic} type="button" onClick={() => togglePreferredTopic(topic)} className={active ? 'pill-active' : 'pill-muted border border-brand-line bg-brand-bg/70'}>
                                        {getFeedLaneLabel(topic, language)}
                                    </button>
                                );
                            })}
                        </div>
                    </article>
                </section>

                <section className="surface-card flex flex-col gap-3 rounded-[2rem] p-6 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm leading-6 text-brand-muted">
                        {session && !session.isGuest
                            ? (language === 'ne' ? `साइन इन: ${session.name}` : `Signed in as ${session.name}`)
                            : (language === 'ne' ? 'तपाईं अहिले अतिथि मोडमा हुनुहुन्छ।' : 'You are currently in guest mode.')}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/auth" className="btn-secondary justify-center">{getLocalizedText(appCopy.actions.signIn, language)}</Link>
                        <button type="button" onClick={handleFinish} className="btn-primary justify-center">{getLocalizedText(appCopy.onboarding.finish, language)}</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

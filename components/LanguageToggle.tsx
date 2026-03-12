'use client';

import { SUPPORTED_LANGUAGES } from '@/lib/client/language';
import { useLanguage } from '@/lib/LanguageContext';

interface LanguageToggleProps {
    mode?: 'compact' | 'full';
}

export default function LanguageToggle({ mode = 'compact' }: LanguageToggleProps) {
    const { language, setLanguage } = useLanguage();

    if (mode === 'full') {
        return (
            <div className="space-y-2">
                {SUPPORTED_LANGUAGES.map((item) => (
                    <label key={item.code} className="flex items-center justify-between gap-3 rounded-2xl border border-brand-line bg-brand-bg/60 px-4 py-3 text-sm text-brand-ink">
                        <span>
                            <span className="block font-medium">{item.nativeLabel}</span>
                            <span className="block text-xs text-brand-muted">{item.label} · {item.supportLevel}</span>
                        </span>
                        <input
                            type="radio"
                            name="language-toggle"
                            checked={language === item.code}
                            onChange={() => setLanguage(item.code)}
                        />
                    </label>
                ))}
            </div>
        );
    }

    return (
        <label className="surface-card inline-flex items-center gap-3 rounded-full px-3 py-2 text-sm text-brand-ink">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">{language === 'ne' ? 'भाषा' : 'Lang'}</span>
            <select value={language} onChange={(event) => setLanguage(event.target.value as typeof language)} className="rounded-full bg-black/20 px-3 py-2 pr-8 text-sm text-brand-ink outline-none">
                {SUPPORTED_LANGUAGES.map((item) => (
                    <option key={item.code} value={item.code}>{item.nativeLabel}</option>
                ))}
            </select>
        </label>
    );
}

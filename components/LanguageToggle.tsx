'use client';

import { ChevronDown } from 'lucide-react';
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
                    <label key={item.code} className="field-toggle text-sm text-brand-ink">
                        <span>
                            <span className="block font-medium">{item.nativeLabel}</span>
                            <span className="block text-xs text-brand-muted">{item.label} / {item.supportLevel}</span>
                        </span>
                        <input
                            type="radio"
                            name="language-toggle"
                            checked={language === item.code}
                            onChange={() => setLanguage(item.code)}
                            className="field-check"
                        />
                    </label>
                ))}
            </div>
        );
    }

    return (
        <div className="surface-card inline-flex items-center gap-3 rounded-full border border-brand-line/80 bg-brand-bg/60 px-4 py-2.5 text-sm text-brand-ink">
            <span className={language === 'ne' ? 'text-xs font-semibold text-brand-muted' : 'text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted'}>
                {language === 'ne' ? 'भाषा' : 'Lang'}
            </span>
            <div className="relative">
                <select
                    value={language}
                    onChange={(event) => setLanguage(event.target.value as typeof language)}
                    className="field-select min-w-[8.5rem] rounded-full border-brand-line/80 bg-brand-bg/80 py-2 pl-3 pr-10 text-sm font-medium"
                >
                    {SUPPORTED_LANGUAGES.map((item) => (
                        <option key={item.code} value={item.code}>
                            {item.nativeLabel}
                        </option>
                    ))}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            </div>
        </div>
    );
}

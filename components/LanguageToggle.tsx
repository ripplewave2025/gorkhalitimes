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
        <div className="relative inline-flex">
            <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as typeof language)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label={language === 'ne' ? 'भाषा परिवर्तन गर्नुहोस्' : 'Change language'}
            >
                {SUPPORTED_LANGUAGES.map((item) => (
                    <option key={item.code} value={item.code}>
                        {item.nativeLabel}
                    </option>
                ))}
            </select>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-bg/80 border border-brand-line/80 text-brand-ink/80 hover:bg-brand-bg hover:text-brand-ink transition-colors">
                <span className="text-sm font-semibold">{language === 'ne' ? 'ने' : 'EN'}</span>
            </div>
        </div>
    );
}

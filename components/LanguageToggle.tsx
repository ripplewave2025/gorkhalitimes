'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="surface-card inline-flex items-center gap-1 rounded-full p-1">
            {[
                { code: 'en', label: 'EN' },
                { code: 'ne', label: 'NE' },
            ].map((item) => (
                <button
                    key={item.code}
                    type="button"
                    onClick={() => setLanguage(item.code as 'en' | 'ne')}
                    className={language === item.code ? 'pill-active' : 'pill-muted'}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}

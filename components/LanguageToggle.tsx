'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { Language } from '@/types';

const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ne', label: 'ने', flag: '🇳🇵' },
    { code: 'hi', label: 'हि', flag: '🇮🇳' },
];

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-1 p-1 rounded-full glass">
            {languages.map(({ code, label, flag }) => (
                <button key={code} onClick={() => setLanguage(code)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium smooth-transition ${language === code ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-white hover:bg-white/10'
                        }`}>
                    <span>{flag}</span><span>{label}</span>
                </button>
            ))}
        </div>
    );
}

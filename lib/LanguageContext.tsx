'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '@/types';

interface LanguageContextValue {
    language: Language;
    setLanguage: (language: Language) => void;
}

const STORAGE_KEY = 'gorkhayai-language';
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
        if (savedLanguage === 'en' || savedLanguage === 'ne') {
            setLanguageState(savedLanguage);
        }
    }, []);

    const setLanguage = (nextLanguage: Language) => {
        setLanguageState(nextLanguage);
        window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }

    return context;
}

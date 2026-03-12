'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANGUAGE } from '@/lib/client/language';
import { FeedLane, Language, UserPreferences } from '@/types';

interface LanguageContextValue {
    language: Language;
    uiLanguage: Language;
    contentLanguage: Language;
    audioLanguage: Language;
    fallbackLanguage: Language;
    preferences: UserPreferences;
    setLanguage: (language: Language) => void;
    setUiLanguage: (language: Language) => void;
    setContentLanguage: (language: Language) => void;
    setAudioLanguage: (language: Language) => void;
    setFallbackLanguage: (language: Language) => void;
    updatePreferences: (patch: Partial<UserPreferences>) => void;
    addRecentSearch: (query: string) => void;
    togglePreferredTopic: (topic: FeedLane) => void;
    toggleMutedSource: (sourceId: string) => void;
}

const STORAGE_KEY = 'gorkhayai-preferences';

const defaultPreferences: UserPreferences = {
    uiLanguage: DEFAULT_LANGUAGE,
    contentLanguage: DEFAULT_LANGUAGE,
    audioLanguage: DEFAULT_LANGUAGE,
    fallbackLanguage: 'en',
    preferredPlaces: ['Darjeeling', 'Kurseong'],
    preferredTopics: ['for-you', 'top-stories', 'roads', 'weather'],
    preferredSources: [],
    mutedSourceIds: [],
    morningAudioDigest: true,
    govtSchemesAlerts: true,
    audioSpeed: 1,
    onboardingComplete: false,
    recentSearches: [],
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

    useEffect(() => {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return;
        }

        try {
            const parsed = JSON.parse(raw) as Partial<UserPreferences>;
            setPreferences((current) => ({
                ...current,
                ...parsed,
                preferredPlaces: parsed.preferredPlaces ?? current.preferredPlaces,
                preferredTopics: parsed.preferredTopics ?? current.preferredTopics,
                preferredSources: parsed.preferredSources ?? current.preferredSources,
                mutedSourceIds: parsed.mutedSourceIds ?? current.mutedSourceIds,
                recentSearches: parsed.recentSearches ?? current.recentSearches,
            }));
        } catch {
            window.localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        document.documentElement.lang = preferences.uiLanguage;
    }, [preferences]);

    const updatePreferences = (patch: Partial<UserPreferences>) => {
        setPreferences((current) => ({ ...current, ...patch }));
    };

    const addRecentSearch = (query: string) => {
        const trimmed = query.trim();
        if (!trimmed) {
            return;
        }

        setPreferences((current) => ({
            ...current,
            recentSearches: [trimmed, ...current.recentSearches.filter((item) => item !== trimmed)].slice(0, 6),
        }));
    };

    const togglePreferredTopic = (topic: FeedLane) => {
        setPreferences((current) => ({
            ...current,
            preferredTopics: current.preferredTopics.includes(topic)
                ? current.preferredTopics.filter((item) => item !== topic)
                : [...current.preferredTopics, topic],
        }));
    };

    const toggleMutedSource = (sourceId: string) => {
        setPreferences((current) => ({
            ...current,
            mutedSourceIds: current.mutedSourceIds.includes(sourceId)
                ? current.mutedSourceIds.filter((item) => item !== sourceId)
                : [...current.mutedSourceIds, sourceId],
        }));
    };

    const value = useMemo(() => ({
        language: preferences.uiLanguage,
        uiLanguage: preferences.uiLanguage,
        contentLanguage: preferences.contentLanguage,
        audioLanguage: preferences.audioLanguage,
        fallbackLanguage: preferences.fallbackLanguage,
        preferences,
        setLanguage: (language: Language) => updatePreferences({ uiLanguage: language }),
        setUiLanguage: (language: Language) => updatePreferences({ uiLanguage: language }),
        setContentLanguage: (language: Language) => updatePreferences({ contentLanguage: language }),
        setAudioLanguage: (language: Language) => updatePreferences({ audioLanguage: language }),
        setFallbackLanguage: (language: Language) => updatePreferences({ fallbackLanguage: language }),
        updatePreferences,
        addRecentSearch,
        togglePreferredTopic,
        toggleMutedSource,
    }), [preferences]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }

    return context;
}

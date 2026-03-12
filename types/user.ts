import { Language, FeedLane } from '@/types/common';

export type UserRole = 'guest' | 'reader' | 'contributor' | 'note_writer' | 'guardian' | 'admin';
export type AuthMethod = 'guest' | 'google' | 'phone';

export interface UserProfile {
    id: string;
    name: string;
    role: UserRole;
    languagePreference: Language;
    hometown?: string;
}

export interface UserPreferences {
    uiLanguage: Language;
    contentLanguage: Language;
    audioLanguage: Language;
    fallbackLanguage: Language;
    preferredPlaces: string[];
    preferredTopics: FeedLane[];
    preferredSources: string[];
    mutedSourceIds: string[];
    morningAudioDigest: boolean;
    govtSchemesAlerts: boolean;
    audioSpeed: number;
    onboardingComplete: boolean;
    recentSearches: string[];
}

export interface AppSession {
    id: string;
    name: string;
    role: UserRole;
    authMethod: AuthMethod;
    email?: string;
    phone?: string;
    isGuest: boolean;
}

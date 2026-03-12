import { FeedLane, Language, LanguageSupportLevel, LocalizedText } from '@/types';

export interface SupportedLanguage {
    code: Language;
    label: string;
    nativeLabel: string;
    supportLevel: LanguageSupportLevel;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
    { code: 'ne', label: 'Nepali', nativeLabel: 'नेपाली', supportLevel: 'production' },
    { code: 'en', label: 'English', nativeLabel: 'English', supportLevel: 'production' },
    { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', supportLevel: 'beta' },
    { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা', supportLevel: 'beta' },
    { code: 'bo', label: 'Tibetan', nativeLabel: 'བོད་ཡིག', supportLevel: 'experimental' },
    { code: 'lep', label: 'Lepcha', nativeLabel: 'Lepcha', supportLevel: 'experimental' },
    { code: 'dz', label: 'Dzongkha', nativeLabel: 'རྫོང་ཁ', supportLevel: 'experimental' },
    { code: 'sher', label: 'Sherpa', nativeLabel: 'Sherpa', supportLevel: 'experimental' },
];

export const DEFAULT_LANGUAGE: Language = 'ne';

const fallbackOrder: readonly Language[] = ['en', 'ne', 'hi', 'bn', 'bo', 'dz', 'lep', 'sher'];

export function getLocalizedText(
    value: LocalizedText | undefined,
    language: Language,
    fallbackLanguage: Language = 'en',
): string {
    if (!value) {
        return '';
    }

    const direct = value[language];
    if (direct?.trim()) {
        return direct;
    }

    const fallback = value[fallbackLanguage];
    if (fallback?.trim()) {
        return fallback;
    }

    for (const candidate of fallbackOrder) {
        const candidateValue = value[candidate];
        if (candidateValue?.trim()) {
            return candidateValue;
        }
    }

    return '';
}

const relativeFormatters: Record<Language, Intl.RelativeTimeFormat> = {
    ne: new Intl.RelativeTimeFormat('ne', { numeric: 'auto' }),
    en: new Intl.RelativeTimeFormat('en', { numeric: 'auto' }),
    hi: new Intl.RelativeTimeFormat('hi', { numeric: 'auto' }),
    bn: new Intl.RelativeTimeFormat('bn', { numeric: 'auto' }),
    bo: new Intl.RelativeTimeFormat('en', { numeric: 'auto' }),
    lep: new Intl.RelativeTimeFormat('en', { numeric: 'auto' }),
    dz: new Intl.RelativeTimeFormat('en', { numeric: 'auto' }),
    sher: new Intl.RelativeTimeFormat('en', { numeric: 'auto' }),
};

export function formatRelativeTime(timestamp: string, language: Language): string {
    const diffMs = new Date(timestamp).getTime() - Date.now();
    const diffMinutes = Math.round(diffMs / (1000 * 60));

    if (Math.abs(diffMinutes) < 60) {
        return relativeFormatters[language].format(diffMinutes, 'minute');
    }

    const diffHours = Math.round(diffMinutes / 60);
    if (Math.abs(diffHours) < 24) {
        return relativeFormatters[language].format(diffHours, 'hour');
    }

    const diffDays = Math.round(diffHours / 24);
    return relativeFormatters[language].format(diffDays, 'day');
}

const laneLabels: Record<FeedLane, LocalizedText> = {
    'for-you': { ne: 'तपाईंका लागि', en: 'For You' },
    'top-stories': { ne: 'मुख्य कथा', en: 'Top Stories' },
    alerts: { ne: 'अलर्ट', en: 'Alerts' },
    tea: { ne: 'चिया', en: 'Tea' },
    roads: { ne: 'सडक', en: 'Roads' },
    'govt-schemes': { ne: 'सरकारी योजना', en: 'Govt Schemes' },
    jobs: { ne: 'रोजगार', en: 'Jobs' },
    schools: { ne: 'विद्यालय', en: 'Schools' },
    weather: { ne: 'मौसम', en: 'Weather' },
    economy: { ne: 'अर्थतन्त्र', en: 'Economy' },
};

export function getFeedLaneLabel(lane: FeedLane, language: Language): string {
    return getLocalizedText(laneLabels[lane], language);
}

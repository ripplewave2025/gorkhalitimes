import { Language, LocalizedText } from '@/types';

const relativeFormatter = {
    en: new Intl.RelativeTimeFormat('en', { numeric: 'auto' }),
    ne: new Intl.RelativeTimeFormat('ne', { numeric: 'auto' }),
};

export function getLocalizedText(value: LocalizedText, language: Language): string {
    return value[language] ?? value.en;
}

export function getLanguageDisplayName(language: Language): string {
    return language === 'ne' ? 'Nepali' : 'English';
}

export function formatRelativeTime(timestamp: string, language: Language): string {
    const diffMs = new Date(timestamp).getTime() - Date.now();
    const diffMinutes = Math.round(diffMs / (1000 * 60));

    if (Math.abs(diffMinutes) < 60) {
        return relativeFormatter[language].format(diffMinutes, 'minute');
    }

    const diffHours = Math.round(diffMinutes / 60);
    if (Math.abs(diffHours) < 24) {
        return relativeFormatter[language].format(diffHours, 'hour');
    }

    const diffDays = Math.round(diffHours / 24);
    return relativeFormatter[language].format(diffDays, 'day');
}

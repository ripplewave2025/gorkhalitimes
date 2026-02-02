export type Language = 'en' | 'ne' | 'hi';

export interface TranslatedText {
    en: string;
    ne: string;
    hi: string;
}

export interface NewsArticle {
    id: string;
    category: string;
    headline: TranslatedText;
    summary: TranslatedText;
    timeAgo: string;
    factChecked: boolean;
    imageUrl: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

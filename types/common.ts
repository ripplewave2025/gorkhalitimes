export type Language = 'en' | 'ne';

export interface LocalizedText {
    en: string;
    ne: string;
}

export type StoryCategory =
    | 'public-safety'
    | 'civic'
    | 'education'
    | 'economy'
    | 'community';

export type TrustBadge =
    | 'official'
    | 'multi-source'
    | 'single-source'
    | 'developing'
    | 'disputed';

export type StoryStatus = 'active' | 'developing' | 'resolved' | 'archived';

export type ConfidenceLevel = 'high' | 'medium' | 'developing';

export type NoteType =
    | 'wrong-location'
    | 'wrong-date-time'
    | 'old-media'
    | 'missing-context'
    | 'needs-official-confirmation'
    | 'resolved-update'
    | 'translation-issue'
    | 'cultural-context';

export type NoteRatingValue =
    | 'helpful'
    | 'not-helpful'
    | 'correct-but-unclear'
    | 'needs-better-source'
    | 'too-opinionated'
    | 'outdated';

export type AlertCategory =
    | 'road-closure'
    | 'landslide'
    | 'severe-weather'
    | 'government-notice'
    | 'school-closure'
    | 'utility-disruption';

export type AlertSeverity = 'high' | 'medium' | 'low';
export type AlertStatus = 'active' | 'updated' | 'resolved';

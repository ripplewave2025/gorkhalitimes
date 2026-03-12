export type Language = 'ne' | 'en' | 'hi' | 'bn' | 'bo' | 'lep' | 'dz' | 'sher';
export type LanguageSupportLevel = 'production' | 'beta' | 'experimental';

export type FeedLane =
    | 'for-you'
    | 'top-stories'
    | 'alerts'
    | 'tea'
    | 'roads'
    | 'govt-schemes'
    | 'jobs'
    | 'schools'
    | 'weather'
    | 'economy';

export type LocalizedText = Partial<Record<Language, string>>;

export type StoryCategory =
    | 'public-safety'
    | 'civic'
    | 'education'
    | 'economy'
    | 'community'
    | 'govt-schemes';

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


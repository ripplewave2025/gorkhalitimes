import { FeedLane, Language, LocalizedText, StoryCategory, StoryStatus, TrustBadge } from '@/types/common';

export interface StoryTimelineEntry {
    id: string;
    label: LocalizedText;
    timestamp: string;
}

export interface StoryScoreInputs {
    freshness: number;
    localRelevance: number;
    trust: number;
    urgency: number;
    sourceDiversity: number;
    editorialBoost: number;
}

export interface StoryCluster {
    id: string;
    slug: string;
    headline: LocalizedText;
    summaryShort: LocalizedText;
    summaryFull: LocalizedText;
    uncertaintyLine?: LocalizedText;
    primaryLocation: string;
    category: StoryCategory;
    lanes?: FeedLane[];
    heroImageUrl: string;
    sourceIds: string[];
    trustBadge: TrustBadge;
    status: StoryStatus;
    guardianNoteId?: string;
    publishedAt: string;
    updatedAt: string;
    audioLanguages: Language[];
    audioStatus?: 'cached' | 'queued' | 'browser-fallback';
    scores: StoryScoreInputs;
    savedCount: number;
    timeline: StoryTimelineEntry[];
}


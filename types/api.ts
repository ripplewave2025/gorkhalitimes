import { AlertItem } from '@/types/alert';
import { GuardianNote } from '@/types/note';
import { GovtScheme } from '@/types/scheme';
import { Source } from '@/types/source';
import { StoryCluster } from '@/types/story';
import { LocalizedText } from '@/types/common';

export interface FeedResponse {
    stories: StoryCluster[];
    schemes: GovtScheme[];
    nextCursor: string | null;
    activeAlerts: AlertItem[];
}

export interface StoryDetailResponse {
    story: StoryCluster;
    sources: Source[];
    guardianNote: GuardianNote | null;
    relatedStories: StoryCluster[];
}

export interface SearchResponse {
    answerSummary: LocalizedText | null;
    stories: StoryCluster[];
    schemes: GovtScheme[];
    sourceCount: number;
    suggestedQueries: string[];
}


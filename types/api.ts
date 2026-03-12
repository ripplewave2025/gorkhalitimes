import { AlertItem } from '@/types/alert';
import { GuardianNote } from '@/types/note';
import { Source } from '@/types/source';
import { StoryCluster } from '@/types/story';

export interface FeedResponse {
    stories: StoryCluster[];
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
    answerSummary: string | null;
    stories: StoryCluster[];
    sourceCount: number;
}

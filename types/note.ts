import { ConfidenceLevel, LocalizedText, NoteRatingValue, NoteType } from '@/types/common';

export interface GuardianNote {
    id: string;
    clusterId: string;
    noteType: NoteType;
    text: LocalizedText;
    confidence: ConfidenceLevel;
    sourceIds: string[];
    publishedAt: string;
    updatedAt: string;
    fastTracked: boolean;
}

export interface NoteRequestPayload {
    reason: NoteType;
    details?: string;
    evidenceUrl?: string;
}

export interface NoteRating {
    noteId: string;
    ratingValue: NoteRatingValue;
}

export interface NotePublishStats {
    ratingsCount: number;
    contributorClustersRepresented: number;
    helpfulEquivalentScore: number;
    maxPositiveClusterWeightShare: number;
    officialSourcesCount: number;
    independentCredibleSourcesCount: number;
    toxicOrOpinionated: boolean;
    guardianApproved: boolean;
}

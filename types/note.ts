import { ConfidenceLevel, LocalizedText, NoteRatingValue, NoteType } from '@/types/common';

export interface GuardianNote {
    id: string;
    clusterId: string;
    noteType: NoteType;
    text: LocalizedText;
    confidence: ConfidenceLevel;
    sourceIds: string[];
    sourceLinks?: string[];
    publishedAt: string | null;
    updatedAt: string;
    fastTracked: boolean;
    status: 'draft' | 'under_review' | 'published' | 'rejected';
}

export interface NoteRequestPayload {
    reason: NoteType;
    details?: string;
    evidenceUrl?: string;
}

export interface NoteRequestRecord extends NoteRequestPayload {
    id: string;
    clusterId: string;
    createdBySessionId: string;
    createdAt: string;
    status: 'queued' | 'reviewed';
}

export interface NoteRating {
    noteId: string;
    ratingValue: NoteRatingValue;
}

export interface NoteRatingRecord extends NoteRating {
    id: string;
    userId: string;
    createdAt: string;
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


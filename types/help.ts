export type HelpRequestStatus = 'pending' | 'in_review' | 'completed';
export type HelpRequestKind = 'story' | 'scheme';

export interface HelpRequest {
    id: string;
    kind: HelpRequestKind;
    storyId?: string;
    schemeId?: string;
    questionText: string;
    callbackNumber?: string;
    audioFileName?: string;
    createdBySessionId: string;
    createdAt: string;
    status: HelpRequestStatus;
}

export interface HelpRequestPayload {
    kind: HelpRequestKind;
    storyId?: string;
    schemeId?: string;
    questionText: string;
    callbackNumber?: string;
    audioFileName?: string;
}


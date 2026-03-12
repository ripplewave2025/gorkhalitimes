import { HelpRequest, HelpRequestPayload } from '@/types';

const helpRequests: HelpRequest[] = [];

function createId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function submitHelpRequest(sessionId: string, payload: HelpRequestPayload): HelpRequest {
    const request: HelpRequest = {
        id: createId('help'),
        kind: payload.kind,
        storyId: payload.storyId,
        schemeId: payload.schemeId,
        questionText: payload.questionText,
        callbackNumber: payload.callbackNumber,
        audioFileName: payload.audioFileName,
        createdBySessionId: sessionId,
        createdAt: new Date().toISOString(),
        status: 'pending',
    };

    helpRequests.unshift(request);
    return request;
}

export function listHelpRequests(): HelpRequest[] {
    return helpRequests;
}

export interface TelephonyProvider {
    queueCallback(request: HelpRequest): Promise<void>;
}

export const noopTelephonyProvider: TelephonyProvider = {
    async queueCallback() {
        return;
    },
};


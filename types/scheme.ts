import { LocalizedText } from '@/types/common';

export interface GovtScheme {
    id: string;
    title: LocalizedText;
    whoItsFor: LocalizedText;
    benefitSummary: LocalizedText;
    eligibilitySnapshot: LocalizedText;
    documentsNeeded?: LocalizedText[];
    learnMoreUrl: string;
    sourceId: string;
    locationScope: string;
    savedCount: number;
    helpCount: number;
    status: 'active' | 'updated' | 'closed';
}


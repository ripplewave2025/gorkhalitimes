export type SourceType =
    | 'newspaper'
    | 'official'
    | 'website'
    | 'radio'
    | 'manual';

export type TrustTier = 'A' | 'B' | 'C' | 'D';
export type RightsMode = 'link_only' | 'summary_allowed' | 'partner_full';
export type IngestMethod = 'rss' | 'extractor' | 'manual';
export type SourceStatus = 'active' | 'paused' | 'draft';
export type SourceHealthStatus = 'healthy' | 'degraded' | 'failing' | 'unknown';

export interface Source {
    id: string;
    name: string;
    type: SourceType;
    baseUrl: string;
    rssUrl?: string;
    extractorUrl?: string;
    trustTier: TrustTier;
    language: 'en' | 'ne' | 'mixed';
    locationScope: string;
    rightsMode: RightsMode;
    isOfficial: boolean;
    status?: SourceStatus;
    ingestMethod?: IngestMethod;
    tags?: string[];
    featureFlag?: 'social-sources';
}

export interface SourceHealth {
    sourceId: string;
    status: SourceHealthStatus;
    checkedAt: string;
    lastSuccessAt?: string;
    errorMessage?: string;
}

export interface NormalizedSourceItem {
    id: string;
    sourceId: string;
    title: string;
    summary: string;
    url: string;
    publishedAt: string;
    language: string;
    categoryTags: string[];
    locationTags: string[];
    imageUrl?: string;
}


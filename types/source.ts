export type SourceType =
    | 'newspaper'
    | 'official'
    | 'website'
    | 'radio'
    | 'manual';

export type TrustTier = 'A' | 'B' | 'C' | 'D';
export type RightsMode = 'link_only' | 'summary_allowed' | 'partner_full';

export interface Source {
    id: string;
    name: string;
    type: SourceType;
    baseUrl: string;
    trustTier: TrustTier;
    language: 'en' | 'ne' | 'mixed';
    locationScope: string;
    rightsMode: RightsMode;
    isOfficial: boolean;
}

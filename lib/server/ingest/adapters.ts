import { NormalizedSourceItem, Source, SourceHealth } from '@/types';

export interface IngestionResult {
    items: NormalizedSourceItem[];
    health: SourceHealth;
}

export interface SourceAdapter {
    canHandle(source: Source): boolean;
    ingest(source: Source): Promise<IngestionResult>;
}


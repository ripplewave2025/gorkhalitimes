import { NormalizedSourceItem, Source } from '@/types';
import { IngestionResult, SourceAdapter } from '@/lib/server/ingest/adapters';

function stripTags(input: string): string {
    return input.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractMeta(html: string, key: string): string {
    const matcher = new RegExp(`<meta[^>]+(?:name|property)=["']${key}["'][^>]+content=["']([^"']+)["'][^>]*>`, 'i');
    const match = html.match(matcher);
    return match?.[1] ?? '';
}

export const articleExtractionAdapter: SourceAdapter = {
    canHandle(source: Source) {
        return source.ingestMethod === 'extractor' && !!source.extractorUrl;
    },
    async ingest(source: Source): Promise<IngestionResult> {
        if (!source.extractorUrl) {
            throw new Error('Extractor URL missing');
        }

        const response = await fetch(source.extractorUrl, { next: { revalidate: 900 } });
        if (!response.ok) {
            throw new Error(`Extractor fetch failed: ${response.status}`);
        }

        const html = await response.text();
        const title = stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? source.name);
        const summary = extractMeta(html, 'description') || extractMeta(html, 'og:description') || title;
        const imageUrl = extractMeta(html, 'og:image') || undefined;
        const canonicalUrl = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i)?.[1] ?? source.extractorUrl;

        const item: NormalizedSourceItem = {
            id: `${source.id}-extractor-0`,
            sourceId: source.id,
            title,
            summary,
            url: canonicalUrl,
            publishedAt: new Date().toISOString(),
            language: source.language,
            categoryTags: source.tags ?? [],
            locationTags: [source.locationScope],
            imageUrl,
        };

        return {
            items: [item],
            health: {
                sourceId: source.id,
                status: 'healthy',
                checkedAt: new Date().toISOString(),
                lastSuccessAt: new Date().toISOString(),
            },
        };
    },
};


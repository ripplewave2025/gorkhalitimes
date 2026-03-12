import { NormalizedSourceItem, Source } from '@/types';
import { IngestionResult, SourceAdapter } from '@/lib/server/ingest/adapters';

function stripTags(input: string): string {
    return input.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractTagValue(block: string, tagName: string): string {
    const match = block.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'));
    return match ? stripTags(match[1]) : '';
}

export const rssAdapter: SourceAdapter = {
    canHandle(source: Source) {
        return source.ingestMethod === 'rss' && !!source.rssUrl;
    },
    async ingest(source: Source): Promise<IngestionResult> {
        if (!source.rssUrl) {
            throw new Error('RSS URL missing');
        }

        const response = await fetch(source.rssUrl, { next: { revalidate: 900 } });
        if (!response.ok) {
            throw new Error(`RSS fetch failed: ${response.status}`);
        }

        const xml = await response.text();
        const blocks = Array.from(xml.matchAll(/<(item|entry)[^>]*>([\s\S]*?)<\/(item|entry)>/gi)).map((match) => match[0]).slice(0, 5);
        const items: NormalizedSourceItem[] = blocks.map((block, index) => ({
            id: `${source.id}-rss-${index}`,
            sourceId: source.id,
            title: extractTagValue(block, 'title'),
            summary: extractTagValue(block, 'description') || extractTagValue(block, 'summary'),
            url: extractTagValue(block, 'link') || source.baseUrl,
            publishedAt: extractTagValue(block, 'pubDate') || new Date().toISOString(),
            language: source.language,
            categoryTags: source.tags ?? [],
            locationTags: [source.locationScope],
        })).filter((item) => item.title);

        return {
            items,
            health: {
                sourceId: source.id,
                status: 'healthy',
                checkedAt: new Date().toISOString(),
                lastSuccessAt: new Date().toISOString(),
            },
        };
    },
};


import assert from 'node:assert/strict';
import test from 'node:test';
import { articleExtractionAdapter } from '@/lib/server/ingest/extractor-adapter';
import { rssAdapter } from '@/lib/server/ingest/rss-adapter';

test('source adapters match the expected source ingest methods', () => {
    assert.equal(rssAdapter.canHandle({
        id: 'rss-source',
        name: 'RSS Source',
        type: 'website',
        baseUrl: 'https://example.com',
        rssUrl: 'https://example.com/rss.xml',
        trustTier: 'B',
        language: 'en',
        locationScope: 'Test',
        rightsMode: 'summary_allowed',
        isOfficial: false,
        ingestMethod: 'rss',
    }), true);

    assert.equal(articleExtractionAdapter.canHandle({
        id: 'extractor-source',
        name: 'Extractor Source',
        type: 'official',
        baseUrl: 'https://example.com',
        extractorUrl: 'https://example.com/updates',
        trustTier: 'A',
        language: 'en',
        locationScope: 'Test',
        rightsMode: 'summary_allowed',
        isOfficial: true,
        ingestMethod: 'extractor',
    }), true);
});

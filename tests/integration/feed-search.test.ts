import assert from 'node:assert/strict';
import test from 'node:test';
import { getFeed } from '@/lib/server/feed/get-feed';
import { searchStories } from '@/lib/server/search/search-stories';

test('feed includes govt schemes lane content', () => {
    const result = getFeed({ lane: 'govt-schemes' });
    assert.ok(result.schemes.length > 0);
    assert.ok(result.stories.some((story) => story.category === 'govt-schemes'));
});

test('search returns answer summary and source visibility', () => {
    const result = searchStories('govt scheme', { lane: 'govt-schemes' });
    assert.ok(result.answerSummary);
    assert.ok(result.sourceCount > 0);
    assert.ok(result.schemes.length > 0);
});

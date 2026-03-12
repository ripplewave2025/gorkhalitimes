import { storyClusters } from '@/data/fixtures/stories';
import { SearchResponse } from '@/types';

export function searchStories(query: string): SearchResponse {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) {
        return {
            answerSummary: null,
            stories: storyClusters.slice(0, 5),
            sourceCount: new Set(storyClusters.flatMap((story) => story.sourceIds)).size,
        };
    }

    const stories = storyClusters.filter((story) => {
        const haystack = [
            story.headline.en,
            story.headline.ne,
            story.summaryShort.en,
            story.summaryShort.ne,
            story.primaryLocation,
            story.category,
        ]
            .join(' ')
            .toLowerCase();

        return haystack.includes(trimmed);
    });

    return {
        answerSummary: stories.length
            ? `${stories.length} relevant story cluster${stories.length > 1 ? 's' : ''} in the current hills feed.`
            : null,
        stories,
        sourceCount: new Set(stories.flatMap((story) => story.sourceIds)).size,
    };
}

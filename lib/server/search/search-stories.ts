import { storyClusters } from '@/data/fixtures/stories';
import { FeedLane, SearchResponse, StoryCluster, UserPreferences } from '@/types';

const defaultSuggestions = ['landslide peshok', 'tea price', 'govt scheme', 'school notice', 'weather takdah'];

function matchesLane(story: StoryCluster, lane: FeedLane): boolean {
    if (lane === 'for-you' || lane === 'top-stories') {
        return true;
    }

    return story.lanes?.includes(lane) ?? false;
}

export function searchStories(
    query: string,
    options: { lane?: FeedLane; preferences?: Partial<UserPreferences> } = {},
): SearchResponse {
    const trimmed = query.trim().toLowerCase();
    const lane = options.lane ?? 'for-you';

    const stories = storyClusters.filter((story) => {
        if (!matchesLane(story, lane)) {
            return false;
        }

        if (!trimmed) {
            return true;
        }

        const haystack = [
            story.headline.en,
            story.headline.ne,
            story.summaryShort.en,
            story.summaryShort.ne,
            story.primaryLocation,
            story.category,
            ...(story.lanes ?? []),
        ]
            .join(' ')
            .toLowerCase();

        const matchesQuery = haystack.includes(trimmed);
        const matchesPreferredPlace = (options.preferences?.preferredPlaces ?? []).some((place) => place.toLowerCase().includes(trimmed));
        return matchesQuery || matchesPreferredPlace;
    });

    return {
        answerSummary: stories.length
            ? {
                en: `${stories.length} relevant story clusters found. ${new Set(stories.flatMap((story) => story.sourceIds)).size} visible sources remain in the result set.`,
                ne: `${stories.length} ??? ???????????? ??? ?????? ??????? ${new Set(stories.flatMap((story) => story.sourceIds)).size} ??? ????? ??????????`,
            }
            : null,
        stories,
        sourceCount: new Set(stories.flatMap((story) => story.sourceIds)).size,
        suggestedQueries: trimmed ? defaultSuggestions.filter((item) => item !== trimmed).slice(0, 4) : defaultSuggestions,
    };
}

import { storyClusters } from '@/data/fixtures/stories';
import { getSchemes } from '@/lib/server/schemes/get-schemes';
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
    options: { lane?: FeedLane; preferences?: Partial<UserPreferences>; stories?: StoryCluster[] } = {},
): SearchResponse {
    const trimmed = query.trim().toLowerCase();
    const lane = options.lane ?? 'for-you';
    const catalog = options.stories ?? storyClusters;

    const stories = catalog.filter((story) => {
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

    const schemes = getSchemes({ query, lane });
    const sourceCount = new Set(stories.flatMap((story) => story.sourceIds)).size + new Set(schemes.map((scheme) => scheme.sourceId)).size;

    return {
        answerSummary: stories.length || schemes.length
            ? {
                en: `${stories.length} relevant story clusters and ${schemes.length} scheme cards found. ${sourceCount} visible sources remain in the result set.`,
                ne: `${stories.length} ??? ??? ? ${schemes.length} ??? ????? ????? ?????? ??????? ${sourceCount} ??? ????? ??????????`,
            }
            : null,
        stories,
        schemes,
        sourceCount,
        suggestedQueries: trimmed ? defaultSuggestions.filter((item) => item !== trimmed).slice(0, 4) : defaultSuggestions,
    };
}


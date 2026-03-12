import { alerts } from '@/data/fixtures/alerts';
import { storyClusters } from '@/data/fixtures/stories';
import { FeedLane, FeedResponse, Language, StoryCategory, StoryCluster, UserPreferences } from '@/types';
import { scoreStory } from '@/lib/server/feed/score';

interface GetFeedOptions {
    cursor?: string | null;
    language?: Language;
    category?: StoryCategory | 'all';
    location?: string;
    includeAlerts?: boolean;
    lane?: FeedLane;
    preferences?: Partial<UserPreferences>;
}

function matchesLane(story: StoryCluster, lane: FeedLane): boolean {
    if (lane === 'for-you' || lane === 'top-stories') {
        return true;
    }

    return story.lanes?.includes(lane) ?? false;
}

function getPersonalizationBoost(story: StoryCluster, lane: FeedLane, preferences?: Partial<UserPreferences>): number {
    if (!preferences) {
        return lane !== 'for-you' && matchesLane(story, lane) ? 0.1 : 0;
    }

    let boost = 0;
    const preferredPlaces = preferences.preferredPlaces ?? [];
    const preferredTopics = preferences.preferredTopics ?? [];
    const preferredSources = preferences.preferredSources ?? [];
    const mutedSources = preferences.mutedSourceIds ?? [];

    if (preferredPlaces.some((place) => story.primaryLocation.toLowerCase().includes(place.toLowerCase()))) {
        boost += 0.08;
    }

    if (story.lanes?.some((storyLane) => preferredTopics.includes(storyLane))) {
        boost += 0.08;
    }

    if (story.sourceIds.some((sourceId) => preferredSources.includes(sourceId))) {
        boost += 0.05;
    }

    if (story.sourceIds.some((sourceId) => mutedSources.includes(sourceId))) {
        boost -= 0.12;
    }

    if (preferences.govtSchemesAlerts && story.category === 'govt-schemes') {
        boost += 0.06;
    }

    if (lane !== 'for-you' && matchesLane(story, lane)) {
        boost += 0.1;
    }

    return boost;
}

export function getFeed(options: GetFeedOptions = {}): FeedResponse {
    const category = options.category ?? 'all';
    const location = options.location?.toLowerCase();
    const lane = options.lane ?? 'for-you';

    const stories = storyClusters
        .filter((story) => {
            if (category !== 'all' && story.category !== category) {
                return false;
            }

            if (location && !story.primaryLocation.toLowerCase().includes(location)) {
                return false;
            }

            if (!matchesLane(story, lane)) {
                return false;
            }

            return story.status !== 'archived';
        })
        .sort((a, b) => {
            const left = scoreStory(a.scores) + getPersonalizationBoost(a, lane, options.preferences);
            const right = scoreStory(b.scores) + getPersonalizationBoost(b, lane, options.preferences);
            return right - left;
        });

    return {
        stories,
        nextCursor: null,
        activeAlerts: options.includeAlerts === false
            ? []
            : alerts.filter((alert) => alert.status !== 'resolved'),
    };
}

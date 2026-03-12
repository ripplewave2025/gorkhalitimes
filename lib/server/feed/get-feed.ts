import { alerts } from '@/data/fixtures/alerts';
import { storyClusters } from '@/data/fixtures/stories';
import { FeedResponse, Language, StoryCategory } from '@/types';
import { scoreStory } from '@/lib/server/feed/score';

interface GetFeedOptions {
    cursor?: string | null;
    language?: Language;
    category?: StoryCategory | 'all';
    location?: string;
    includeAlerts?: boolean;
}

export function getFeed(options: GetFeedOptions = {}): FeedResponse {
    const category = options.category ?? 'all';
    const location = options.location?.toLowerCase();

    const stories = storyClusters
        .filter((story) => {
            if (category !== 'all' && story.category !== category) {
                return false;
            }

            if (location && !story.primaryLocation.toLowerCase().includes(location)) {
                return false;
            }

            return story.status !== 'archived';
        })
        .sort((a, b) => scoreStory(b.scores) - scoreStory(a.scores));

    return {
        stories,
        nextCursor: null,
        activeAlerts: options.includeAlerts === false
            ? []
            : alerts.filter((alert) => alert.status !== 'resolved'),
    };
}

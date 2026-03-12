import { StoryScoreInputs } from '@/types';

export function scoreStory(inputs: StoryScoreInputs): number {
    return (
        0.3 * inputs.freshness +
        0.25 * inputs.localRelevance +
        0.2 * inputs.trust +
        0.15 * inputs.urgency +
        0.05 * inputs.sourceDiversity +
        0.05 * inputs.editorialBoost
    );
}

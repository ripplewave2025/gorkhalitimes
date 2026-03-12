import { sources } from '@/data/fixtures/sources';
import { storyClusters } from '@/data/fixtures/stories';
import { getCurrentGuardianAngelNote } from '@/lib/server/notes/store';
import { StoryDetailResponse } from '@/types';

export function getStoryById(id: string): StoryDetailResponse | null {
    const story = storyClusters.find((item) => item.id === id);

    if (!story) {
        return null;
    }

    return {
        story,
        sources: sources.filter((source) => story.sourceIds.includes(source.id)),
        guardianNote: getCurrentGuardianAngelNote(story.id),
        relatedStories: storyClusters
            .filter((candidate) => candidate.id !== story.id && candidate.category === story.category)
            .slice(0, 3),
    };
}


import { guardianNotes } from '@/data/fixtures/notes';
import { sources } from '@/data/fixtures/sources';
import { storyClusters } from '@/data/fixtures/stories';
import { StoryDetailResponse } from '@/types';

export function getStoryById(id: string): StoryDetailResponse | null {
    const story = storyClusters.find((item) => item.id === id);

    if (!story) {
        return null;
    }

    return {
        story,
        sources: sources.filter((source) => story.sourceIds.includes(source.id)),
        guardianNote: story.guardianNoteId
            ? guardianNotes.find((note) => note.id === story.guardianNoteId) ?? null
            : null,
        relatedStories: storyClusters
            .filter((candidate) => candidate.id !== story.id && candidate.category === story.category)
            .slice(0, 3),
    };
}

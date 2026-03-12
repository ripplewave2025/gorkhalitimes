const saveStore = new Map<string, Set<string>>();

function getSessionSet(sessionId: string): Set<string> {
    const existing = saveStore.get(sessionId);
    if (existing) {
        return existing;
    }

    const next = new Set<string>();
    saveStore.set(sessionId, next);
    return next;
}

export function saveStory(sessionId: string, storyId: string): string[] {
    const stories = getSessionSet(sessionId);
    stories.add(storyId);
    return Array.from(stories);
}

export function unsaveStory(sessionId: string, storyId: string): string[] {
    const stories = getSessionSet(sessionId);
    stories.delete(storyId);
    return Array.from(stories);
}

export function getSavedStoryIds(sessionId: string): string[] {
    return Array.from(getSessionSet(sessionId));
}


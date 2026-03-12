import { guardianNotes as seededGuardianNotes } from '@/data/fixtures/notes';
import { sources } from '@/data/fixtures/sources';
import { canPublishGuardianNote } from '@/lib/server/notes/publish-rules';
import { GuardianNote, NotePublishStats, NoteRatingRecord, NoteRatingValue, NoteRequestPayload, NoteRequestRecord, UserRole } from '@/types';

const guardianNotes = [...seededGuardianNotes];
const noteRequests: NoteRequestRecord[] = [];
const noteRatings: NoteRatingRecord[] = [];

function createId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function buildPublishStats(note: GuardianNote, actorRole?: UserRole): NotePublishStats {
    const ratings = noteRatings.filter((rating) => rating.noteId === note.id);
    const helpfulWeighted = ratings.reduce((total, rating) => {
        if (rating.ratingValue === 'helpful') {
            return total + 1;
        }
        if (rating.ratingValue === 'correct-but-unclear') {
            return total + 0.75;
        }
        return total;
    }, 0);
    const positiveRatings = ratings.filter((rating) => rating.ratingValue === 'helpful' || rating.ratingValue === 'correct-but-unclear');
    const perUserPositive = new Map<string, number>();
    positiveRatings.forEach((rating) => {
        perUserPositive.set(rating.userId, (perUserPositive.get(rating.userId) ?? 0) + 1);
    });
    const maxPositiveClusterWeightShare = positiveRatings.length > 0
        ? Math.max(...Array.from(perUserPositive.values())) / positiveRatings.length
        : 0;
    const officialSourcesCount = note.sourceIds.filter((sourceId) => sources.find((source) => source.id === sourceId)?.isOfficial).length;
    const independentCredibleSourcesCount = note.sourceIds.filter((sourceId) => {
        const trustTier = sources.find((source) => source.id === sourceId)?.trustTier;
        return trustTier === 'A' || trustTier === 'B';
    }).length;

    return {
        ratingsCount: ratings.length,
        contributorClustersRepresented: new Set(ratings.map((rating) => rating.userId)).size,
        helpfulEquivalentScore: ratings.length > 0 ? helpfulWeighted / ratings.length : 0,
        maxPositiveClusterWeightShare,
        officialSourcesCount,
        independentCredibleSourcesCount,
        toxicOrOpinionated: ratings.filter((rating) => rating.ratingValue === 'too-opinionated').length > 1,
        guardianApproved: actorRole === 'guardian' || actorRole === 'admin' || note.fastTracked,
    };
}

function evaluateNote(note: GuardianNote, actorRole?: UserRole): GuardianNote {
    const stats = buildPublishStats(note, actorRole);
    if (canPublishGuardianNote(stats)) {
        note.status = 'published';
        note.publishedAt = note.publishedAt ?? new Date().toISOString();
    } else if (note.status === 'draft') {
        note.status = 'under_review';
    }

    note.updatedAt = new Date().toISOString();
    return note;
}

export function listGuardianAngelNotes(): GuardianNote[] {
    return guardianNotes;
}

export function listGuardianAngelNoteRequests(): NoteRequestRecord[] {
    return noteRequests;
}

export function getCurrentGuardianAngelNote(clusterId: string): GuardianNote | null {
    return guardianNotes
        .filter((note) => note.clusterId === clusterId && note.status === 'published')
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0] ?? null;
}

export function getGuardianAngelNoteById(noteId: string): GuardianNote | null {
    return guardianNotes.find((note) => note.id === noteId) ?? null;
}

export function createGuardianAngelNoteRequest(clusterId: string, createdBySessionId: string, payload: NoteRequestPayload): NoteRequestRecord {
    const record: NoteRequestRecord = {
        id: createId('note-request'),
        clusterId,
        createdBySessionId,
        reason: payload.reason,
        details: payload.details,
        evidenceUrl: payload.evidenceUrl,
        createdAt: new Date().toISOString(),
        status: 'queued',
    };

    noteRequests.unshift(record);
    return record;
}

export function createGuardianAngelDraft(
    clusterId: string,
    authorSessionId: string,
    actorRole: UserRole,
    payload: {
        noteType: GuardianNote['noteType'];
        confidence: GuardianNote['confidence'];
        text: string;
        language: 'en' | 'ne';
        sourceLinks: string[];
        fastTrack?: boolean;
    },
): GuardianNote {
    const note: GuardianNote = {
        id: createId('note'),
        clusterId,
        noteType: payload.noteType,
        text: {
            [payload.language]: payload.text,
            ne: payload.language === 'ne' ? payload.text : payload.text,
            en: payload.language === 'en' ? payload.text : payload.text,
        },
        confidence: payload.confidence,
        sourceIds: payload.sourceLinks.map((link) => sources.find((source) => link.includes(source.baseUrl.replace('https://', '')))?.id).filter(Boolean) as string[],
        sourceLinks: payload.sourceLinks,
        publishedAt: null,
        updatedAt: new Date().toISOString(),
        fastTracked: Boolean(payload.fastTrack && (actorRole === 'guardian' || actorRole === 'admin')),
        status: 'draft',
    };

    guardianNotes.unshift(evaluateNote(note, actorRole));
    return note;
}

export function rateGuardianAngelNote(noteId: string, userId: string, ratingValue: NoteRatingValue, actorRole: UserRole): GuardianNote | null {
    const note = guardianNotes.find((entry) => entry.id === noteId);
    if (!note) {
        return null;
    }

    noteRatings.unshift({
        id: createId('rating'),
        noteId,
        userId,
        ratingValue,
        createdAt: new Date().toISOString(),
    });

    return evaluateNote(note, actorRole);
}

